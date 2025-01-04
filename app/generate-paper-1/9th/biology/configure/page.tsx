'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { QuestionDisplay } from "@/components/question-display"
import { PaperLayout } from "@/components/paper-layout"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AnswerKey } from "@/components/answer-key"
import { generatePDF } from "@/utils/generate-pdf"
import { fetchQuestions } from "@/services/questions"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X, Search, Shuffle, Plus, Download, Trash2 } from 'lucide-react'
import Image from "next/image"
import { toast } from "sonner"
import { LongQuestion, MCQQuestion, Question, QuestionConfig, ShortQuestion } from "@/types/questions"
import { Card, CardContent } from "@/components/ui/card"

export default function ConfigureQuestionsPage() {
  const [sections, setSections] = useState<QuestionConfig[]>([])
  const [currentSection, setCurrentSection] = useState<QuestionConfig>({
    type: 'mcq',
    count: 1,
    marks: 1
  })
  const [ignoreQuestions, setIgnoreQuestions] = useState("0")
  const [blankLines, setBlankLines] = useState("0")
  const [dualMedium, setDualMedium] = useState(true)
  const [showPaper, setShowPaper] = useState(false)
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([])
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([])
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([])

  const totalMarks = sections.reduce((sum, section) => sum + (section.count * section.marks), 0)

  const handleAddSection = () => {
    console.log('Adding section:', currentSection)
    setSections([...sections, currentSection])
    setCurrentSection({
      type: 'mcq',
      count: 1,
      marks: 1
    })
  }

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index))
  }

  const handleSearch = async () => {
    try {
      let allQuestions: Question[] = []
      
      // Process each section individually
      for (const section of sections) {
        const fetchedQuestions = await fetchQuestions(
          'biology',
          '9th',
          ['CHAP 1 Introduction to Biology', 'CHAP 2 Biodiversity'],
          section.count,
          section.type
        )

        // Add marks to the questions
        const questionsWithMarks = fetchedQuestions.map(q => ({
          ...q,
          marks: section.marks
        }))

        allQuestions = [...allQuestions, ...questionsWithMarks]
      }

      // Verify counts
      const mcqCount = allQuestions.filter(q => q.type === 'mcq').length
      const shortCount = allQuestions.filter(q => q.type === 'short').length
      const longCount = allQuestions.filter(q => q.type === 'long').length

      // Verify if counts match what was requested
      const requestedCounts = sections.reduce((acc, section) => {
        acc[section.type] = (acc[section.type] || 0) + section.count
        return acc
      }, {} as Record<string, number>)

      if (
        mcqCount !== (requestedCounts['mcq'] || 0) ||
        shortCount !== (requestedCounts['short'] || 0) ||
        longCount !== (requestedCounts['long'] || 0)
      ) {
        toast.error('Could not fetch the exact number of questions requested')
        return
      }

      setAvailableQuestions(allQuestions)
      setSelectedQuestions(allQuestions)
      setRandomQuestions([])
      toast.success(`Selected: ${mcqCount} MCQs, ${shortCount} Short, ${longCount} Long`)
    } catch (error) {
      console.error('Error fetching questions:', error)
      toast.error('Failed to fetch questions')
    }
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const handleRandomSelect = () => {
    if (!availableQuestions.length) return;

    // Group questions by type
    const questionsByType = availableQuestions.reduce((acc, q) => {
      if (!acc[q.type]) acc[q.type] = [];
      acc[q.type].push(q);
      return acc;
    }, {} as Record<string, Question[]>);

    // Get the counts from sections
    const requiredCounts = sections.reduce((acc, section) => {
      if (!acc[section.type]) acc[section.type] = 0;
      acc[section.type] += section.count;
      return acc;
    }, {} as Record<string, number>);

    // Randomly select the required number of questions for each type
    let randomized: Question[] = [];
    Object.entries(requiredCounts).forEach(([type, count]) => {
      const typeQuestions = questionsByType[type] || [];
      const shuffled = shuffleArray(typeQuestions);
      randomized = [...randomized, ...shuffled.slice(0, count)];
    });

    setRandomQuestions(randomized);
  };

  const handleAddQuestions = () => {
    if (!randomQuestions.length) return;

    // Create a map of required counts from sections
    const requiredCounts = sections.reduce((acc, section) => {
      if (!acc[section.type]) acc[section.type] = 0;
      acc[section.type] += section.count;
      return acc;
    }, {} as Record<string, number>);

    // Filter questions by type and take only the required count
    const finalSelectedQuestions = Object.entries(requiredCounts).flatMap(([type, count]) => {
      const typeQuestions = randomQuestions
        .filter(q => q.type === type)
        .slice(0, count);
      return typeQuestions;
    });

    setSelectedQuestions(finalSelectedQuestions);
    setRandomQuestions([]);
    
    // Show confirmation toast with counts
    const mcqCount = finalSelectedQuestions.filter(q => q.type === 'mcq').length;
    const shortCount = finalSelectedQuestions.filter(q => q.type === 'short').length;
    const longCount = finalSelectedQuestions.filter(q => q.type === 'long').length;
    
    toast.success(`Added: ${mcqCount} MCQs, ${shortCount} Short, ${longCount} Long questions`);
  };

  const handleClose = () => {
    setShowPaper(true)
  }

  const handleDownload = async () => {
    if (selectedQuestions.length === 0) {
      toast.error('No questions selected');
      return;
    }

    // Verify question counts match the requirements
    const hasCorrectCounts = sections.every(section => {
      const typeCount = selectedQuestions.filter(q => q.type === section.type).length;
      return typeCount === section.count;
    });

    if (!hasCorrectCounts) {
      toast.error('Question counts do not match the requirements. Please reselect questions.');
      return;
    }

    try {
      const success = await generatePDF(selectedQuestions, {
        grade: '9th',
        subject: 'Biology',
        chapter: ['CHAP 1 Introduction to Biology', 'CHAP 2 Biodiversity']
      });
    
      if (success) {
        toast.success('Paper downloaded and saved successfully');
      } else {
        toast.error('Failed to generate PDF');
      }
    } catch (error) {
      toast.error('Failed to generate PDF');
    }
  };

  if (showPaper) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <PaperLayout>
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Biology Paper - 9th Grade</h2>
                  <p className="text-sm text-muted-foreground">Total Marks: {totalMarks}</p>
                </div>
                <Button onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
              <div className="mb-8">
                {selectedQuestions.length > 0 && (
                  <>
                    {selectedQuestions.filter(q => q.type === 'mcq').length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4">Q1. Choose the correct answer:</h2>
                        <div className="space-y-6">
                          {selectedQuestions
                            .filter(q => q.type === 'mcq')
                            .map((question, index) => (
                              <QuestionDisplay key={question.id} question={question} index={index} />
                            ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedQuestions.filter(q => q.type === 'short').length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4">Q2. Answer the following short questions:</h2>
                        <div className="space-y-6">
                          {selectedQuestions
                            .filter(q => q.type === 'short')
                            .map((question, index) => (
                              <QuestionDisplay key={question.id} question={question} index={index} />
                            ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedQuestions.filter(q => q.type === 'long').length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4">Q3. Answer the following in detail:</h2>
                        <div className="space-y-6">
                          {selectedQuestions
                            .filter(q => q.type === 'long')
                            .map((question, index) => (
                              <QuestionDisplay key={question.id} question={question} index={index} />
                            ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <AnswerKey
                answers={selectedQuestions.map((q, i) => ({
                  number: i + 1,
                  answer: q.type === 'mcq' ? (q as any).correct : 'See detailed answer key'
                }))}
              />
            </div>
          </PaperLayout>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <h1 className="text-lg font-medium">Select Your Questions Here... 9TH - Biology</h1>
            <X className="h-5 w-5 cursor-pointer" onClick={handleClose} />
          </div>
          
          <div className="bg-white border-x border-b rounded-b-lg p-6">
            <div className="flex gap-6 mb-6">
              <Image
                src="/placeholder.svg"
                alt="Biology Book Cover"
                width={120}
                height={160}
                className="rounded-sm border"
              />
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4">
                  {['CHAP 1 Introduction to Biology', 'CHAP 2 Biodiversity'].map((chapter) => (
                    <div key={chapter} className="flex items-center gap-2">
                      <Checkbox checked={true} />
                      <span className="text-sm text-blue-600">{chapter}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Question Type</Label>
                  <Select 
                    value={currentSection.type} 
                    onValueChange={(value: 'mcq' | 'short' | 'long') => 
                      setCurrentSection({...currentSection, type: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">Multiple Choice</SelectItem>
                      <SelectItem value="short">Short Questions</SelectItem>
                      <SelectItem value="long">Long Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Number of Questions</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    value={currentSection.count}
                    onChange={(e) => setCurrentSection({
                      ...currentSection, 
                      count: parseInt(e.target.value) || 1
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Marks per Question</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    value={currentSection.marks}
                    onChange={(e) => setCurrentSection({
                      ...currentSection, 
                      marks: parseInt(e.target.value) || 1
                    })}
                  />
                </div>
              </div>

              <Button onClick={handleAddSection}>
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>

              {sections.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sections.map((section, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{section.type.toUpperCase()}</h3>
                            <p className="text-sm text-muted-foreground">
                              {section.count} questions × {section.marks} marks
                            </p>
                            <p className="text-sm font-medium">
                              Total: {section.count * section.marks} marks
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveSection(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <p className="text-sm font-medium">Total Marks: {totalMarks}</p>
                  <p className="text-sm text-muted-foreground">
                    Total Questions: {sections.reduce((sum, section) => sum + section.count, 0)}
                  </p>
                </div>

                <div className="space-x-2">
                  <Button 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={handleSearch}
                    disabled={sections.length === 0}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    SEARCH
                  </Button>
                </div>
              </div>
            </div>

            <div className="min-h-[400px] bg-green-50 rounded-lg mt-6 overflow-auto">
              {availableQuestions.length > 0 && (
                <div className="divide-y">
                  {(randomQuestions.length ? randomQuestions : availableQuestions).map((question, index) => (
                    <QuestionDisplay key={question.id} question={question} index={index} />
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button 
                className="bg-green-500 hover:bg-green-600"
                onClick={handleRandomSelect}
                disabled={!availableQuestions.length}
              >
                <Shuffle className="h-4 w-4 mr-2" />
                RANDOM SELECT
              </Button>
              <Button 
                className="bg-blue-500 hover:bg-blue-600"
                onClick={handleAddQuestions}
                disabled={!randomQuestions.length}
              >
                <Plus className="h-4 w-4 mr-2" />
                ADD QUESTIONS
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

