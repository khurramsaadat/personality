"use client";

import React, { useState } from 'react';
import Toast from '../../components/Toast';
import { useRouter } from 'next/navigation';
import { useAssessment } from '../../components/AssessmentContext';

const bigFiveQuestions = [
  'I am the life of the party.',
  'I feel little concern for others.',
  'I am always prepared.',
  'I get stressed out easily.',
  'I have a rich vocabulary.',
  "I don't talk a lot.",
  'I am interested in people.',
  'I leave my belongings around.',
  'I am relaxed most of the time.',
  'I have difficulty understanding abstract ideas.',
  'I feel comfortable around people.',
  'I insult people.',
  'I pay attention to details.',
  'I worry about things.',
  'I have a vivid imagination.',
  'I keep in the background.',
  "I sympathize with others' feelings.",
  'I make a mess of things.',
  'I seldom feel blue.',
  'I am not interested in abstract ideas.',
  'I start conversations.',
  "I am not interested in other people's problems.",
  'I get chores done right away.',
  'I am easily disturbed.',
  'I have excellent ideas.',
  'I have little to say.',
  'I have a soft heart.',
  'I often forget to put things back in their proper place.',
  'I get upset easily.',
  'I do not have a good imagination.',
  'I talk to a lot of different people at parties.',
  'I am not really interested in others.',
  'I like order.',
  'I change my mood a lot.',
  'I am quick to understand things.',
  "I don't like to draw attention to myself.",
  'I take time out for others.',
  'I shirk (avoid/neglect) my duties.',
  'I have frequent mood swings.',
  'I use difficult words.',
  "I don't mind being the center of attention.",
  "I feel others' emotions.",
  'I follow a schedule.',
  'I get irritated easily.',
  'I spend time reflecting on things.',
  'I am quiet around strangers.',
  'I make people feel at ease.',
  'I am exacting in my work.',
  'I often feel blue.',
  'I am full of ideas.'
];

const scale = [
  { value: 1, label: 'Disagree' },
  { value: 2, label: 'Slightly Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Slightly Agree' },
  { value: 5, label: 'Agree' },
];

export default function BigFivePage() {
  const [answers, setAnswers] = useState(Array(bigFiveQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  const { setBigFiveAnswers } = useAssessment();

  const handleChange = (qIdx: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = value;
    setAnswers(newAnswers);
  };

  const handleRandomAnswers = () => {
    if (window.confirm('This will overwrite all your current answers with random selections. Continue?')) {
      const randomAnswers = bigFiveQuestions.map(() => String(Math.floor(Math.random() * 5) + 1));
      setAnswers(randomAnswers);
      setShowToast(true);
    }
  };

  const handleToastClose = () => setShowToast(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!answers.includes(null)) {
      setBigFiveAnswers(answers as string[]);
      router.push('/bigfive/results');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-2 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Big Five Personality Inventory</h1>
      <p className="mb-6 text-gray-700 text-center text-base sm:text-lg">
        In the table below, for each statement 1–50, mark how much you agree with on the scale 1–5.
      </p>
      <form onSubmit={handleSubmit}>
        {/* Mobile layout: cards */}
        <div className="flex flex-col gap-4 sm:hidden">
          {bigFiveQuestions.map((q, i) => (
            <div key={i} className="card border border-gray-200 rounded-lg p-4 bg-white">
              <div className="mb-3 text-gray-900 font-medium text-base">{i + 1}. {q}</div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 justify-between">
                  {[0, 1].map(idx => (
                    <label key={scale[idx].value} className="flex items-center gap-2 flex-1">
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={String(scale[idx].value)}
                        checked={answers[i] === String(scale[idx].value)}
                        onChange={() => handleChange(i, String(scale[idx].value))}
                        className="accent-primary-600 w-6 h-6 cursor-pointer"
                        required={i === 0}
                      />
                      <span className="text-xs font-medium text-gray-700">{scale[idx].label}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-4 justify-between mt-1">
                  {[3, 4].map(idx => (
                    <label key={scale[idx].value} className="flex items-center gap-2 flex-1">
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={String(scale[idx].value)}
                        checked={answers[i] === String(scale[idx].value)}
                        onChange={() => handleChange(i, String(scale[idx].value))}
                        className="accent-primary-600 w-6 h-6 cursor-pointer"
                        required={i === 0}
                      />
                      <span className="text-xs font-medium text-gray-700">{scale[idx].label}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-4 justify-start mt-1">
                  <label key={scale[2].value} className="flex items-center gap-2 flex-1">
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={String(scale[2].value)}
                      checked={answers[i] === String(scale[2].value)}
                      onChange={() => handleChange(i, String(scale[2].value))}
                      className="accent-primary-600 w-6 h-6 cursor-pointer"
                      required={i === 0}
                    />
                    <span className="text-xs font-medium text-gray-700">{scale[2].label}</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop layout: table */}
        <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full border-separate border-spacing-y-6 text-sm md:text-base">
            <thead>
              <tr>
                <th className="text-left font-medium whitespace-nowrap px-2 py-2">&nbsp;</th>
                {scale.map((s) => (
                  <th key={s.value} className="text-center font-normal text-xs whitespace-nowrap px-2 py-2">
                    {s.value} = {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bigFiveQuestions.map((q, i) => (
                <tr key={i} className="align-top">
                  <td className="pr-2 text-gray-700 text-sm w-1/2 min-w-[180px] whitespace-pre-line">{i + 1}. {q}</td>
                  {scale.map((s) => (
                    <td key={s.value} className="text-center">
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={String(s.value)}
                        checked={answers[i] === String(s.value)}
                        onChange={() => handleChange(i, String(s.value))}
                        className="accent-primary-600 w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
                        required={i === 0}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {submitted && answers.includes(null) && (
          <div className="text-red-600 mt-4 text-center">Please answer all questions before submitting.</div>
        )}
        {/* Inline Toast above Random Answers button */}
        <div className="w-full flex justify-center mb-2">
          <Toast message="Random answers generated!" show={showToast} onClose={handleToastClose} />
        </div>
        <button
          type="button"
          onClick={handleRandomAnswers}
          className="btn-secondary mb-4 w-full sm:w-auto px-8 py-3 text-lg"
        >
          Random Answers
        </button>
        <button
          type="submit"
          className="btn-primary mt-4 w-full sm:w-auto px-8 py-4 text-lg text-center"
          disabled={answers.includes(null)}
        >
          Submit
        </button>
      </form>
    </div>
  );
} 