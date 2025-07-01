"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Lightbulb } from "lucide-react";

const crtQuestions = [
  {
    text: 'In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake?',
    correct: '47 days',
    explanation: 'The patch doubles in size each day, so the day before it covers the whole lake, it must have covered half. Thus, 47 days.'
  },
  {
    text: 'A bat and a ball cost £1.10 in total. The bat costs £1.00 more than the ball. How much does the ball cost?',
    correct: '5 pence',
    explanation: 'Let x be the cost of the ball. The bat is £1 more, so x + £1. Total: x + (x + £1) = £1.10 → 2x = £0.10 → x = £0.05 (5 pence).'
  },
  {
    text: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?',
    correct: '5 minutes',
    explanation: 'Each machine makes 1 widget in 5 minutes. 100 machines make 100 widgets in 5 minutes working in parallel.'
  },
];

export default function CRTResults({ searchParams }: { searchParams: { answers?: string } }) {
  const [answers, setAnswers] = useState<string[] | null>(null);

  useEffect(() => {
    if (searchParams.answers) {
      setAnswers(JSON.parse(searchParams.answers));
    } else if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crtAnswers');
      if (stored) setAnswers(JSON.parse(stored));
      else setAnswers([]);
    }
  }, [searchParams.answers]);

  if (!answers) {
    return <div className="max-w-2xl mx-auto py-10 px-4 text-center text-gray-500">Loading results...</div>;
  }

  const score = answers.reduce((acc, ans, i) => acc + (ans === crtQuestions[i].correct ? 1 : 0), 0);
  const percent = Math.round((score / crtQuestions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-8 h-8 text-orange-500" />
        <h1 className="text-2xl font-bold">Cognitive Reflection Test Results</h1>
      </div>
      <div className="mb-6">
        <div className="text-lg font-semibold mb-2">Your Score: <span className="text-orange-600">{score} / {crtQuestions.length}</span> ({percent}%)</div>
        <div className="w-full bg-orange-100 rounded-full h-4">
          <div className="bg-orange-500 h-4 rounded-full" style={{ width: `${percent}%` }} />
        </div>
      </div>
      <div className="mb-8">
        <h2 className="font-semibold mb-2">Question Breakdown</h2>
        <ul className="space-y-4">
          {crtQuestions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correct;
            return (
              <li key={i} className="p-4 rounded-lg border bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="text-green-500 w-5 h-5" />
                  ) : (
                    <XCircle className="text-red-400 w-5 h-5" />
                  )}
                  <span className="font-medium text-gray-900">Question {i + 1}</span>
                </div>
                <div className="mb-2 text-gray-900">{q.text}</div>
                <div className="mb-1">
                  <span className="font-semibold">Your answer:</span> <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>{userAnswer || <em>Not answered</em>}</span>
                </div>
                {!isCorrect && (
                  <div className="mb-1">
                    <span className="font-semibold">Correct answer:</span> <span className="text-green-600">{q.correct}</span>
                  </div>
                )}
                {!isCorrect && (
                  <div className="text-sm text-gray-700 bg-orange-50 border-l-4 border-orange-400 p-3 rounded">
                    <span className="font-semibold">Explanation:</span> {q.explanation}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="bg-orange-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-1">Feedback</h3>
        <p>{percent >= 80 ? "Excellent reflective thinking!" : percent >= 60 ? "Good job, but review the tricky questions." : "Keep practicing to improve your cognitive reflection."}</p>
      </div>
    </div>
  );
} 