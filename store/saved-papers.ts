import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SavedPaper, SavedPapersState } from '@/types/saved-papers'

interface SavedPapersStore extends SavedPapersState {
  addPaper: (paper: SavedPaper) => void
  getPapersByGrade: (grade: string) => SavedPaper[]
  getPapersBySubject: (grade: string, subject: string) => SavedPaper[]
}

const useSavedPapersStore = create<SavedPapersStore>()(
  persist(
    (set, get) => ({
      papers: {},
      addPaper: (paper) => set((state) => {
        const newPapers = { ...state.papers }
        const { grade, subject } = paper.metadata
        
        if (!newPapers[grade]) {
          newPapers[grade] = {}
        }
        if (!newPapers[grade][subject]) {
          newPapers[grade][subject] = []
        }
        
        newPapers[grade][subject] = [
          ...newPapers[grade][subject],
          paper
        ]
        
        return { papers: newPapers }
      }),
      getPapersByGrade: (grade) => {
        const state = get()
        if (!state.papers[grade]) return []
        return Object.values(state.papers[grade]).flat()
      },
      getPapersBySubject: (grade, subject) => {
        const state = get()
        if (!state.papers[grade]?.[subject]) return []
        return state.papers[grade][subject]
      }
    }),
    {
      name: 'saved-papers-storage'
    }
  )
)

export default useSavedPapersStore

