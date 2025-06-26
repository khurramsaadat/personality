"use client";
import React, { useState } from 'react';
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
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);
  };

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
    <div className="max-w-2xl mx-auto py-10 px-2">
      <h1 className="text-2xl font-bold mb-4">Cognitive Reflection Test</h1>
      <p className="mb-8 text-gray-700">Here are several items that vary in difficulty.<br/>Answer as best as you can.</p>
      <form onSubmit={e => { e.preventDefault(); handleNext(); }}>
        <div className="mb-8">
          {submitted && answers[current] === null && (
            <div className="text-red-600 mb-2 flex items-center gap-2">
              <span className="font-bold">&#33;</span> Please answer this question.
            </div>
          )}
          <div className="mb-4 text-lg text-gray-800 font-medium">{questions[current].text}</div>
          <div className="flex flex-col gap-2">
            {questions[current].options.map((opt, i) => (
              <label key={i} className={`flex items-center px-4 py-2 rounded cursor-pointer transition-colors duration-150 ${answers[current] === opt ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <input
                  type="radio"
                  name={`q${current}`}
                  value={opt}
                  checked={answers[current] === opt}
                  onChange={() => handleChange(opt)}
                  className="mr-2 accent-primary-600"
                  required={current === 0}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center mb-2">
          <Toast message="Random answers generated!" show={showToast} onClose={handleToastClose} />
        </div>
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrev}
            disabled={current === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${current === 0 ? 'text-gray-400 cursor-not-allowed bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
          >
            &#8592;
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-black text-white hover:bg-gray-800"
          >
            {current === questions.length - 1 ? '→' : '→'}
          </button>
        </div>
        <button
          type="button"
          onClick={handleRandomAnswers}
          className="btn-secondary mb-4 w-full sm:w-auto px-8 py-3 text-lg mt-4"
        >
          Random Answers
        </button>
      </form>
    </div>
  );
} 