'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Question {
  id: string
  category: string
  text: string
  options: {
    value: string
    text: string
    score: number
  }[]
}

const questions: Question[] = [
  // Cognitive Style Questions
  {
    id: 'cog_1',
    category: 'Cognitive Style',
    text: 'When faced with a complex problem, I prefer to:',
    options: [
      { value: 'analyze', text: 'Analyze all the details systematically', score: 3 },
      { value: 'intuitive', text: 'Trust my gut feeling and intuition', score: 2 },
      { value: 'collaborate', text: 'Discuss with others to find solutions', score: 1 },
      { value: 'research', text: 'Research and gather more information first', score: 4 }
    ]
  },
  {
    id: 'cog_2',
    category: 'Cognitive Style',
    text: 'I learn best when information is presented:',
    options: [
      { value: 'visual', text: 'Through charts, diagrams, and visual aids', score: 3 },
      { value: 'verbal', text: 'Through written or spoken explanations', score: 2 },
      { value: 'hands-on', text: 'Through hands-on experience and practice', score: 1 },
      { value: 'mixed', text: 'Through a combination of different methods', score: 4 }
    ]
  },
  // Emotional Intelligence Questions
  {
    id: 'eq_1',
    category: 'Emotional Intelligence',
    text: 'When someone is upset, I typically:',
    options: [
      { value: 'listen', text: 'Listen actively and show empathy', score: 4 },
      { value: 'solve', text: 'Try to solve their problem immediately', score: 2 },
      { value: 'comfort', text: 'Offer comfort and reassurance', score: 3 },
      { value: 'distance', text: 'Give them space to process their emotions', score: 1 }
    ]
  },
  {
    id: 'eq_2',
    category: 'Emotional Intelligence',
    text: 'I am most aware of my emotions when:',
    options: [
      { value: 'always', text: 'I am constantly monitoring my emotional state', score: 4 },
      { value: 'stress', text: 'I am under stress or pressure', score: 2 },
      { value: 'conflict', text: 'I am in conflict with others', score: 3 },
      { value: 'reflection', text: 'I take time to reflect and journal', score: 1 }
    ]
  },
  // Leadership Questions
  {
    id: 'lead_1',
    category: 'Leadership',
    text: 'In a team setting, I naturally:',
    options: [
      { value: 'lead', text: 'Take charge and provide direction', score: 4 },
      { value: 'support', text: 'Support and encourage team members', score: 3 },
      { value: 'facilitate', text: 'Facilitate discussion and collaboration', score: 2 },
      { value: 'contribute', text: 'Contribute ideas and expertise', score: 1 }
    ]
  },
  {
    id: 'lead_2',
    category: 'Leadership',
    text: 'When making decisions that affect others, I prioritize:',
    options: [
      { value: 'efficiency', text: 'Efficiency and achieving goals quickly', score: 2 },
      { value: 'consensus', text: 'Building consensus and getting buy-in', score: 4 },
      { value: 'quality', text: 'Quality and thoroughness of the decision', score: 3 },
      { value: 'innovation', text: 'Innovation and creative solutions', score: 1 }
    ]
  },
  // Communication Questions
  {
    id: 'comm_1',
    category: 'Communication',
    text: 'I prefer to communicate important information:',
    options: [
      { value: 'face-to-face', text: 'Face-to-face or through video calls', score: 4 },
      { value: 'written', text: 'Through written documents or emails', score: 2 },
      { value: 'meetings', text: 'In group meetings or presentations', score: 3 },
      { value: 'casual', text: 'Through casual conversations', score: 1 }
    ]
  },
  {
    id: 'comm_2',
    category: 'Communication',
    text: 'When giving feedback, I focus on:',
    options: [
      { value: 'constructive', text: 'Providing constructive, actionable feedback', score: 4 },
      { value: 'positive', text: 'Highlighting strengths and achievements', score: 2 },
      { value: 'balanced', text: 'Balancing positive and negative feedback', score: 3 },
      { value: 'direct', text: 'Being direct and straightforward', score: 1 }
    ]
  },
  // Personal Growth Questions
  {
    id: 'growth_1',
    category: 'Personal Growth',
    text: 'I view challenges and setbacks as:',
    options: [
      { value: 'opportunities', text: 'Opportunities for learning and growth', score: 4 },
      { value: 'obstacles', text: 'Obstacles to overcome', score: 2 },
      { value: 'lessons', text: 'Valuable lessons for the future', score: 3 },
      { value: 'motivation', text: 'Motivation to work harder', score: 1 }
    ]
  },
  {
    id: 'growth_2',
    category: 'Personal Growth',
    text: 'I invest most in my personal development through:',
    options: [
      { value: 'reading', text: 'Reading books and articles', score: 2 },
      { value: 'courses', text: 'Taking courses and workshops', score: 3 },
      { value: 'mentoring', text: 'Seeking mentorship and coaching', score: 4 },
      { value: 'practice', text: 'Daily practice and reflection', score: 1 }
    ]
  }
]

export default function AssessmentPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isComplete, setIsComplete] = useState(false)

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setIsComplete(true)
      // Calculate results and navigate to results page
      const results = calculateResults()
      localStorage.setItem('assessmentResults', JSON.stringify(results))
      router.push('/results')
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const calculateResults = () => {
    const scores: Record<string, number> = {
      'Cognitive Style': 0,
      'Emotional Intelligence': 0,
      'Leadership': 0,
      'Communication': 0,
      'Personal Growth': 0
    }

    questions.forEach(question => {
      const answer = answers[question.id]
      if (answer) {
        const option = question.options.find(opt => opt.value === answer)
        if (option) {
          scores[question.category] += option.score
        }
      }
    })

    return scores
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
          <p className="text-gray-600">Redirecting to your results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Personality Assessment</h1>
          <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="card"
        >
          <div className="mb-6">
            <span className="inline-block bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
              {currentQ.category}
            </span>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {currentQ.text}
            </h2>
          </div>

          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <label
                key={option.value}
                className={`block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  answers[currentQ.id] === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <input
                  type="radio"
                  name={currentQ.id}
                  value={option.value}
                  checked={answers[currentQ.id] === option.value}
                  onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                  className="sr-only"
                />
                <div className={`flex items-center`}>
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                    answers[currentQ.id] === option.value
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQ.id] === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                    )}
                  </div>
                  <span className="text-gray-900">{option.text}</span>
                </div>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              currentQuestion === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <button
            onClick={nextQuestion}
            disabled={!answers[currentQ.id]}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              !answers[currentQ.id]
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
} 