"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '../../components/Toast';

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
  const [answers, setAnswers] = useState(Array(headlines.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleChange = (idx: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
  };

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
    <div className="max-w-2xl mx-auto py-10 px-2">
      <h1 className="text-2xl font-bold mb-4">News Judgment Task</h1>
      <p className="mb-8 text-gray-700">
        Below you are presented with 16 news headlines, some of which are real and others that have been fabricated. Your task is to classify each headline as either "Real" or "Fake" based on your judgment.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {headlines.map((headline, i) => (
            <div key={i} className="mb-4">
              <div className="mb-2 text-lg text-gray-800 font-medium">{headline}</div>
              <div className="flex flex-col gap-2">
                {options.map((opt) => (
                  <label key={opt.value} className={`flex items-center px-4 py-2 rounded cursor-pointer transition-colors duration-150 ${answers[i] === opt.value ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <input
                      type="radio"
                      name={`headline-${i}`}
                      value={opt.value}
                      checked={answers[i] === opt.value}
                      onChange={() => handleChange(i, opt.value)}
                      className="mr-2 accent-primary-600"
                      required={i === 0}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        {submitted && answers.includes(null) && (
          <div className="text-red-600 mt-4">Please answer all questions before submitting.</div>
        )}
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
          className="btn-primary mt-4 px-8 py-3 text-lg w-full sm:w-auto"
          disabled={answers.includes(null)}
        >
          Submit
        </button>
      </form>
    </div>
  );
} 