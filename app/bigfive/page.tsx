"use client";

import React, { useState } from 'react';

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

  const handleChange = (qIdx: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Save answers and navigate to results
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-2 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Big Five Personality Inventory</h1>
      <p className="mb-6 text-gray-700 text-center text-base sm:text-lg">
        In the table below, for each statement 1–50, mark how much you agree with on the scale 1–5.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full border-separate border-spacing-y-2 text-xs sm:text-sm md:text-base">
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
                  <td className="pr-2 text-gray-700 text-xs sm:text-sm w-1/2 min-w-[180px] whitespace-pre-line">{i + 1}. {q}</td>
                  {scale.map((s) => (
                    <td key={s.value} className="text-center">
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={s.value}
                        checked={answers[i] === s.value}
                        onChange={() => handleChange(i, s.value)}
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
        <button
          type="submit"
          className="btn-primary mt-8 w-full sm:w-auto px-8 py-4 text-lg text-center"
          disabled={answers.includes(null)}
        >
          Submit
        </button>
      </form>
    </div>
  );
} 