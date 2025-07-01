"use client";

import React, { useState, useCallback } from 'react';
import Toast from '../../components/Toast';
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
  { value: '1', label: 'Does not describe me well' },
  { value: '2', label: 'Slightly describes me' },
  { value: '3', label: 'Neutral' },
  { value: '4', label: 'Mostly describes me' },
  { value: '5', label: 'Describes me very well' },
];

export default function EmpathyPage() {
  const [answers, setAnswers] = useState<(string | null)[]>(Array(empathyQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleChange = useCallback((questionIndex: number, value: string) => {
    console.log(`Question ${questionIndex} answered: ${value}`);
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = value;
      return newAnswers;
    });
  }, []);

  const handleRandomAnswers = () => {
    if (window.confirm('This will overwrite all your current answers with random selections. Continue?')) {
      const scaleValues = scale.map(s => s.value);
      const randomAnswers = empathyQuestions.map(() => scaleValues[Math.floor(Math.random() * scaleValues.length)]);
      setAnswers(randomAnswers);
      setShowToast(true);
    }
  };

  const handleToastClose = () => setShowToast(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (!answers.includes(null)) {
      localStorage.setItem('empathyAnswers', JSON.stringify(answers));
      router.push('/empathy/results');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-sky-500">Empathy / Emotional Intelligence Questionnaire</h1>
        <p className="text-gray-700 max-w-4xl mx-auto">
          The following statements inquire about your thoughts and feelings in a variety of situations. 
          For each item, indicate how well it describes you by choosing the appropriate response on the scale.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Desktop layout: table with custom visual radio buttons */}
        <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full border-separate border-spacing-y-4 text-sm md:text-base">
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
              {empathyQuestions.map((q, i) => (
                <tr key={`desktop-q-${i}`} className="align-top">
                  <td className="pr-2 text-gray-700 text-sm w-1/2 min-w-[180px] whitespace-pre-line">{i + 1}. {q}</td>
                  {scale.map((s) => (
                    <td key={s.value} className="text-center">
                      {/* Visual radio button that matches mobile design */}
                      <div 
                        className="inline-flex items-center justify-center cursor-pointer p-1"
                        onClick={() => handleChange(i, s.value)}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          answers[i] === s.value 
                            ? 'border-blue-600 bg-blue-600' 
                            : 'border-gray-300 bg-white hover:border-blue-400'
                        }`}>
                          {answers[i] === s.value && (
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                          )}
                        </div>
                        {/* Hidden native radio for form submission */}
                        <input
                          type="radio"
                          name={`question_${i}`}
                          value={s.value}
                          checked={answers[i] === s.value}
                          onChange={() => {}} // Controlled by div click
                          className="sr-only"
                          tabIndex={-1}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden space-y-6">
          {empathyQuestions.map((question, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-4 text-sm leading-relaxed">
                {question}
              </h3>
              <div className="space-y-3">
                {scale.map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                      answers[i] === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleChange(i, option.value)}
                  >
                    <input
                      type="radio"
                      name={`question_${i}`}
                      value={option.value}
                      checked={answers[i] === option.value}
                      onChange={() => {}} // Handled by div onClick
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      answers[i] === option.value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[i] === option.value && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{option.value}</div>
                      <div className="text-sm text-gray-600">{option.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {submitted && answers.includes(null) && (
          <div className="text-red-600 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            ⚠️ Please answer all questions before submitting.
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

      <div className="w-full flex justify-center mt-4">
        <Toast message="Random answers generated!" show={showToast} onClose={handleToastClose} />
      </div>
    </div>
  );
} 