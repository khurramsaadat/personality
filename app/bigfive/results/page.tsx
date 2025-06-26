"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAssessment } from '../../../components/AssessmentContext';
import { useRouter } from 'next/navigation';
import { CheckCircle, AlertTriangle, Info, Lightbulb, Brain, Heart, Users, Compass, Shield, UserCheck, Briefcase, BarChart3 } from 'lucide-react';

// Big Five trait keys and labels
const TRAITS = [
  { key: 'O', label: 'Openness', color: 'bg-blue-400', desc: 'Imagination, creativity, curiosity.' },
  { key: 'C', label: 'Conscientiousness', color: 'bg-green-500', desc: 'Organization, dependability, discipline.' },
  { key: 'E', label: 'Extraversion', color: 'bg-yellow-400', desc: 'Sociability, assertiveness, energy.' },
  { key: 'A', label: 'Agreeableness', color: 'bg-purple-500', desc: 'Compassion, cooperation, trust.' },
  { key: 'N', label: 'Neuroticism', color: 'bg-red-400', desc: 'Emotional stability, calmness, resilience.' },
];

// Map answers to trait scores (0-100%)
function calculateTraitScores(answers: string[]): { [key: string]: number } {
  // Example mapping: every 10 questions per trait, 1-5 scale
  const traitMap = {
    O: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45],
    C: [2, 7, 12, 17, 22, 27, 32, 37, 42, 47],
    E: [1, 6, 11, 16, 21, 26, 31, 36, 41, 46],
    A: [3, 8, 13, 18, 23, 28, 33, 38, 43, 48],
    N: [4, 9, 14, 19, 24, 29, 34, 39, 44, 49],
  };
  const scores: { [key: string]: number } = {};
  for (const trait in traitMap) {
    const indices = traitMap[trait];
    const sum = indices.reduce((acc, idx) => acc + (parseInt(answers[idx]) || 0), 0);
    scores[trait] = Math.round((sum / (indices.length * 5)) * 100); // normalize to 0-100%
  }
  return scores;
}

// Generate summary paragraph
function generateSummary(scores: { [key: string]: number }) {
  const high = Object.entries(scores).filter(([_, v]) => v >= 60).map(([k]) => k);
  const low = Object.entries(scores).filter(([_, v]) => v <= 40).map(([k]) => k);
  let summary = 'Your personality profile shows: ';
  if (high.length) summary += 'High in ' + high.map(k => TRAITS.find(t => t.key === k)?.label).join(', ') + '. ';
  if (low.length) summary += 'Lower in ' + low.map(k => TRAITS.find(t => t.key === k)?.label).join(', ') + '. ';
  summary += 'See below for details, strengths, and growth tips.';
  return summary;
}

// Strengths/weaknesses templates
const STRENGTHS = {
  O: 'Creative and open to new experiences',
  C: 'Organized and reliable',
  E: 'Sociable and energetic',
  A: 'Compassionate and cooperative',
  N: 'Emotionally resilient',
};
const WEAKNESSES = {
  O: 'May be impractical or scattered',
  C: 'May be perfectionistic or rigid',
  E: 'May be attention-seeking or impulsive',
  A: 'May be overly trusting or self-effacing',
  N: 'May be sensitive to stress',
};
const TIPS = {
  O: 'Try channeling creativity into practical projects.',
  C: 'Balance discipline with flexibility.',
  E: 'Practice active listening and reflection.',
  A: 'Set healthy boundaries while helping others.',
  N: 'Develop stress management techniques.',
};
const RESOURCES = {
  O: 'https://www.ted.com/topics/creativity',
  C: 'https://jamesclear.com/atomic-habits',
  E: 'https://www.mindtools.com/CommSkll/ActiveListening.htm',
  A: 'https://www.psychologytoday.com/us/basics/empathy',
  N: 'https://www.headspace.com/meditation/stress',
};

// Archetype/type mapping based on Big Five scores
const ARCHETYPES = [
  {
    key: 'visionary',
    name: 'The Visionary',
    condition: (s: { [key: string]: number }) => s.O >= 60 && s.E >= 60,
    summary: 'As a Visionary, you are imaginative, curious, and thrive on new ideas and experiences. Your outgoing nature and creative thinking inspire those around you. You enjoy exploring possibilities and are energized by social interaction and intellectual challenges.'
  },
  {
    key: 'analyst',
    name: 'The Analyst',
    condition: (s: { [key: string]: number }) => s.O >= 60 && s.C >= 60 && s.A <= 40,
    summary: 'As an Analyst, you are logical, independent, and value knowledge. You excel at solving complex problems and are not afraid to challenge conventional wisdom. Your analytical mind helps you see patterns and connections others might miss.'
  },
  {
    key: 'supporter',
    name: 'The Supporter',
    condition: (s: { [key: string]: number }) => s.A >= 60 && s.C >= 60,
    summary: 'As a Supporter, you are dependable, empathetic, and value harmony in your relationships. You take pride in helping others and are often the glue that holds teams together. Your conscientious approach ensures that you follow through on commitments and support those in need.'
  },
  {
    key: 'explorer',
    name: 'The Explorer',
    condition: (s: { [key: string]: number }) => s.O >= 60 && s.C <= 40,
    summary: 'As an Explorer, you are adventurous, spontaneous, and open to new experiences. You thrive in dynamic environments and enjoy seeking out novelty and excitement. Your flexibility allows you to adapt quickly to change.'
  },
  {
    key: 'guardian',
    name: 'The Guardian',
    condition: (s: { [key: string]: number }) => s.C >= 60 && s.O <= 40,
    summary: 'As a Guardian, you are organized, reliable, and value stability. You take your responsibilities seriously and are known for your dependability. Your practical approach helps you achieve your goals and support those around you.'
  },
  {
    key: 'harmonizer',
    name: 'The Harmonizer',
    condition: (s: { [key: string]: number }) => s.A >= 60 && s.N <= 40,
    summary: 'As a Harmonizer, you are compassionate, patient, and emotionally resilient. You excel at building strong relationships and creating a sense of unity. Your calm demeanor helps others feel at ease.'
  },
  {
    key: 'realist',
    name: 'The Realist',
    condition: (s: { [key: string]: number }) => s.O <= 40 && s.E >= 60,
    summary: 'As a Realist, you are practical, outgoing, and grounded in the present. You value real-world experience and enjoy connecting with others. Your straightforward approach makes you a trusted friend and colleague.'
  },
];

function getArchetype(scores: { [key: string]: number }) {
  for (const type of ARCHETYPES) {
    if (type.condition(scores)) return type;
  }
  // Default fallback
  return {
    key: 'balanced',
    name: 'The Balanced Individual',
    summary: 'You have a well-rounded personality, showing a balance across all five traits. You are adaptable and can thrive in a variety of situations, drawing on your diverse strengths.'
  };
}

// Dual labels and descriptions for each trait
const TRAIT_LABELS = {
  O: { left: 'Practical', right: 'Imaginative', desc: (v: number) => v >= 60 ? 'You are highly imaginative, open to new ideas, and enjoy creative pursuits.' : v <= 40 ? 'You prefer practical solutions and value tradition.' : 'You balance creativity with practicality.' },
  C: { left: 'Spontaneous', right: 'Organized', desc: (v: number) => v >= 60 ? 'You are organized, reliable, and disciplined.' : v <= 40 ? 'You are flexible, spontaneous, and adapt easily.' : 'You balance structure with flexibility.' },
  E: { left: 'Introverted', right: 'Extraverted', desc: (v: number) => v >= 60 ? 'You are outgoing, energetic, and thrive in social settings.' : v <= 40 ? 'You are reserved, thoughtful, and enjoy solitude.' : 'You enjoy both socializing and quiet time.' },
  A: { left: 'Challenging', right: 'Compassionate', desc: (v: number) => v >= 60 ? 'You are compassionate, cooperative, and value harmony.' : v <= 40 ? 'You are direct, competitive, and value honesty.' : 'You balance assertiveness with empathy.' },
  N: { left: 'Calm', right: 'Sensitive', desc: (v: number) => v >= 60 ? 'You are sensitive, emotionally aware, and experience strong feelings.' : v <= 40 ? 'You are calm, resilient, and handle stress well.' : 'You balance emotional awareness with stability.' },
};

// Expanded strengths and weaknesses for each trait
const TRAIT_STRENGTHS = {
  O: { title: 'Creative Thinker', desc: 'You generate original ideas and enjoy exploring new concepts.' },
  C: { title: 'Dependable', desc: 'You are reliable, organized, and follow through on commitments.' },
  E: { title: 'Sociable', desc: 'You thrive in social settings and energize those around you.' },
  A: { title: 'Empathetic', desc: 'You are compassionate, cooperative, and value harmony.' },
  N: { title: 'Resilient', desc: 'You handle stress well and recover quickly from setbacks.' },
};
const TRAIT_WEAKNESSES = {
  O: { title: 'Easily Distracted', desc: 'You may lose focus or get bored with routine tasks.' },
  C: { title: 'Rigid', desc: 'You may struggle with flexibility or adapting to change.' },
  E: { title: 'Impulsive', desc: 'You may act without thinking or seek attention.' },
  A: { title: 'Overly Trusting', desc: 'You may avoid conflict or put others\' needs before your own.' },
  N: { title: 'Sensitive to Stress', desc: 'You may experience strong emotions or worry easily.' },
};

export default function BigFiveResultsPage() {
  const { answers } = useAssessment();
  const router = useRouter();
  const bigFiveAnswers = answers.bigFive;

  // Optionally redirect if no answers
  // useEffect(() => {
  //   if (!bigFiveAnswers) router.push('/bigfive');
  // }, [bigFiveAnswers, router]);

  if (!bigFiveAnswers) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600">No results found. Please complete the assessment first.</div>
    );
  }

  const scores = calculateTraitScores(bigFiveAnswers);
  const summary = generateSummary(scores);
  const archetype = getArchetype(scores);
  // Top 2 strengths, lowest 2 weaknesses
  const sortedTraits = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topTraits = sortedTraits.slice(0, 2).map(([k]) => k);
  const lowTraits = sortedTraits.slice(-2).map(([k]) => k);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* Archetype/Type Top Section */}
      <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
        {/* Icon for each archetype */}
        {archetype.key === 'visionary' && (
          <Lightbulb className="w-24 h-24 mb-4 text-yellow-400" aria-label="Visionary icon" />
        )}
        {archetype.key === 'analyst' && (
          <Brain className="w-24 h-24 mb-4 text-blue-500" aria-label="Analyst icon" />
        )}
        {archetype.key === 'supporter' && (
          <Users className="w-24 h-24 mb-4 text-green-500" aria-label="Supporter icon" />
        )}
        {archetype.key === 'explorer' && (
          <Compass className="w-24 h-24 mb-4 text-pink-500" aria-label="Explorer icon" />
        )}
        {archetype.key === 'guardian' && (
          <Shield className="w-24 h-24 mb-4 text-gray-500" aria-label="Guardian icon" />
        )}
        {archetype.key === 'harmonizer' && (
          <Heart className="w-24 h-24 mb-4 text-red-400" aria-label="Harmonizer icon" />
        )}
        {archetype.key === 'realist' && (
          <UserCheck className="w-24 h-24 mb-4 text-purple-500" aria-label="Realist icon" />
        )}
        {archetype.key === 'balanced' && (
          <Lightbulb className="w-24 h-24 mb-4 text-blue-400" aria-label="Balanced icon" />
        )}
        <h2 className="text-2xl font-bold mb-2 text-primary-700">{archetype.name}</h2>
        <p className="text-gray-700 text-center text-lg max-w-2xl">{archetype.summary}</p>
      </div>
      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8 text-lg text-gray-800 shadow-sm">
        <Info className="inline-block w-6 h-6 mr-2 text-blue-400 align-text-top" />
        {summary}
      </div>
      {/* Trait Bars */}
      <div className="mb-8">
        {TRAITS.map(trait => (
          <div key={trait.key} className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-700">{trait.label}</span>
              <span className="text-sm text-gray-500">{scores[trait.key]}%</span>
            </div>
            {/* Dual label bar with marker */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-20 text-left">{TRAIT_LABELS[trait.key].left}</span>
              <div className="relative flex-1 h-4 rounded bg-gray-200 overflow-visible">
                <div
                  className={`${trait.color} h-4 rounded transition-all`}
                  style={{ width: `${scores[trait.key]}%` }}
                ></div>
                {/* Marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `calc(${scores[trait.key]}% - 12px)` }}
                >
                  <div className="w-6 h-6 bg-white border-2 border-primary-400 rounded-full flex items-center justify-center shadow-sm">
                    <div className={`w-3 h-3 ${trait.color} rounded-full`}></div>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500 w-20 text-right">{TRAIT_LABELS[trait.key].right}</span>
            </div>
            <div className="text-xs text-gray-600 mt-2 ml-1">{TRAIT_LABELS[trait.key].desc(scores[trait.key])}</div>
          </div>
        ))}
      </div>
      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-bold mb-3 flex items-center"><CheckCircle className="w-6 h-6 text-green-500 mr-2" />Strengths</h2>
          <ul className="space-y-3">
            {sortedTraits.slice(0, 3).map(([k]) => (
              <li key={k} className="flex items-start gap-3 text-green-700 bg-green-50 rounded-lg p-3 border border-green-100">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold">{TRAIT_STRENGTHS[k].title}</div>
                  <div className="text-sm text-green-800">{TRAIT_STRENGTHS[k].desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-3 flex items-center"><AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />Weaknesses</h2>
          <ul className="space-y-3">
            {sortedTraits.slice(-3).map(([k]) => (
              <li key={k} className="flex items-start gap-3 text-yellow-700 bg-yellow-50 rounded-lg p-3 border border-yellow-100">
                <AlertTriangle className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold">{TRAIT_WEAKNESSES[k].title}</div>
                  <div className="text-sm text-yellow-800">{TRAIT_WEAKNESSES[k].desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Career Path, Personal Growth, Relationships */}
      <div className="space-y-10 mb-10">
        {/* Career Path */}
        <section className="bg-blue-50 border border-blue-100 rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <Briefcase className="w-16 h-16 text-blue-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2 text-blue-700">Career Path</h3>
            <p className="text-gray-700 mb-2">
              {archetype.key === 'visionary' && 'You excel in roles that value creativity, innovation, and collaboration. You thrive in dynamic environments where you can inspire others and drive new ideas forward.'}
              {archetype.key === 'analyst' && 'You are suited for analytical, research, or strategy roles where logic and independent thinking are valued.'}
              {archetype.key === 'supporter' && 'You shine in supportive, team-oriented roles where reliability and empathy are essential.'}
              {archetype.key === 'explorer' && 'You do well in flexible, fast-paced careers that allow for exploration and adaptability.'}
              {archetype.key === 'guardian' && 'You are a natural fit for structured, detail-oriented roles that require organization and dependability.'}
              {archetype.key === 'harmonizer' && 'You excel in people-focused careers that require emotional intelligence and conflict resolution.'}
              {archetype.key === 'realist' && 'You thrive in practical, hands-on roles that value real-world experience and straightforward communication.'}
              {archetype.key === 'balanced' && 'You can adapt to a wide range of careers, drawing on your balanced strengths.'}
            </p>
            <ul className="list-disc ml-5 text-blue-800 text-sm space-y-1">
              <li>Seek roles that match your strengths and values.</li>
              <li>Collaborate with others to maximize your impact.</li>
              <li>Continue learning and adapting to new challenges.</li>
            </ul>
          </div>
        </section>
        {/* Personal Growth */}
        <section className="bg-green-50 border border-green-100 rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <BarChart3 className="w-16 h-16 text-green-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2 text-green-700">Personal Growth</h3>
            <p className="text-gray-700 mb-2">
              {archetype.key === 'visionary' && 'Your drive for self-improvement is fueled by curiosity and a desire to make a difference. Embrace new experiences and reflect on your journey.'}
              {archetype.key === 'analyst' && 'Personal growth comes from challenging yourself intellectually and seeking out new knowledge.'}
              {archetype.key === 'supporter' && 'Focus on self-care and setting boundaries while supporting others.'}
              {archetype.key === 'explorer' && 'Growth comes from embracing change and learning from diverse experiences.'}
              {archetype.key === 'guardian' && 'Develop flexibility and openness to new perspectives.'}
              {archetype.key === 'harmonizer' && 'Practice self-compassion and balance your needs with those of others.'}
              {archetype.key === 'realist' && 'Set practical goals and celebrate your progress.'}
              {archetype.key === 'balanced' && 'Continue to develop all areas of your personality for holistic growth.'}
            </p>
            <ul className="list-disc ml-5 text-green-800 text-sm space-y-1">
              <li>Set realistic, meaningful goals for yourself.</li>
              <li>Reflect regularly on your progress and challenges.</li>
              <li>Practice self-care and resilience techniques.</li>
            </ul>
          </div>
        </section>
        {/* Relationships */}
        <section className="bg-purple-50 border border-purple-100 rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <Users className="w-16 h-16 text-purple-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2 text-purple-700">Relationships</h3>
            <p className="text-gray-700 mb-2">
              {archetype.key === 'visionary' && 'You build strong connections through inspiration and empathy. Your enthusiasm brings people together.'}
              {archetype.key === 'analyst' && 'You value honest, thoughtful communication and appreciate intellectual connection.'}
              {archetype.key === 'supporter' && 'You nurture relationships with kindness and reliability.'}
              {archetype.key === 'explorer' && 'You enjoy meeting new people and learning from different perspectives.'}
              {archetype.key === 'guardian' && 'You are loyal and dependable, providing stability in relationships.'}
              {archetype.key === 'harmonizer' && 'You foster harmony and understanding in your relationships.'}
              {archetype.key === 'realist' && 'You are straightforward and value practical support in relationships.'}
              {archetype.key === 'balanced' && 'You adapt well to different relationship dynamics.'}
            </p>
            <ul className="list-disc ml-5 text-purple-800 text-sm space-y-1">
              <li>Communicate openly and listen actively.</li>
              <li>Show appreciation and empathy to those around you.</li>
              <li>Balance your needs with the needs of others.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Growth Tips & Resources (moved to end) */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-8">
        {/* Growth Tips & Resources Section */}
        <h2 className="text-lg font-bold mb-3">Growth Tips & Resources</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TRAITS.map(trait => (
            <li key={trait.key} className="flex flex-col gap-1">
              <span className="font-semibold text-gray-700">{trait.label}:</span>
              <span className="text-gray-600 text-sm">{TIPS[trait.key]}</span>
              <a href={RESOURCES[trait.key]} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline text-xs">Learn more</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-center mt-8">
        <Link href="/bigfive" className="btn-secondary">Retake Big Five</Link>
        <Link href="/" className="btn-primary">Back to Home</Link>
      </div>
    </div>
  );
} 