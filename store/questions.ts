import { create } from 'zustand'
import { Question, QuestionBankState } from '@/types/questions'

const useQuestionStore = create<QuestionBankState & {
  setAvailableQuestions: (questions: Question[]) => void
  setSelectedQuestions: (questions: Question[]) => void
  setRandomQuestions: (questions: Question[]) => void
  setShowPaper: (show: boolean) => void
  clearSelections: () => void
}>((set) => ({
  availableQuestions: [],
  selectedQuestions: [],
  randomQuestions: [],
  showPaper: false,
  setAvailableQuestions: (questions) => set({ availableQuestions: questions }),
  setSelectedQuestions: (questions) => set({ selectedQuestions: questions }),
  setRandomQuestions: (questions) => set({ randomQuestions: questions }),
  setShowPaper: (show) => set({ showPaper: show }),
  clearSelections: () => set({ selectedQuestions: [], randomQuestions: [] }),
}))

export default useQuestionStore

