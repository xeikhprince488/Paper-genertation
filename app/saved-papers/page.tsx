'use client'

import { useState } from 'react'
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import useSavedPapersStore from "@/store/saved-papers"

export default function SavedPapersPage() {
  const [selectedGrade, setSelectedGrade] = useState<string>('')
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  
  const store = useSavedPapersStore()
  const grades = Object.keys(store.papers)
  const subjects = selectedGrade ? Object.keys(store.papers[selectedGrade] || {}) : []
  const papers = selectedGrade && selectedSubject 
    ? store.getPapersBySubject(selectedGrade, selectedSubject)
    : selectedGrade 
    ? store.getPapersByGrade(selectedGrade)
    : []

  const handleDownload = (pdfContent: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = pdfContent
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">Saved Papers</h1>
            <p className="text-sm text-muted-foreground mt-1">View and download your saved papers</p>
          </header>

          <div className="flex gap-4 mb-6">
            <div className="w-48">
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedGrade && (
              <div className="w-48">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {papers.map((paper) => (
              <Card key={paper.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {paper.title}
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Created: {new Date(paper.createdAt).toLocaleDateString()}
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs">
                      Chapters: {paper.metadata.chapter.join(', ')}
                    </div>
                    <div className="text-xs">
                      Question Types: {paper.metadata.questionTypes.join(', ')}
                    </div>
                    <div className="text-xs">
                      Total Questions: {paper.metadata.totalQuestions}
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4"
                    size="sm"
                    onClick={() => handleDownload(paper.pdfContent, paper.fileName)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {papers.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No papers found. Generate some papers to see them here.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

