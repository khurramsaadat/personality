"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BarChart3, Brain, Heart, Users, Compass, Shield, UserCheck, Lightbulb, Info, CheckCircle, AlertTriangle } from "lucide-react";

const traitColors = {
  O: "bg-blue-400",
  C: "bg-green-500",
  E: "bg-yellow-400",
  A: "bg-purple-500",
  N: "bg-red-400",
  Empathy: "bg-pink-400",
  News: "bg-indigo-400",
  CRT: "bg-orange-400",
};

export default function TraitMappingPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Trait Mapping & Score Calculation</h1>
      <p className="mb-8 text-gray-700 text-center text-lg">
        Learn how your results are calculated for each assessment. See which questions map to which traits, how scores are computed, and what your results mean.
      </p>

      {/* Big Five Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><BarChart3 className="w-7 h-7 text-blue-400" />Big Five Personality</h2>
        <p className="mb-4 text-gray-700">The Big Five measures five broad personality traits. Each trait is calculated from 10 specific questions. Scores are normalized to a 0–100% scale. <b>No reverse scoring is currently applied.</b></p>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border border-gray-200 rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-2 py-2 text-left">Trait</th>
                <th className="px-2 py-2 text-left">Questions (1-based index)</th>
                <th className="px-2 py-2 text-left">Color/Icon</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="font-semibold">Openness (O)</td><td>1, 6, 11, 16, 21, 26, 31, 36, 41, 46</td><td><Lightbulb className="inline w-5 h-5 text-blue-400" /></td></tr>
              <tr><td className="font-semibold">Conscientiousness (C)</td><td>3, 8, 13, 18, 23, 28, 33, 38, 43, 48</td><td><Shield className="inline w-5 h-5 text-green-500" /></td></tr>
              <tr><td className="font-semibold">Extraversion (E)</td><td>2, 7, 12, 17, 22, 27, 32, 37, 42, 47</td><td><UserCheck className="inline w-5 h-5 text-yellow-400" /></td></tr>
              <tr><td className="font-semibold">Agreeableness (A)</td><td>4, 9, 14, 19, 24, 29, 34, 39, 44, 49</td><td><Heart className="inline w-5 h-5 text-purple-500" /></td></tr>
              <tr><td className="font-semibold">Neuroticism (N)</td><td>5, 10, 15, 20, 25, 30, 35, 40, 45, 50</td><td><Brain className="inline w-5 h-5 text-red-400" /></td></tr>
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">How scores are calculated:</h3>
          <ol className="list-decimal ml-6 text-gray-700">
            <li>Each trait is assigned 10 questions (see table above).</li>
            <li>User answers each question on a 1–5 scale.</li>
            <li>Trait score = <b>sum of answers for that trait</b> / 50 × 100%.</li>
            <li>Example: If you answer 4 for all Openness questions, Openness = (4×10)/50 × 100% = 80%.</li>
          </ol>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Sample Bar Graph:</h3>
          <div className="flex gap-4 items-end h-32">
            <div className="flex flex-col items-center"><div className="w-8 h-24 bg-blue-400 rounded-t"></div><span className="text-xs mt-1">O</span></div>
            <div className="flex flex-col items-center"><div className="w-8 h-20 bg-green-500 rounded-t"></div><span className="text-xs mt-1">C</span></div>
            <div className="flex flex-col items-center"><div className="w-8 h-16 bg-yellow-400 rounded-t"></div><span className="text-xs mt-1">E</span></div>
            <div className="flex flex-col items-center"><div className="w-8 h-12 bg-purple-500 rounded-t"></div><span className="text-xs mt-1">A</span></div>
            <div className="flex flex-col items-center"><div className="w-8 h-8 bg-red-400 rounded-t"></div><span className="text-xs mt-1">N</span></div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Trait Descriptions:</h3>
          <ul className="list-disc ml-6 text-gray-700">
            <li><b>Openness:</b> Imagination, creativity, curiosity.</li>
            <li><b>Conscientiousness:</b> Organization, dependability, discipline.</li>
            <li><b>Extraversion:</b> Sociability, assertiveness, energy.</li>
            <li><b>Agreeableness:</b> Compassion, cooperation, trust.</li>
            <li><b>Neuroticism:</b> Emotional stability, calmness, resilience.</li>
          </ul>
        </div>
      </section>

      {/* Empathy Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Heart className="w-7 h-7 text-pink-400" />Empathy Assessment</h2>
        <p className="mb-4 text-gray-700">The Empathy test measures your ability to understand and share the feelings of others. Each question is scored A=1, B=2, C=3, D=4, E=5. Your final score is the average of all answers, mapped to a 1–5 scale.</p>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border border-gray-200 rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-2 py-2 text-left">Question</th>
                <th className="px-2 py-2 text-left">Answer Options</th>
                <th className="px-2 py-2 text-left">Score Mapping</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1–14</td><td>A, B, C, D, E</td><td>A=1, B=2, C=3, D=4, E=5</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">How scores are calculated:</h3>
          <ol className="list-decimal ml-6 text-gray-700">
            <li>Each answer is converted to a number (A=1, ..., E=5).</li>
            <li>Empathy score = average of all answers (1–5 scale).</li>
            <li>Example: [A, C, E, ...] → [1, 3, 5, ...] → average = 3.2.</li>
          </ol>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Sample Bar Graph:</h3>
          <div className="flex gap-4 items-end h-32">
            <div className="flex flex-col items-center"><div className="w-8 h-20 bg-pink-400 rounded-t"></div><span className="text-xs mt-1">Empathy</span></div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Trait Description:</h3>
          <ul className="list-disc ml-6 text-gray-700">
            <li><b>Empathy:</b> Ability to understand and share the feelings of others.</li>
          </ul>
        </div>
      </section>

      {/* News Judgment Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Users className="w-7 h-7 text-indigo-400" />News Judgment</h2>
        <p className="mb-4 text-gray-700">The News Judgment test measures your ability to distinguish real from fake news headlines. Each question is scored as correct (1) or incorrect (0). Your final score is the percentage of correct answers.</p>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border border-gray-200 rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-2 py-2 text-left">Question</th>
                <th className="px-2 py-2 text-left">Answer Options</th>
                <th className="px-2 py-2 text-left">Score Mapping</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1–15</td><td>Real, Fake</td><td>1 point for each correct answer</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">How scores are calculated:</h3>
          <ol className="list-decimal ml-6 text-gray-700">
            <li>Each answer is checked against the correct label.</li>
            <li>News Judgment score = (number correct / total questions) × 100%.</li>
            <li>Example: 12 correct out of 15 = 80%.</li>
          </ol>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Sample Bar Graph:</h3>
          <div className="flex gap-4 items-end h-32">
            <div className="flex flex-col items-center"><div className="w-8 h-24 bg-indigo-400 rounded-t"></div><span className="text-xs mt-1">News</span></div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Trait Description:</h3>
          <ul className="list-disc ml-6 text-gray-700">
            <li><b>News Judgment:</b> Ability to accurately identify real and fake news headlines.</li>
          </ul>
        </div>
      </section>

      {/* CRT Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Brain className="w-7 h-7 text-orange-400" />Cognitive Reflection Test (CRT)</h2>
        <p className="mb-4 text-gray-700">The CRT measures your ability to override an incorrect "gut" response and engage in further reflection to find a correct answer. Each question is scored as correct (1) or incorrect (0). Your final score is the percentage of correct answers.</p>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border border-gray-200 rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-2 py-2 text-left">Question</th>
                <th className="px-2 py-2 text-left">Answer Options</th>
                <th className="px-2 py-2 text-left">Score Mapping</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1–3</td><td>Multiple Choice</td><td>1 point for each correct answer</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">How scores are calculated:</h3>
          <ol className="list-decimal ml-6 text-gray-700">
            <li>Each answer is checked against the correct answer.</li>
            <li>CRT score = (number correct / total questions) × 100%.</li>
            <li>Example: 2 correct out of 3 = 67%.</li>
          </ol>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Sample Bar Graph:</h3>
          <div className="flex gap-4 items-end h-32">
            <div className="flex flex-col items-center"><div className="w-8 h-16 bg-orange-400 rounded-t"></div><span className="text-xs mt-1">CRT</span></div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Trait Description:</h3>
          <ul className="list-disc ml-6 text-gray-700">
            <li><b>Cognitive Reflection:</b> Ability to reflect and override intuitive but incorrect answers.</li>
          </ul>
        </div>
      </section>

      <div className="text-center mt-10">
        <Link href="/" className="btn-primary">Back to Home</Link>
      </div>
    </div>
  );
} 