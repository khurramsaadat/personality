"use client";
import React from "react";
import { assessmentQuestions } from "../../components/AssessmentContext";

export default function DatabasePage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Assessment Question Data Base</h1>
      <p className="mb-8 text-gray-700 text-base">
        Browse all assessment questions used in this app. Use the navigation bar to jump to each section.
      </p>
      {/* Sticky/top nav */}
      <nav className="sticky top-0 z-10 bg-white border-b border-gray-100 mb-8 py-2 flex flex-wrap gap-4">
        {assessmentQuestions.map((section, idx) => (
          <a
            key={section.section}
            href={`#section-${idx}`}
            className="text-primary-700 hover:underline font-medium text-sm px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            {section.section}
          </a>
        ))}
      </nav>
      <div className="space-y-12">
        {assessmentQuestions.map((section, idx) => (
          <section key={section.section} id={`section-${idx}`} className="scroll-mt-24">
            <h2 className="text-2xl font-semibold mb-4">{section.section}</h2>
            <ol className="list-decimal list-inside space-y-2">
              {section.questions.map((q, qIdx) => (
                <li key={qIdx} className="text-gray-800 text-base">{q}</li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
} 