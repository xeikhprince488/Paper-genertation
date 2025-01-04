import { Question } from "@/types/questions"

interface QuestionDisplayProps {
  question: Question
  index: number
}

export function QuestionDisplay({ question, index }: QuestionDisplayProps) {
  return (
    <div className="p-4 border-b last:border-b-0">
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium">{index + 1}. </span>
            <span>{question.english}</span>
            <span className="text-sm text-muted-foreground">({question.marks} Marks)</span>
          </div>
          
          {question.type === 'mcq' && (
            <div className="ml-8 space-y-1">
              {question.options.map((option) => (
                <div key={option.value}>
                  <span className="font-medium">{option.value}) </span>
                  {option.english}
                </div>
              ))}
            </div>
          )}

          {(question.type === 'short' || question.type === 'long') && (
            <div className="ml-8 mt-2">
              <div className="text-sm text-muted-foreground">Answer:</div>
              <div className="mt-1">{question.answer.english}</div>
              {question.type === 'long' && question.outline && (
                <div className="mt-2">
                  <div className="text-sm text-muted-foreground">Outline:</div>
                  <ul className="list-disc ml-4 mt-1">
                    {question.outline.english.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 text-right">
          <div className="flex items-center justify-end gap-2 mb-2">
            <span className="font-medium">{index + 1}. </span>
            <span style={{ direction: 'rtl' }}>{question.urdu}</span>
          </div>

          {question.type === 'mcq' && (
            <div className="mr-8 space-y-1">
              {question.options.map((option) => (
                <div key={option.value} style={{ direction: 'rtl' }}>
                  <span className="font-medium">({option.value}</span>
                  {option.urdu}
                </div>
              ))}
            </div>
          )}

          {(question.type === 'short' || question.type === 'long') && (
            <div className="mr-8 mt-2">
              <div className="text-sm text-muted-foreground">:جواب</div>
              <div className="mt-1" style={{ direction: 'rtl' }}>{question.answer.urdu}</div>
              {question.type === 'long' && question.outline && (
                <div className="mt-2">
                  <div className="text-sm text-muted-foreground">:خاکہ</div>
                  <ul className="list-disc mr-4 mt-1" style={{ direction: 'rtl' }}>
                    {question.outline.urdu.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

