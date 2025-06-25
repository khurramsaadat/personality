"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BigFiveResultsPage() {
  const [answers, setAnswers] = useState<number[] | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('bigfiveAnswers');
    if (stored) setAnswers(JSON.parse(stored));
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Big Five Results</h1>
      {answers ? (
        <div>
          <p className="mb-4">Thank you for completing the Big Five Personality Inventory! (Detailed trait scoring coming soon.)</p>
          <pre className="bg-gray-100 p-4 rounded text-sm mb-6">{JSON.stringify(answers, null, 2)}</pre>
        </div>
      ) : (
        <p className="mb-4">No results found. Please complete the assessment first.</p>
      )}
      <Link href="/bigfive" className="btn-secondary mr-4">Retake Big Five</Link>
      <Link href="/" className="btn-primary">Back to Home</Link>
    </div>
  );
} 