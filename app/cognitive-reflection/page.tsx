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
  const [current, setCurrent] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleChange = useCallback((value: string) => {
    console.log(`Question ${current} answered: ${value}`);
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[current] = value;
      return newAnswers;
    });
  }, [current]);

  const handleRandomAnswers = () => {
    if (window.confirm('This will overwrite all your current answers with random selections. Continue?')) {
      const randomAnswers = questions.map(q => q.options[Math.floor(Math.random() * q.options.length)]);
      setAnswers(randomAnswers);
      setShowToast(true);
    }
  };

  const handleToastClose = () => setShowToast(false);

  const handleNext = () => {
    if (answers[current] === null) {
      setSubmitted(true);
      return;
    }
    setSubmitted(false);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      localStorage.setItem('crtAnswers', JSON.stringify(answers));
      router.push('/cognitive-reflection/results');
    }
  };

  const handlePrev = () => {
    setSubmitted(false);
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Cognitive Reflection Test</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Here are several items that vary in difficulty. Answer as best as you can.
        </p>
        <div className="mt-4 text-sm text-gray-600">
          Question {current + 1} of {questions.length}
        </div>
      </div>

      <form onSubmit={e => { e.preventDefault(); handleNext(); }}>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
          {submitted && answers[current] === null && (
            <div className="text-red-600 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <span className="font-bold">⚠️</span> Please answer this question before continuing.
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 leading-relaxed">
              {questions[current].text}
            </h3>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-2 gap-4">
              {questions[current].options.map((option, i) => (
                <label
                  key={i}
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                    answers[current] === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question_${current}`}
                    value={option}
                    checked={answers[current] === option}
                    onChange={() => handleChange(option)}
                    className="radio-custom w-5 h-5 mr-3 cursor-pointer"
                  />
                  <span className="font-medium text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="block sm:hidden space-y-3">
            {questions[current].options.map((option, i) => (
              <div
                key={i}
                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                  answers[current] === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleChange(option)}
              >
                <input
                  type="radio"
                  name={`question_${current}`}
                  value={option}
                  checked={answers[current] === option}
                  onChange={() => {}} // Handled by div onClick
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  answers[current] === option
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {answers[current] === option && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{option}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={handlePrev}
            disabled={current === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              current === 0 
                ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            ← Previous
          </button>
          
          <button
            type="submit"
            className="px-6 py-3 rounded-lg font-medium transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700"
          >
            {current === questions.length - 1 ? 'Submit Assessment' : 'Next →'}
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleRandomAnswers}
            className="btn-secondary px-8 py-3 text-lg"
          >
            Random Answers
          </button>
        </div>
      </form>

      <div className="w-full flex justify-center mt-4">
        <Toast message="Random answers generated!" show={showToast} onClose={handleToastClose} />
      </div>
    </div>
  );
} 