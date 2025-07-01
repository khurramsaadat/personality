"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Compass } from "lucide-react";

const newsQuestions = [
  {
    headline: "NASA Confirms Water on the Sunlit Surface of the Moon",
    correct: "Real",
    explanation: "This is a real headline. In 2020, NASA confirmed water molecules on the sunlit surface of the Moon using SOFIA telescope data."
  },
  {
    headline: "Scientists Discover New Element Named 'Administratium'",
    correct: "Fake",
    explanation: "This is a fake headline. 'Administratium' is a long-running science joke and not a real element."
  },
  {
    headline: "World's Oldest Living Cat Celebrates 38th Birthday in Texas",
    correct: "Real",
    explanation: "This is a real headline. The Guinness World Records has recognized several cats living into their 30s, including a 38-year-old cat in Texas."
  },
  {
    headline: "Bananas Will Be Extinct by 2025, Experts Warn",
    correct: "Fake",
    explanation: "This is a fake headline. While banana crops face disease threats, extinction by 2025 is an exaggeration."
  },
  {
    headline: "Octopus Throws Objects at Other Animals, Study Finds",
    correct: "Real",
    explanation: "This is a real headline. A 2022 study documented octopuses throwing shells and silt at other animals."
  }
];

export default function NewsJudgmentResults({ searchParams }: { searchParams: { answers?: string } }) {
  const [answers, setAnswers] = useState<string[] | null>(null);

  useEffect(() => {
    if (searchParams.answers) {
      setAnswers(JSON.parse(searchParams.answers));
    } else if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('newsJudgmentAnswers');
      if (stored) setAnswers(JSON.parse(stored));
      else setAnswers([]);
    }
  }, [searchParams.answers]);

  if (!answers) {
    return <div className="max-w-2xl mx-auto py-10 px-4 text-center text-gray-500">Loading results...</div>;
  }

  const minLen = Math.min(answers.length, newsQuestions.length);
  const score = answers.slice(0, minLen).reduce((acc, ans, i) => acc + (ans === newsQuestions[i].correct ? 1 : 0), 0);
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
        <ul className="space-y-4">
          {newsQuestions.map((q, i) => {
            if (i >= answers.length) return null;
            const userAnswer = answers[i];
            const isCorrect = userAnswer && userAnswer.toLowerCase() === q.correct.toLowerCase();
            return (
              <li key={i} className="p-4 rounded-lg border bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="text-green-500 w-5 h-5" />
                  ) : (
                    <XCircle className="text-red-400 w-5 h-5" />
                  )}
                  <span className="font-medium text-gray-900">Headline {i + 1}</span>
                </div>
                <div className="mb-2 text-gray-900">{q.headline}</div>
                <div className="mb-1">
                  <span className="font-semibold">Your answer:</span> <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>{userAnswer || <em>Not answered</em>}</span>
                </div>
                <div className="mb-1">
                  <span className="font-semibold">Correct answer:</span> <span className="text-indigo-600">{q.correct}</span>
                </div>
                <div className="text-sm text-gray-700 bg-indigo-50 border-l-4 border-indigo-400 p-3 rounded">
                  <span className="font-semibold">Explanation:</span> {q.explanation}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-1">Feedback</h3>
        <p>{percent >= 80 ? "Excellent news judgment!" : percent >= 60 ? "Good job, but review the tricky headlines." : "Keep practicing to improve your news literacy."}</p>
      </div>
    </div>
  );
} 