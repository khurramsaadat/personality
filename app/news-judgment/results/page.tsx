"use client";
import React from "react";
import { CheckCircle, XCircle, Compass } from "lucide-react";

const newsQuestions = [
  // ... (import or define the news headlines/questions here)
];

const correctAnswers = [
  // ... (import or define the correct answers here)
];

export default function NewsJudgmentResults({ searchParams }: { searchParams: { answers: string } }) {
  const answers = searchParams.answers ? JSON.parse(searchParams.answers) : [];
  const score = answers.reduce((acc, ans, i) => acc + (ans === correctAnswers[i] ? 1 : 0), 0);
  const percent = Math.round((score / newsQuestions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex items-center gap-3 mb-6">
        <Compass className="w-8 h-8 text-indigo-500" />
        <h1 className="text-2xl font-bold">News Judgment Results</h1>
      </div>
      <div className="mb-6">
        <div className="text-lg font-semibold mb-2">Your Score: <span className="text-indigo-600">{score} / {newsQuestions.length}</span> ({percent}%)</div>
        <div className="w-full bg-indigo-100 rounded-full h-4">
          <div className="bg-indigo-500 h-4 rounded-full" style={{ width: `${percent}%` }} />
        </div>
      </div>
      <div className="mb-8">
        <h2 className="font-semibold mb-2">Question Breakdown</h2>
        <ul className="space-y-2">
          {newsQuestions.map((q, i) => (
            <li key={i} className="flex items-center gap-2 p-3 rounded-lg border bg-white shadow-sm">
              {answers[i] === correctAnswers[i] ? (
                <CheckCircle className="text-green-500 w-5 h-5" />
              ) : (
                <XCircle className="text-red-400 w-5 h-5" />
              )}
              <span className="flex-1">{q}</span>
              <span className="text-xs text-gray-500">{answers[i] === correctAnswers[i] ? "Correct" : "Incorrect"}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-1">Feedback</h3>
        <p>{percent >= 80 ? "Excellent news judgment!" : percent >= 60 ? "Good job, but review the tricky headlines." : "Keep practicing to improve your news literacy."}</p>
      </div>
    </div>
  );
} 