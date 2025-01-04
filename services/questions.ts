import mcqBank from '@/data/mcq-bank.json'
import { Question } from '@/types/questions'

export async function fetchQuestions(
  subject: string,
  grade: string,
  chapters: string[],
  count: number,
  type: 'mcq' | 'short' | 'long'
): Promise<Question[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const bankKey = `${subject}-${grade}`
  const questions: Question[] = []

  if (bankKey in mcqBank) {
    chapters.forEach(chapter => {
      // Only get questions of the specified type
      const chapterQuestions = mcqBank[bankKey as keyof typeof mcqBank]?.[chapter as keyof (typeof mcqBank)[keyof typeof mcqBank]]?.[type]
      if (chapterQuestions) {
        // Ensure type safety by checking question type
        const typedQuestions = chapterQuestions.map(q => {
          if (type === 'mcq') {
            return { ...q, type: 'mcq' as const }
          } else if (type === 'short') {
            return { ...q, type: 'short' as const }
          } else {
            return { ...q, type: 'long' as const }
          }
        })
        // Only push questions that match the expected type structure
        if (type === 'mcq') {
          const mcqQuestions = typedQuestions.filter((q): q is Question & { type: 'mcq' } => 
            q.type === 'mcq' && 'correct' in q
          )
          questions.push(...mcqQuestions)
        } else if (type === 'short' || type === 'long') {
          const answerQuestions = typedQuestions.filter((q): q is Question & { type: 'short' | 'long' } => 
            (q.type === 'short' || q.type === 'long') && 'answer' in q
          )
          questions.push(...answerQuestions)
        }
      }
    })
  }

  // Shuffle and return exactly the requested number
  const shuffled = questions.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export async function savePaper(paperContent: string, fileName: string): Promise<boolean> {
  try {
    // In a real application, this would be an API call to save the paper
    // For now, we'll simulate saving
    console.log('Saving paper:', fileName)
    localStorage.setItem(`saved-paper-${fileName}`, paperContent)
    return true
  } catch (error) {
    console.error('Error saving paper:', error)
    return false
  }
}

