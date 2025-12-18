import { Brain, FileText, Lightbulb, Sparkles, Clock, Zap } from 'lucide-react'
import { Card, CardContent } from './Card'

const steps = [
  { icon: FileText, label: 'Extracting topics from your notes' },
  { icon: Brain, label: 'Creating knowledge base with RAG' },
  { icon: Lightbulb, label: 'Generating personalized study plan' },
  { icon: Sparkles, label: 'Creating interactive flashcards' },
  { icon: Zap, label: 'Building practice questions' },
  { icon: Clock, label: 'Designing spaced repetition schedule' },
]

export function LoadingState() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-sm border-2 border-gray-200 bg-white overflow-hidden">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-8">
            {/* Animated Logo */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-black rounded-full blur-xl opacity-20 animate-pulse"></div>
                <div className="relative bg-black p-6 rounded-xl">
                  <Brain className="h-12 w-12 text-white animate-pulse" />
                </div>
              </div>
            </div>
            
            {/* Title */}
            <div>
              <h3 className="text-3xl font-bold text-black mb-3">
                AI is Working Its Magic
              </h3>
              <p className="text-gray-600 text-lg">
                Analyzing your materials and generating personalized content...
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4 text-left max-w-lg mx-auto">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="bg-white p-2 rounded-lg border border-gray-200">
                    <step.icon className="h-6 w-6 text-black" />
                  </div>
                  <span className="text-gray-700 font-medium">{step.label}</span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="pt-6 space-y-3">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-3 rounded-full bg-black animate-pulse"
                  style={{ 
                    width: '70%',
                    animation: 'progress 2s ease-in-out infinite'
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                This usually takes 30-60 seconds. Hang tight!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
