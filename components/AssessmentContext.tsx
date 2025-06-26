"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Types for assessment answers (extensible for other assessments)
export interface AssessmentAnswers {
  bigFive?: string[];
  // Add other assessments as needed, e.g. empathy?: string[], crt?: string[], etc.
}

interface AssessmentContextType {
  answers: AssessmentAnswers;
  setBigFiveAnswers: (answers: string[]) => void;
  // Add setters for other assessments as needed
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<AssessmentAnswers>({});

  // Setter for Big Five answers
  const setBigFiveAnswers = (bigFiveAnswers: string[]) => {
    setAnswers(prev => ({ ...prev, bigFive: bigFiveAnswers }));
  };

  // Add other setters as needed

  return (
    <AssessmentContext.Provider value={{ answers, setBigFiveAnswers }}>
      {children}
    </AssessmentContext.Provider>
  );
};

// Custom hook for consuming the context
export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error("useAssessment must be used within an AssessmentProvider");
  }
  return context;
};

// Centralized assessment questions for /database page
export const assessmentQuestions = [
  {
    section: 'Empathy / Emotional Intelligence',
    questions: [
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
    ]
  },
  {
    section: 'Big Five Personality Inventory',
    questions: [
      'I am the life of the party.',
      'I feel little concern for others.',
      'I am always prepared.',
      'I get stressed out easily.',
      'I have a rich vocabulary.',
      "I don't talk a lot.",
      'I am interested in people.',
      'I leave my belongings around.',
      'I am relaxed most of the time.',
      'I have difficulty understanding abstract ideas.',
      'I feel comfortable around people.',
      'I insult people.',
      'I pay attention to details.',
      'I worry about things.',
      'I have a vivid imagination.',
      'I keep in the background.',
      "I sympathize with others' feelings.",
      'I make a mess of things.',
      'I seldom feel blue.',
      'I am not interested in abstract ideas.',
      'I start conversations.',
      "I am not interested in other people's problems.",
      'I get chores done right away.',
      'I am easily disturbed.',
      'I have excellent ideas.',
      'I have little to say.',
      'I have a soft heart.',
      'I often forget to put things back in their proper place.',
      'I get upset easily.',
      'I do not have a good imagination.',
      'I talk to a lot of different people at parties.',
      'I am not really interested in others.',
      'I like order.',
      'I change my mood a lot.',
      'I am quick to understand things.',
      "I don't like to draw attention to myself.",
      'I take time out for others.',
      'I shirk (avoid/neglect) my duties.',
      'I have frequent mood swings.',
      'I use difficult words.',
      "I don't mind being the center of attention.",
      "I feel others' emotions.",
      'I follow a schedule.',
      'I get irritated easily.',
      'I spend time reflecting on things.',
      'I am quiet around strangers.',
      'I make people feel at ease.',
      'I am exacting in my work.',
      'I often feel blue.',
      'I am full of ideas.'
    ]
  },
  {
    section: 'Cognitive Reflection Test (CRT)',
    questions: [
      'In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake?',
      'A bat and a ball cost £1.10 in total. The bat costs £1.00 more than the ball. How much does the ball cost?',
      'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?'
    ]
  },
  {
    section: 'News Judgment Task',
    questions: [
      'A Small Group of People Control the World Economy by Manipulating the Price of Gold and Oil',
      'US Hispanic Population Reached New High in 2018, But Growth Has Slowed',
      "Most Americans Say It's OK for Professional Athletes to Speak out Publicly about Politics", 
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
      "Morocco's King Appoints Committee Chief to Fight Poverty and Inequality"
    ]
  }
]; 