"use client";

import React, { useState, useCallback } from 'react';
import Toast from '../../components/Toast';
import { useRouter } from 'next/navigation';

const headlines = [
  'A Small Group of People Control the World Economy by Manipulating the Price of Gold and Oil',
  'US Hispanic Population Reached New High in 2018, But Growth Has Slowed',
  'Most Americans Say It\'s OK for Professional Athletes to Speak out Publicly about Politics',
  'Government Officials Have Manipulated Stock Prices to Hide Scandals',
  'The Government Is Conducting a Massive Cover-Up of Their Involvement in 9/11',
  'Hyatt Will Remove Small Bottles from Hotel Bathrooms',
  'Majority in US Still Want Abortion Legal, with Limits',
  'Left-Wingers Are More Likely to Lie to Get a Good Grade',
  'The Government Is Knowingly Spreading Disease Through the Airwaves and Food Supply',
  "Climate Scientists' Work Is 'Unreliable', a 'Deceptive Method of Communication'", 
  'New Study: Left-Wingers Are More Likely to Lie to Get a Higher Salary',
  'The Government Is Actively Destroying Evidence Related to the JFK Assassination',
  'United Nations Gets Mostly Positive Marks from People Around the World',
  'Taiwan Seeks to Join Fight Against Global Warming',
  'Morocco\'s King Appoints Committee Chief to Fight Poverty and Inequality',
];

const options = [
  { value: 'real', label: 'Real' },
  { value: 'fake', label: 'Fake' },
];

export default function NewsJudgmentPage() {
  const [answers, setAnswers] = useState<(string | null)[]>(Array(headlines.length).fill(null));
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
      const optionValues = options.map(o => o.value);
      const randomAnswers = headlines.map(() => optionValues[Math.floor(Math.random() * optionValues.length)]);
      setAnswers(randomAnswers);
      setShowToast(true);
    }
  };

  const handleToastClose = () => setShowToast(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (!answers.includes(null)) {
      localStorage.setItem('newsJudgmentAnswers', JSON.stringify(answers));
      router.push('/news-judgment/results');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">News Judgment Task</h1>
        <p className="text-gray-700 max-w-4xl mx-auto">
          Below you are presented with 15 news headlines, some of which are real and others that have been fabricated. 
          Your task is to classify each headline as either "Real" or "Fake" based on your judgment.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Desktop Layout */}
        <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full border-separate border-spacing-y-4 text-sm">
            <thead>
              <tr>
                <th className="text-left font-medium whitespace-nowrap px-2 py-2">&nbsp;</th>
                {options.map((option) => (
                  <th key={option.value} className="text-center font-normal text-xs whitespace-nowrap px-2 py-2">
                    {option.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {headlines.map((headline, i) => (
                <tr key={`desktop-q-${i}`} className="align-top">
                  <td className="pr-2 text-gray-700 text-sm w-3/4 min-w-[300px]">{i + 1}. {headline}</td>
                  {options.map((option) => (
                    <td key={option.value} className="text-center">
                      <input
                        type="radio"
                        name={`question_${i}`}
                        value={option.value}
                        checked={answers[i] === option.value}
                        onChange={() => handleChange(i, option.value)}
                        className="radio-custom w-6 h-6"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden space-y-6">
          {headlines.map((headline, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-4 text-sm leading-relaxed">
                {headline}
              </h3>
              <div className="space-y-3">
                {options.map((option) => (
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
                      <div className="font-medium text-gray-900">{option.label}</div>
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

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={handleRandomAnswers}
            className="btn-secondary px-8 py-3 text-lg"
          >
            Random Answers
          </button>
          <button
            type="submit"
            className="btn-primary px-8 py-3 text-lg"
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