"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HeartHandshake } from 'lucide-react';

// Helper to calculate empathy score (answers are numbers as strings)
function calculateEmpathyScore(answers: string[]): number {
  return Math.round(
    answers.reduce((sum, a) => sum + Number(a), 0) / answers.length
  );
}

// Feedback logic
function getSummary(score: number) {
  if (score >= 4.2) return "Your responses suggest you are highly empathetic and emotionally attuned to others. This supports strong relationships, teamwork, and leadership.";
  if (score >= 3.2) return "You show a good level of empathy and emotional intelligence. There is room to further develop your ability to understand and connect with others.";
  return "Your empathy score suggests opportunities for growth. Practicing perspective-taking and compassion can help you build stronger connections.";
}

function getStrengths(score: number) {
  if (score >= 4.2) return [
    { icon: '🤝', text: 'Strong perspective-taking' },
    { icon: '💬', text: 'Excellent listener' },
    { icon: '🌱', text: 'Supportive in relationships' },
  ];
  if (score >= 3.2) return [
    { icon: '🤝', text: 'Good at understanding others' },
    { icon: '💡', text: 'Open to different viewpoints' },
  ];
  return [
    { icon: '🔍', text: 'Self-aware' },
    { icon: '🧠', text: 'Willing to improve' },
  ];
}

function getWeaknesses(score: number) {
  if (score >= 4.2) return [
    { icon: '🛑', text: 'May absorb others\' emotions' },
    { icon: '⏳', text: 'Risk of emotional fatigue' },
  ];
  if (score >= 3.2) return [
    { icon: '🧩', text: 'Occasional misunderstandings' },
  ];
  return [
    { icon: '🚧', text: 'Difficulty seeing others\' perspectives' },
    { icon: '🙈', text: 'May miss emotional cues' },
  ];
}

const tips = [
  'Practice active listening in conversations.',
  'Reflect on how others might feel in different situations.',
  'Read books or watch films that explore diverse perspectives.'
];

const resources = [
  { label: 'Greater Good Science Center', url: 'https://greatergood.berkeley.edu/topic/empathy' },
  { label: 'Harvard Health: Empathy', url: 'https://www.health.harvard.edu/mind-and-mood/the-power-of-empathy' },
  { label: 'APA: Building Empathy', url: 'https://www.apa.org/topics/empathy' }
];

export default function EmpathyResultsPage() {
  const [answers, setAnswers] = useState<string[] | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem('empathyAnswers');
    if (stored) setAnswers(JSON.parse(stored));
  }, []);

  if (!answers) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-sky-500">Empathy / Emotional Intelligence Results</h1>
        <p className="mb-4">No results found. Please complete the assessment first.</p>
        <Link href="/empathy" className="btn-secondary mr-4">Retake Empathy Assessment</Link>
        <Link href="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  const score = calculateEmpathyScore(answers);
  const summary = getSummary(score);
  const strengths = getStrengths(score);
  const weaknesses = getWeaknesses(score);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="flex flex-col items-center mb-8">
        <HeartHandshake size={56} className="text-primary-600 mb-2" aria-hidden="true" />
        <h1 className="text-3xl font-bold mb-2 text-center text-sky-500">Empathy / Emotional Intelligence Results</h1>
        <p className="text-lg text-gray-700 text-center max-w-xl">{summary}</p>
      </div>
      {/* Score bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-1">
          <span>Low Empathy</span>
          <span>High Empathy</span>
        </div>
        <div className="w-full h-5 bg-gray-200 rounded-full relative">
          <div
            className="h-5 bg-primary-500 rounded-full transition-all"
            style={{ width: `${((score - 1) / 4) * 100}%` }}
            aria-label={`Empathy score: ${score} out of 5`}
          />
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white drop-shadow"
          >{score}/5</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">Your average empathy score based on your answers.</div>
      </div>
      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Strengths</h2>
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-center gap-2"><span>{s.icon}</span>{s.text}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Potential Weaknesses</h2>
          <ul className="space-y-2">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex items-center gap-2"><span>{w.icon}</span>{w.text}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Growth Tips & Resources */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Growth Tips</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          {tips.map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>
      </div>
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-2">Resources</h2>
        <ul className="list-disc list-inside space-y-1">
          {resources.map((r, i) => (
            <li key={i}><a href={r.url} target="_blank" rel="noopener noreferrer" className="text-primary-700 underline">{r.label}</a></li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/empathy" className="btn-secondary">Retake Assessment</Link>
        <Link href="/" className="btn-primary">Back to Home</Link>
      </div>
    </div>
  );
} 