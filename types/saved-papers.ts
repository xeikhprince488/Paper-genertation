export interface SavedPaper {
  id: string
  title: string
  fileName: string
  pdfContent: string
  createdAt: string
  metadata: {
    grade: string
    subject: string
    chapter: string[]
    questionTypes: ('mcq' | 'short' | 'long')[]
    totalQuestions: number
  }
}

export interface SavedPapersState {
  papers: {
    [grade: string]: {
      [subject: string]: SavedPaper[]
    }
  }
}

