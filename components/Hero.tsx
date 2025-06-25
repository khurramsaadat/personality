"use client";
import React from 'react';

export default function Hero({ variant = 'home', title, subtitle }: { variant?: 'home' | 'small'; title?: string; subtitle?: string }) {
  if (variant === 'home') {
    return (
      <section className="w-full bg-gradient-to-br from-blue-100 to-indigo-100 py-20 mb-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Discover Your <span className="text-primary-600 block">True Potential</span></h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">Take our assessments to understand your personality, empathy, judgment, and cognitive style. Get personalized feedback for growth.</p>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-8 mb-6">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
      </div>
    </section>
  );
} 