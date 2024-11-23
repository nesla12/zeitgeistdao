import { ReactNode } from 'react';

export interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  image: string;
  assessments?: Assessment[];
  quizzes?: Quiz[];
}

export interface Milestone {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  description: string;
  prerequisites: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  unlocked: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  passingScore: number;
  attempts: number;
  completed?: boolean;
  score?: number;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'open-ended';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  type: 'consciousness' | 'emotional' | 'cognitive';
  questions: AssessmentQuestion[];
  duration?: number;
  completed?: boolean;
  results?: AssessmentResult;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'scale' | 'multiple-choice' | 'open-ended';
  options?: string[];
  scale?: {
    min: number;
    max: number;
    labels: string[];
  };
}

export interface AssessmentResult {
  scores: {
    category: string;
    score: number;
    interpretation: string;
  }[];
  recommendations: {
    title: string;
    description: string;
    courseId?: string;
  }[];
  timestamp: Date;
}</content>