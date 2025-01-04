interface AnswerKeyProps {
  answers: { number: number; answer: string }[]
}

export function AnswerKey({ answers }: AnswerKeyProps) {
  return (
    <div className="flex flex-wrap gap-1 p-4 border-t">
      {answers.map(({ number, answer }) => (
        <div key={number} className="flex items-center">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm">
            {number}
          </div>
          <div className="w-12 h-8 border flex items-center justify-center text-sm">
            {answer}
          </div>
        </div>
      ))}
    </div>
  )
}

