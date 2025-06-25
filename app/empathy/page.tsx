"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const empathyQuestions = [
  'I sometimes find it difficult to see things from the "other guy\'s" point of view.',
  'I try to look at everybody\'s side of a disagreement before I make a decision.',
  'I sometimes try to understand my friends better by imagining how things look from their perspective.',
  'If I\'m sure I\'m right about something, I don\'t waste much time listening to other people\'s arguments.',
  'I believe that there are two sides to every question and try to look at them both.',
  'When I\'m upset at someone, I usually try to "put myself in his shoes" for a while.',
  'Before criticizing somebody, I try to imagine how I would feel if I were in their place.',
  'I often have tender, concerned feelings for people less fortunate than me.',
  'Sometimes I don\'t feel very sorry for other people when they are having problems.',
  'When I see someone being taken advantage of, I feel kind of protective towards them.',
  'Other people\'s misfortunes do not usually disturb me a great deal.',
  'When I see someone being treated unfairly, I sometimes don\'t feel very much pity for them.',
  'I am often quite touched by things that I see happen.',
  'I would describe myself as a pretty soft-hearted person.'
];

const scale = [
  { value: 'A', label: 'Does not describe me well' },
  { value: 'B', label: 'Slightly describes me' },
  { value: 'C', label: 'Neutral' },
  { value: 'D', label: 'Mostly describes me' },
  { value: 'E', label: 'Describes me very well' },
];

export default function EmpathyPage() {
  const [answers, setAnswers] = useState(Array(empathyQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (qIdx: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!answers.includes(null)) {
      localStorage.setItem('empathyAnswers', JSON.stringify(answers));
      router.push('/empathy/results');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-2">
      <h1 className="text-2xl font-bold mb-4">Empathy / Emotional Intelligence Questionnaire</h1>
      <p className="mb-6 text-gray-700">
        The following statements inquire about your thoughts and feelings in a variety of situations. For each item, indicate how well it describes you by choosing the appropriate letter on the scale: A, B, C, D, or E.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="text-left font-medium">&nbsp;</th>
                {scale.map((s) => (
                  <th key={s.value} className="text-center font-normal text-xs">
                    {s.value} = {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {empathyQuestions.map((q, i) => (
                <tr key={i} className="align-top">
                  <td className="pr-2 text-gray-700 text-sm w-1/2">{q}</td>
                  {scale.map((s) => (
                    <td key={s.value} className="text-center">
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={s.value}
                        checked={answers[i] === s.value}
                        onChange={() => handleChange(i, s.value)}
                        className="accent-primary-600 w-4 h-4"
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
          <div className="text-red-600 mt-4">Please answer all questions before submitting.</div>
        )}
        <button
          type="submit"
          className="btn-primary mt-8 px-8 py-3 text-lg"
          disabled={answers.includes(null)}
        >
          Submit
        </button>
      </form>
    </div>
  );
} 