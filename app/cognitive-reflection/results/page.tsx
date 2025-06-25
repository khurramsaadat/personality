"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CRTResultsPage() {
  const [answers, setAnswers] = useState<string[] | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('crtAnswers');
    if (stored) setAnswers(JSON.parse(stored));
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Cognitive Reflection Test Results</h1>
      {answers ? (
        <div>
          <p className="mb-4">Thank you for completing the Cognitive Reflection Test! (Detailed feedback coming soon.)</p>
          <pre className="bg-gray-100 p-4 rounded text-sm mb-6">{JSON.stringify(answers, null, 2)}</pre>
        </div>
      ) : (
        <p className="mb-4">No results found. Please complete the assessment first.</p>
      )}
      <Link href="/cognitive-reflection" className="btn-secondary mr-4">Retake CRT</Link>
      <Link href="/" className="btn-primary">Back to Home</Link>
    </div>
  );
} 