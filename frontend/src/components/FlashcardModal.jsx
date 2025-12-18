import { X } from 'lucide-react'
import { Button } from './Button'

export function FlashcardModal({ isOpen, onClose, flashcard }) {
  if (!isOpen || !flashcard) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-black bg-gray-100 px-3 py-1 rounded-full">
              {flashcard.topic}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Question */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Question
            </h3>
            <p className="text-2xl font-semibold text-gray-900 leading-relaxed">
              {flashcard.front}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-gray-200"></div>

          {/* Answer */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Answer
            </h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {flashcard.back}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t-2 border-gray-200 px-6 py-4 flex justify-end">
          <Button onClick={onClose} className="bg-black hover:bg-gray-800">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
