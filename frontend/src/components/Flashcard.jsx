import { useState } from 'react'
import { RotateCcw, Maximize2 } from 'lucide-react'

export function Flashcard({ front, back, topic, onExpand }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = (e) => {
    setIsFlipped(!isFlipped)
  }

  const handleExpand = (e) => {
    e.stopPropagation()
    onExpand()
  }

  return (
    <div
      className="relative h-72 cursor-pointer group"
      onClick={handleClick}
    >
      <div
        className="relative w-full h-full transition-all duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front */}
        <div
          className="absolute w-full h-full bg-white border-2 border-gray-200 rounded-xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-black bg-gray-100 px-3 py-1 rounded-full">
              {topic}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleExpand}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title="Expand"
              >
                <Maximize2 className="h-4 w-4 text-gray-400 hover:text-black transition-colors" />
              </button>
              <RotateCcw className="h-4 w-4 text-gray-400 group-hover:text-black transition-colors" />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <p className="text-xl font-medium text-gray-900 text-center leading-relaxed line-clamp-4">
              {front}
            </p>
          </div>
          <span className="text-xs text-gray-400 text-center">Click to reveal answer</span>
        </div>

        {/* Back */}
        <div
          className="absolute w-full h-full bg-black rounded-xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-white bg-white/20 px-3 py-1 rounded-full">
              {topic}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleExpand}
                className="p-1 hover:bg-white/10 rounded transition-colors"
                title="Expand"
              >
                <Maximize2 className="h-4 w-4 text-white/70 hover:text-white transition-colors" />
              </button>
              <RotateCcw className="h-4 w-4 text-white/70 group-hover:text-white transition-colors" />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <p className="text-xl font-medium text-white text-center leading-relaxed line-clamp-4">
              {back}
            </p>
          </div>
          <span className="text-xs text-white/70 text-center">Click to see question</span>
        </div>
      </div>
    </div>
  )
}
