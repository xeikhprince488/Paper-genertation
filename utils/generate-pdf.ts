import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { Question } from '@/types/questions'
import { SavedPaper } from '@/types/saved-papers'
import useSavedPapersStore from '@/store/saved-papers'

export async function generatePDF(
  questions: Question[], 
  metadata: {
    grade: string
    subject: string
    chapter: string[]
  }
): Promise<boolean> {
  try {
    const doc = new jsPDF()
    
    // Add header
    doc.setFontSize(20)
    doc.text(`${metadata.subject} Paper - ${metadata.grade}`, 105, 20, { align: "center" })
    
    let yPos = 40
    let questionNumber = 1

    // Group questions by type while maintaining order
    const mcqs = questions.filter(q => q.type === 'mcq')
    const shortQuestions = questions.filter(q => q.type === 'short')
    const longQuestions = questions.filter(q => q.type === 'long')

    // Process each section only if it has questions
    if (mcqs.length > 0) {
      doc.setFontSize(14)
      doc.text(`Q${questionNumber}. Choose the correct answer:`, 20, yPos)
      yPos += 15

      mcqs.forEach((question, index) => {
        if (yPos > 270) {
          doc.addPage()
          yPos = 20
        }

        doc.setFontSize(12)
        doc.text(`${index + 1}. ${question.english}`, 20, yPos)
        yPos += 10

        if ('options' in question) {
          question.options.forEach((option) => {
            doc.text(`${option.value}) ${option.english}`, 30, yPos)
            yPos += 7
          })
        }

        yPos += 5
      })

      questionNumber++
      yPos += 10
    }

    if (shortQuestions.length > 0) {
      if (yPos > 240) {
        doc.addPage()
        yPos = 20
      }

      doc.setFontSize(14)
      doc.text(`Q${questionNumber}. Answer the following short questions:`, 20, yPos)
      yPos += 15

      shortQuestions.forEach((question, index) => {
        if (yPos > 270) {
          doc.addPage()
          yPos = 20
        }

        doc.setFontSize(12)
        doc.text(`${index + 1}. ${question.english} (${question.marks} Marks)`, 20, yPos)
        yPos += 20
      })

      questionNumber++
      yPos += 10
    }

    if (longQuestions.length > 0) {
      if (yPos > 240) {
        doc.addPage()
        yPos = 20
      }

      doc.setFontSize(14)
      doc.text(`Q${questionNumber}. Answer the following in detail:`, 20, yPos)
      yPos += 15

      longQuestions.forEach((question, index) => {
        if (yPos > 270) {
          doc.addPage()
          yPos = 20
        }

        doc.setFontSize(12)
        doc.text(`${index + 1}. ${question.english} (${question.marks} Marks)`, 20, yPos)
        yPos += 30
      })
    }

    // Answer key on new page
    doc.addPage()
    doc.setFontSize(14)
    doc.text("Answer Key", 105, 20, { align: "center" })
    
    const answerData = questions.map((q, i) => {
      if (q.type === 'mcq') {
        return [i + 1, q.correct]
      } else {
        return [i + 1, 'See detailed answer key']
      }
    })
    
    // @ts-ignore
    doc.autoTable({
      startY: 30,
      head: [['Question No.', 'Answer']],
      body: answerData,
      theme: 'grid'
    })

    // Save the PDF
    const fileName = `${metadata.subject.toLowerCase()}-${metadata.grade.toLowerCase()}-${Date.now()}.pdf`
    const pdfContent = doc.output('datauristring')
    
    // Save to store
    const savedPaper: SavedPaper = {
      id: Date.now().toString(),
      title: `${metadata.subject} Paper - ${metadata.grade}`,
      fileName,
      pdfContent,
      createdAt: new Date().toISOString(),
      metadata: {
        ...metadata,
        questionTypes: Array.from(new Set(questions.map(q => q.type))),
        totalQuestions: questions.length
      }
    }

    useSavedPapersStore.getState().addPaper(savedPaper)
    
    // Download the PDF
    doc.save(fileName)
    return true
  } catch (error) {
    console.error('Error generating PDF:', error)
    return false
  }
}

