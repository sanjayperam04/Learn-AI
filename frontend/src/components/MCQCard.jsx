import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Check, X, Lightbulb } from 'lucide-react'

export function MCQCard({ question, options, correct, explanation, topic }) {
  const [selected, setSelected] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const handleSelect = (index) => {
    setSelected(index)
    setShowAnswer(true)
  }

  const letters = ['A', 'B', 'C', 'D']

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <h4 className="font-semibold text-lg text-gray-900 leading-relaxed">{question}</h4>
        <span className="text-xs font-semibold text-black bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
          {topic}
        </span>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={showAnswer}
            className={cn(
              'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 transform',
              !showAnswer && 'hover:border-gray-400 hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]',
              showAnswer && index === correct && 'border-green-500 bg-green-50 shadow-sm',
              showAnswer && index === selected && index !== correct && 'border-red-500 bg-red-50 shadow-sm',
              !showAnswer && 'border-gray-200 hover:bg-gray-50',
              showAnswer && index !== correct && index !== selected && 'opacity-60'
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <span className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  !showAnswer && "bg-gray-100 text-gray-700",
                  showAnswer && index === correct && "bg-green-500 text-white",
                  showAnswer && index === selected && index !== correct && "bg-red-500 text-white",
                  showAnswer && index !== correct && index !== selected && "bg-gray-100 text-gray-400"
                )}>
                  {letters[index]}
                </span>
                <span className="text-gray-800">{option}</span>
              </div>
              {showAnswer && index === correct && (
                <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
              )}
              {showAnswer && index === selected && index !== correct && (
                <X className="h-6 w-6 text-red-600 flex-shrink-0" />
              )}
            </div>
          </button>
        ))}
      </div>

      {showAnswer && (
        <div className="mt-5 p-5 bg-gray-50 rounded-lg border-2 border-gray-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-black mb-1">Explanation</p>
              <p className="text-sm text-gray-700 leading-relaxed">{explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
