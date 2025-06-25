"use client"

import React from 'react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Heart, 
  Users, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Lightbulb,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

interface AssessmentResults {
  'Cognitive Style': number
  'Emotional Intelligence': number
  'Leadership': number
  'Communication': number
  'Personal Growth': number
}

interface CoachingRecommendation {
  category: string
  title: string
  description: string
  actions: string[]
  resources: string[]
  icon: React.ReactNode
}

export default function ResultsPage() {
  const [results, setResults] = useState<AssessmentResults | null>(null)
  const [recommendations, setRecommendations] = useState<CoachingRecommendation[]>([])

  useEffect(() => {
    const storedResults = localStorage.getItem('assessmentResults')
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults)
      setResults(parsedResults)
      generateRecommendations(parsedResults)
    }
  }, [])

  const generateRecommendations = (results: AssessmentResults) => {
    const recs: CoachingRecommendation[] = []

    // Cognitive Style recommendations
    if (results['Cognitive Style'] < 6) {
      recs.push({
        category: 'Cognitive Style',
        title: 'Enhance Your Decision-Making Process',
        description: 'Develop a more systematic approach to problem-solving and decision-making.',
        actions: [
          'Practice structured thinking techniques like mind mapping',
          'Use decision matrices for complex choices',
          'Develop analytical skills through puzzles and logic games',
          'Learn to balance intuition with data-driven approaches'
        ],
        resources: [
          'Book: "Thinking, Fast and Slow" by Daniel Kahneman',
          'Course: Critical Thinking and Problem Solving',
          'App: Lumosity Brain Training',
          'Practice: Daily journaling of decision-making processes'
        ],
        icon: <Brain className="w-6 h-6" />
      })
    }

    // Emotional Intelligence recommendations
    if (results['Emotional Intelligence'] < 6) {
      recs.push({
        category: 'Emotional Intelligence',
        title: 'Build Emotional Awareness and Empathy',
        description: 'Strengthen your ability to understand and manage emotions in yourself and others.',
        actions: [
          'Practice daily emotional check-ins',
          'Learn active listening techniques',
          'Develop empathy through perspective-taking exercises',
          'Practice mindfulness and emotional regulation'
        ],
        resources: [
          'Book: "Emotional Intelligence" by Daniel Goleman',
          'App: Headspace for mindfulness practice',
          'Course: Emotional Intelligence in Leadership',
          'Practice: Regular feedback sessions with trusted colleagues'
        ],
        icon: <Heart className="w-6 h-6" />
      })
    }

    // Leadership recommendations
    if (results['Leadership'] < 6) {
      recs.push({
        category: 'Leadership',
        title: 'Develop Your Leadership Presence',
        description: 'Build confidence and skills to inspire and guide others effectively.',
        actions: [
          'Take on small leadership roles in projects',
          'Practice public speaking and presentation skills',
          'Learn conflict resolution techniques',
          'Develop a clear vision and communication style'
        ],
        resources: [
          'Book: "The Leadership Challenge" by Kouzes & Posner',
          'Course: Leadership Fundamentals',
          'Practice: Join Toastmasters for public speaking',
          'Mentorship: Find a leadership mentor in your field'
        ],
        icon: <Users className="w-6 h-6" />
      })
    }

    // Communication recommendations
    if (results['Communication'] < 6) {
      recs.push({
        category: 'Communication',
        title: 'Master Effective Communication',
        description: 'Improve your ability to convey ideas clearly and build strong relationships.',
        actions: [
          'Practice active listening in all conversations',
          'Learn to adapt communication style to different audiences',
          'Develop storytelling skills for better engagement',
          'Practice giving and receiving constructive feedback'
        ],
        resources: [
          'Book: "Crucial Conversations" by Patterson et al.',
          'Course: Professional Communication Skills',
          'Practice: Record and review your presentations',
          'Tool: Use communication frameworks like SBAR'
        ],
        icon: <Target className="w-6 h-6" />
      })
    }

    // Personal Growth recommendations
    if (results['Personal Growth'] < 6) {
      recs.push({
        category: 'Personal Growth',
        title: 'Cultivate a Growth Mindset',
        description: 'Embrace challenges as opportunities and commit to continuous learning.',
        actions: [
          'Set specific, measurable goals for personal development',
          'Create a daily learning routine',
          'Seek feedback and learn from failures',
          'Build a network of mentors and peers'
        ],
        resources: [
          'Book: "Mindset" by Carol Dweck',
          'Course: Personal Development Planning',
          'App: Habit tracking for consistent growth',
          'Practice: Weekly reflection and goal review sessions'
        ],
        icon: <TrendingUp className="w-6 h-6" />
      })
    }

    setRecommendations(recs)
  }

  const getScoreLevel = (score: number) => {
    if (score >= 7) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' }
    if (score >= 5) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (score >= 3) return { level: 'Developing', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { level: 'Needs Focus', color: 'text-red-600', bg: 'bg-red-100' }
  }

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Personality Assessment Results
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover your strengths and areas for growth. Use these insights to become 
              a better leader, father, and professional.
            </p>
          </motion.div>
        </div>

        {/* Results Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {Object.entries(results).map(([category, score], index) => {
            const scoreInfo = getScoreLevel(score)
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className={`w-16 h-16 ${scoreInfo.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {category === 'Cognitive Style' && <Brain className="w-8 h-8 text-gray-700" />}
                  {category === 'Emotional Intelligence' && <Heart className="w-8 h-8 text-gray-700" />}
                  {category === 'Leadership' && <Users className="w-8 h-8 text-gray-700" />}
                  {category === 'Communication' && <Target className="w-8 h-8 text-gray-700" />}
                  {category === 'Personal Growth' && <TrendingUp className="w-8 h-8 text-gray-700" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category}</h3>
                <div className={`text-2xl font-bold ${scoreInfo.color} mb-2`}>
                  {score}/8
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${scoreInfo.bg} ${scoreInfo.color}`}>
                  {scoreInfo.level}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Coaching Recommendations */}
        {recommendations.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Personalized Coaching Recommendations
            </h2>
            <div className="space-y-8">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="card"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <div className="text-primary-600">
                          {rec.icon}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {rec.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {rec.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Action Steps
                          </h4>
                          <ul className="space-y-2">
                            {rec.actions.map((action, i) => (
                              <li key={i} className="flex items-start">
                                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-gray-700">{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                            Recommended Resources
                          </h4>
                          <ul className="space-y-2">
                            {rec.resources.map((resource, i) => (
                              <li key={i} className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-gray-700">{resource}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="text-center">
          <div className="card max-w-2xl mx-auto">
            <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Take Action?
            </h3>
            <p className="text-gray-600 mb-6">
              Start implementing these recommendations today. Remember, personal growth is a journey, 
              not a destination. Small, consistent actions lead to significant improvements over time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assessment" className="btn-secondary">
                Retake Assessment
              </Link>
              <Link href="/" className="btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 