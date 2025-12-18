import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Loader2, Download, Sparkles } from 'lucide-react'
import { LandingPage } from './components/LandingPage'
import { Header } from './components/Header'
import { FileUpload } from './components/FileUpload'
import { Button } from './components/Button'
import { Card, CardHeader, CardTitle, CardContent } from './components/Card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs'
import { Flashcard } from './components/Flashcard'
import { FlashcardModal } from './components/FlashcardModal'
import { MCQCard } from './components/MCQCard'
import { LoadingState } from './components/LoadingState'
import { MarkdownContent } from './components/MarkdownContent'
import { generateStudyMaterials, downloadStudyMaterials } from './api/client'

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [notes, setNotes] = useState([])
  const [results, setResults] = useState(null)
  const [selectedFlashcard, setSelectedFlashcard] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: () => generateStudyMaterials(notes),
    onSuccess: (data) => {
      try {
        // Parse JSON strings from backend
        let flashcardsData = []
        let mcqsData = []
        
        try {
          flashcardsData = typeof data.flashcards === 'string' 
            ? JSON.parse(data.flashcards) 
            : data.flashcards
        } catch (e) {
          console.error('Error parsing flashcards:', e)
          flashcardsData = []
        }
        
        try {
          mcqsData = typeof data.mcqs === 'string' 
            ? JSON.parse(data.mcqs) 
            : data.mcqs
        } catch (e) {
          console.error('Error parsing MCQs:', e)
          mcqsData = []
        }
        
        // Set results with actual data
        setResults({
          studyPlan: data.study_plan || '# Study Plan\n\nNo content generated.',
          flashcards: flashcardsData,
          mcqs: mcqsData,
          spacedRep: data.spaced_repetition || '# Spaced Repetition\n\nNo content generated.'
        })
      } catch (error) {
        console.error('Error processing study materials:', error)
        alert('Error processing study materials. Please try again.')
      }
    },
    onError: (error) => {
      alert(`Error: ${error.message}. Make sure the backend is running on http://localhost:8000`)
    }
  })

  const handleGenerate = () => {
    if (notes.length === 0) {
      alert('Please upload your notes PDF')
      return
    }
    mutation.mutate()
  }

  const handleDemo = () => {
    // Show demo results without API call
    setResults({
      studyPlan: `# React Development Study Plan

## Week 1-2: Foundations (10 hours)
**Learning Objectives:**
- Understand React core concepts
- Master JSX syntax
- Build basic components

**Daily Tasks:**
- Day 1-2: React introduction, setup environment (2h)
- Day 3-4: Components and Props (2h)
- Day 5-6: State and Lifecycle (2h)
- Day 7: Practice project - Todo App (4h)

## Week 3-4: Hooks Deep Dive (12 hours)
**Learning Objectives:**
- Master useState and useEffect
- Understand hook rules
- Create custom hooks

**Daily Tasks:**
- Day 1-3: useState and useEffect (4h)
- Day 4-5: useContext and useReducer (3h)
- Day 6-7: Custom hooks and patterns (5h)

## Week 5-6: Advanced Patterns (10 hours)
**Learning Objectives:**
- Implement Context API
- Understand composition patterns
- Handle errors gracefully

**Recommended Resources:**
- React Official Documentation
- "React Hooks in Action" book
- Frontend Masters courses`,
      flashcards: [
        { front: 'What is React?', back: 'A JavaScript library for building user interfaces, developed by Facebook', topic: 'React Basics' },
        { front: 'What is JSX?', back: 'JavaScript XML - a syntax extension that allows writing HTML-like code in JavaScript', topic: 'React Basics' },
        { front: 'What are Props?', back: 'Properties passed from parent to child components. They are read-only.', topic: 'Components' },
        { front: 'What is State?', back: 'Data that changes over time. When state changes, React re-renders the component.', topic: 'State Management' },
        { front: 'What is the Virtual DOM?', back: 'A lightweight copy of the actual DOM that React uses to optimize rendering', topic: 'Performance' },
        { front: 'What is useState?', back: 'A Hook that lets you add state to functional components', topic: 'Hooks' },
        { front: 'What is useEffect?', back: 'A Hook for handling side effects like data fetching, subscriptions, or DOM manipulation', topic: 'Hooks' },
        { front: 'What is useContext?', back: 'A Hook that lets you access context values without prop drilling', topic: 'Hooks' },
        { front: 'What is React.memo?', back: 'A higher-order component that memoizes a component to prevent unnecessary re-renders', topic: 'Performance' },
        { front: 'What is the Context API?', back: 'A way to pass data through the component tree without passing props manually at every level', topic: 'Advanced Patterns' }
      ],
      mcqs: [
        {
          question: 'Which Hook is used to manage component state in functional components?',
          options: ['useState', 'useEffect', 'useContext', 'useReducer'],
          correct: 0,
          explanation: 'useState is the primary Hook for managing state in functional components',
          topic: 'Hooks'
        },
        {
          question: 'What does JSX stand for?',
          options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'],
          correct: 0,
          explanation: 'JSX stands for JavaScript XML, allowing HTML-like syntax in JavaScript',
          topic: 'React Basics'
        },
        {
          question: 'Which method is used to update state in class components?',
          options: ['this.state = newState', 'this.setState()', 'this.updateState()', 'this.changeState()'],
          correct: 1,
          explanation: 'this.setState() is the correct method to update state in class components',
          topic: 'State Management'
        },
        {
          question: 'What is the purpose of the Virtual DOM?',
          options: ['Store user data', 'Optimize rendering performance', 'Handle routing', 'Manage API calls'],
          correct: 1,
          explanation: 'The Virtual DOM optimizes rendering by comparing changes and updating only what changed',
          topic: 'Performance'
        },
        {
          question: 'Which Hook is used for side effects?',
          options: ['useState', 'useEffect', 'useMemo', 'useCallback'],
          correct: 1,
          explanation: 'useEffect is specifically designed for handling side effects in functional components',
          topic: 'Hooks'
        }
      ],
      spacedRep: `# Spaced Repetition Schedule

## Day 1: Initial Learning
- Read all React fundamentals notes
- Watch introduction videos
- Complete first coding exercises
- Review: Components, JSX, Props

## Day 3: First Review
- Review Day 1 materials
- Focus on: State management
- Practice: Build a counter component
- Quiz yourself on basic concepts

## Day 7: Second Review
- Review all previous materials
- Focus on: Hooks (useState, useEffect)
- Practice: Build a data fetching component
- Complete flashcard review

## Day 14: Third Review
- Comprehensive review of Weeks 1-2
- Focus on: Advanced hooks and patterns
- Practice: Build a mini-project
- Take practice MCQs

## Day 30: Fourth Review
- Review entire course material
- Focus on: Performance optimization
- Practice: Refactor previous projects
- Complete all flashcards

## Day 60: Fifth Review
- Final comprehensive review
- Focus on: Best practices and patterns
- Practice: Build a complete application
- Self-assessment quiz

## Tips for Effective Spaced Repetition
1. Review actively, don't just read
2. Test yourself with flashcards
3. Build projects to apply knowledge
4. Explain concepts to others
5. Take breaks between study sessions`
    })
  }

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        showBackButton={!results} 
        onBack={() => {
          setShowLanding(true)
          setResults(null)
          setNotes([])
        }} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {mutation.isPending ? (
          <LoadingState />
        ) : !results ? (
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-sm border-2 border-gray-200 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="bg-black p-4 rounded-xl">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-black">
                  Upload Your Notes
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Upload your notes PDF to generate personalized study materials
                </p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  <FileUpload
                    files={notes}
                    onFilesChange={setNotes}
                    accept={{ 'application/pdf': ['.pdf'] }}
                    multiple={true}
                    label="📚 Upload Your Notes (PDF)"
                  />
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    onClick={handleGenerate}
                    disabled={mutation.isPending || notes.length === 0}
                    className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg shadow-md hover:shadow-lg transition-all"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating Your Study Materials...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Study Materials
                      </>
                    )}
                  </Button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">or</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleDemo}
                    variant="outline"
                    className="w-full py-6 text-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  >
                    Try Demo (No Upload Required)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-200">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-black">
                    Your Study Materials
                  </h2>
                  <p className="text-gray-600 mt-1">
                    AI-generated content ready for your learning journey
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={async () => {
                      try {
                        const zipData = await downloadStudyMaterials({
                          study_plan: results.studyPlan,
                          flashcards: typeof results.flashcards === 'string' 
                            ? results.flashcards 
                            : JSON.stringify(results.flashcards, null, 2),
                          mcqs: typeof results.mcqs === 'string' 
                            ? results.mcqs 
                            : JSON.stringify(results.mcqs, null, 2),
                          spaced_repetition: results.spacedRep
                        })
                        const url = window.URL.createObjectURL(zipData)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = 'study_materials.zip'
                        document.body.appendChild(a)
                        a.click()
                        window.URL.revokeObjectURL(url)
                        document.body.removeChild(a)
                      } catch (error) {
                        alert('Error downloading materials: ' + error.message)
                      }
                    }}
                    className="bg-black hover:bg-gray-800"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download ZIP
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setResults(null)
                      setNotes([])
                    }}
                    className="border-2 border-gray-300 hover:border-gray-400"
                  >
                    New Upload
                  </Button>
                </div>
              </div>
            </div>

            <Tabs defaultValue="plan">
              {({ activeTab, setActiveTab }) => (
                <>
                  <TabsList activeTab={activeTab} setActiveTab={setActiveTab}>
                    <TabsTrigger value="plan">Study Plan</TabsTrigger>
                    <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                    <TabsTrigger value="mcqs">MCQs</TabsTrigger>
                    <TabsTrigger value="spaced">Spaced Repetition</TabsTrigger>
                  </TabsList>

                  <TabsContent value="plan" activeTab={activeTab}>
                    <Card className="shadow-sm border-2 border-gray-200 bg-white">
                      <CardContent className="pt-6">
                        <MarkdownContent content={results.studyPlan} />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="flashcards" activeTab={activeTab}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {results.flashcards.map((card, index) => (
                        <Flashcard 
                          key={index} 
                          {...card}
                          onExpand={() => {
                            setSelectedFlashcard(card)
                            setIsModalOpen(true)
                          }}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="mcqs" activeTab={activeTab}>
                    <div className="space-y-4">
                      {results.mcqs.map((mcq, index) => (
                        <MCQCard key={index} {...mcq} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="spaced" activeTab={activeTab}>
                    <Card className="shadow-sm border-2 border-gray-200 bg-white">
                      <CardContent className="pt-6">
                        <MarkdownContent content={results.spacedRep} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        )}
      </main>

      {/* Flashcard Modal */}
      <FlashcardModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedFlashcard(null)
        }}
        flashcard={selectedFlashcard}
      />
    </div>
  )
}

export default App
