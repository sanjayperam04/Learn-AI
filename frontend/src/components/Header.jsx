import { Brain, ArrowLeft } from 'lucide-react'
import { Button } from './Button'

export function Header({ showBackButton, onBack }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-black p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-black">
                Learn AI
              </h1>
              <p className="text-xs text-gray-600">AI-Powered Study Copilot</p>
            </div>
          </div>
          
          {showBackButton && (
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
