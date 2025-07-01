import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-sky-500">About This App</h1>
      <p className="mb-4 text-lg text-gray-700">
        <strong>Personality Assessment & Coaching</strong> is a modern, open-source web app. It helps users discover their strengths, understand their personality traits, and unlock their potential through a series of scientifically validated assessments and clear, actionable feedback.
      </p>
      <ul className="mb-6 list-disc pl-6 text-gray-700">
        <li><strong>Big Five Personality Inventory:</strong> Measures five major dimensions of personality (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) using 50 questions.</li>
        <li><strong>Empathy / Emotional Intelligence:</strong> Assesses your ability to understand and share the feelings of others.</li>
        <li><strong>News Judgment Task:</strong> Tests your ability to distinguish real from fake news headlines.</li>
        <li><strong>Cognitive Reflection Test (CRT):</strong> Evaluates your tendency to override an incorrect 'gut' response and engage in further reflection to find a correct answer.</li>
      </ul>
      <p className="mb-4 text-gray-700">
        Each assessment is designed for clarity, accessibility, and mobile-friendliness. Results pages provide detailed feedback, trait mapping, and explanations to help you interpret your scores. The app is fully responsive and uses a consistent, branded design.
      </p>
      <p className="mb-4 text-gray-700">
        This project is open source and welcomes contributions. For more details, see the README or contact the developer.
      </p>
    </div>
  );
} 