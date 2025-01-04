export interface Option {
  english: string
  urdu: string
  value: 'A' | 'B' | 'C' | 'D'
}

export interface BaseQuestion {
  id: number
  english: string
  urdu: string
  chapter: string
  type: 'mcq' | 'short' | 'long'
  marks: number
}

export interface MCQQuestion extends BaseQuestion {
  type: 'mcq'
  options: Option[]
  correct: 'A' | 'B' | 'C' | 'D'
}

export interface ShortQuestion extends BaseQuestion {
  type: 'short'
  answer: {
    english: string
    urdu: string
  }
}

export interface LongQuestion extends BaseQuestion {
  type: 'long'
  answer: {
    english: string
    urdu: string
  }
  outline?: {
    english: string[]
    urdu: string[]
  }
}

export type Question = MCQQuestion | ShortQuestion | LongQuestion

export interface QuestionConfig {
  type: 'mcq' | 'short' | 'long'
  count: number
  marks: number
}

export interface PaperConfig {
  totalMarks: number
  sections: QuestionConfig[]
}

