import { Brain, Sparkles, Zap, BookOpen, Target, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from './Button'

export function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-8">
            {/* Logo & Badge */}
            <div className="flex flex-col items-center space-y-4">
              <div className="inline-flex items-center space-x-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-full text-sm font-medium border border-gray-200">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Learning Assistant</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-black p-3 rounded-xl">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-black">
                  Learn AI
                </h1>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Transform Your Notes Into
                <span className="block text-black">
                  Personalized Study Materials
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Upload your notes PDF and get AI-generated study plans, flashcards, 
                practice questions, and spaced repetition schedules in seconds.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={onGetStarted}
                className="px-8 py-6 text-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              >
                Try Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 pt-8">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-black" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-black" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-black" />
                <span>Instant results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Study Smarter
          </h3>
          <p className="text-xl text-gray-600">
            Powered by advanced AI to help you learn more effectively
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border-2 border-gray-200">
            <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Target className="h-7 w-7 text-black" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Smart Study Plans</h4>
            <p className="text-gray-600 leading-relaxed">
              Get personalized study schedules with weekly breakdowns, time estimates, 
              and learning objectives tailored to your syllabus.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border-2 border-gray-200">
            <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <BookOpen className="h-7 w-7 text-black" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Interactive Flashcards</h4>
            <p className="text-gray-600 leading-relaxed">
              AI-generated flashcards from your notes with flip animations. 
              Perfect for quick reviews and memorization.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border-2 border-gray-200">
            <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Zap className="h-7 w-7 text-black" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Practice Questions</h4>
            <p className="text-gray-600 leading-relaxed">
              Multiple-choice questions with detailed explanations to test 
              your understanding and prepare for exams.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border-2 border-gray-200">
            <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Clock className="h-7 w-7 text-black" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Spaced Repetition</h4>
            <p className="text-gray-600 leading-relaxed">
              Science-backed review schedules to maximize retention and 
              minimize forgetting over time.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border-2 border-gray-200">
            <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Sparkles className="h-7 w-7 text-black" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Analysis</h4>
            <p className="text-gray-600 leading-relaxed">
              Advanced language models extract key concepts and generate 
              high-quality study materials automatically.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border-2 border-gray-200">
            <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Brain className="h-7 w-7 text-black" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Export Everything</h4>
            <p className="text-gray-600 leading-relaxed">
              Download all your study materials as a ZIP file. 
              Access offline anytime, anywhere.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h3>
            <p className="text-xl text-indigo-100">
              Three simple steps to better studying
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/5 rounded-xl p-8 border border-white/10">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-black">
                  1
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Upload Notes</h4>
                <p className="text-gray-300">
                  Upload your lecture notes in PDF format
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/5 rounded-xl p-8 border border-white/10">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-black">
                  2
                </div>
                <h4 className="text-xl font-bold text-white mb-3">AI Processing</h4>
                <p className="text-gray-300">
                  Our AI analyzes your content and generates personalized study materials
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/5 rounded-xl p-8 border border-white/10">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-black">
                  3
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Study & Excel</h4>
                <p className="text-gray-300">
                  Review flashcards, take quizzes, and follow your personalized study plan
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Start Learning Smarter
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-black" />
              <span className="text-black font-bold text-lg">Learn AI</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2024 Learn AI. Powered by Groq & LangChain.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
