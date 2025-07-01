"use client";
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '../../components/Toast';

const questions = [
  {
    text: 'In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake?',
    options: ['24 days', '12 days', '47 days', '36 days'],
  },
  {
    text: 'A bat and a ball cost £1.10 in total. The bat costs £1.00 more than the ball. How much does the ball cost?',
    options: ['1 pence', '5 pence', '10 pence', '9 pence'],
  },
  {
    text: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?',
    options: ['500 minutes', '20 minutes', '100 minutes', '5 minutes'],
  },
];

export default function CognitiveReflectionPage() {
  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [unanswered, setUnanswered] = useState<number[]>([]);
  const router = useRouter();

  const handleChange = useCallback((qIdx: number, value: string) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[qIdx] = value;
      return newAnswers;
    });
  }, []);

  const handleRandomAnswers = () => {
    if (window.confirm('This will overwrite all your current answers with random selections. Continue?')) {
      const randomAnswers = questions.map(q => q.options[Math.floor(Math.random() * q.options.length)]);
      setAnswers(randomAnswers);
      setShowToast(true);
    }
  };

  const handleToastClose = () => setShowToast(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = answers.map((a, i) => a === null ? i : -1).filter(i => i !== -1);
    if (missing.length > 0) {
      setUnanswered(missing);
      setSubmitted(true);
      return;
    }
    setUnanswered([]);
    setSubmitted(false);
    localStorage.setItem('crtAnswers', JSON.stringify(answers));
    router.push('/cognitive-reflection/results');
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-sky-500">Cognitive Reflection Test</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Here are several items that vary in difficulty. Answer as best as you can.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {questions.map((q, qIdx) => (
            <div key={qIdx} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <span className="font-semibold text-lg text-gray-900">Question {qIdx + 1}:</span>
                {submitted && unanswered.includes(qIdx) && (
                  <span className="text-red-600 text-sm">(Please answer this question)</span>
                )}
              </div>
              <div className="mb-4 text-gray-900 font-medium leading-relaxed">{q.text}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {q.options.map((option, i) => (
                  <div
                    key={i}
                    className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                      answers[qIdx] === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleChange(qIdx, option)}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      answers[qIdx] === option
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[qIdx] === option && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{option}</span>
                    <input
                      type="radio"
                      name={`question_${qIdx}`}
                      value={option}
                      checked={answers[qIdx] === option}
                      onChange={() => {}}
                      className="sr-only"
                      tabIndex={-1}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {submitted && unanswered.length > 0 && (
          <div className="text-red-600 mt-6 mb-2 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <span className="font-bold">⚠️</span> Please answer all questions before submitting. Unanswered: {unanswered.map(i => i + 1).join(', ')}
          </div>
        )}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center mt-8 gap-4">
          <button
            type="button"
            onClick={handleRandomAnswers}
            className="w-32 sm:w-auto mt-4 sm:mt-0 self-start sm:self-auto border border-blue-500 text-blue-500 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-4 py-2 text-xs font-medium transition"
          >
            Random Answers
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-8 py-3 text-lg font-semibold transition"
            disabled={answers.includes(null)}
          >
            Submit Assessment
          </button>
        </div>
      </form>
      <Toast show={showToast} onClose={handleToastClose} message="Random answers selected!" />
    </div>
  );
} 