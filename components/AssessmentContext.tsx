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