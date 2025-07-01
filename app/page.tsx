"use client"

import React from 'react'
import Link from 'next/link'
import Hero from '../components/Hero'
import { BarChart3, Heart, Users, Brain } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Hero variant="home" />
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl">
          <Link href="/bigfive" className="card flex flex-col items-center p-8 hover:shadow-xl transition-shadow duration-200">
            <BarChart3 className="w-10 h-10 text-blue-400 mb-3" />
            <span className="text-xl font-semibold mb-1">Big Five Personality Inventory</span>
            <span className="text-gray-600 text-center">50-item assessment measuring Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.</span>
          </Link>
          <Link href="/empathy" className="card flex flex-col items-center p-8 hover:shadow-xl transition-shadow duration-200">
            <Heart className="w-10 h-10 text-pink-400 mb-3" />
            <span className="text-xl font-semibold mb-1">Empathy / Emotional Intelligence</span>
            <span className="text-gray-600 text-center">14-item assessment exploring your empathy and emotional understanding in social situations.</span>
          </Link>
          <Link href="/news-judgment" className="card flex flex-col items-center p-8 hover:shadow-xl transition-shadow duration-200">
            <Users className="w-10 h-10 text-indigo-400 mb-3" />
            <span className="text-xl font-semibold mb-1">News Judgment Task</span>
            <span className="text-gray-600 text-center">Classify 16 news headlines as "Real" or "Fake" to test your judgment and critical thinking.</span>
          </Link>
          <Link href="/cognitive-reflection" className="card flex flex-col items-center p-8 hover:shadow-xl transition-shadow duration-200">
            <Brain className="w-10 h-10 text-orange-400 mb-3" />
            <span className="text-xl font-semibold mb-1">Cognitive Reflection Test</span>
            <span className="text-gray-600 text-center">3 tricky logic questions to challenge your intuition and reasoning.</span>
          </Link>
        </div>
      </div>
    </>
  )
} 