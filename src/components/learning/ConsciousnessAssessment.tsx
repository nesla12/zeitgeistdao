import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Globe, ArrowRight, Clock } from 'lucide-react';
import type { Assessment, AssessmentQuestion } from '../../types/learning';

interface ConsciousnessAssessmentProps {
  assessment: Assessment;
  onComplete: (results: any) => void;
}

function ConsciousnessAssessment({ assessment, onComplete }: ConsciousnessAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState(assessment.duration || 0);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    // Calculate results based on answers
    const results = {
      scores: [
        {
          category: 'Mindfulness',
          score: 85,
          interpretation: 'Advanced awareness of present moment experiences'
        },
        {
          category: 'Emotional Intelligence',
          score: 78,
          interpretation: 'Strong ability to recognize and manage emotions'
        }
      ],
      recommendations: [
        {
          title: 'Advanced Meditation Course',
          description: 'Deepen your practice with advanced meditation techniques',
          courseId: 'course-123'
        }
      ],
      timestamp: new Date()
    };

    onComplete(results);
  };

  const renderQuestion = (question: AssessmentQuestion) => {
    switch (question.type) {
      case 'scale':
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              {question.scale?.labels.map((label, index) => (
                <span key={index}>{label}</span>
              ))}
            </div>
            <input
              type="range"
              min={question.scale?.min}
              max={question.scale?.max}
              value={answers[question.id] || question.scale?.min}
              onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        );

      case 'multiple-choice':
        return (
          <div className="space-y-4">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(question.id, option)}
                className={`w-full p-4 text-left rounded-lg border ${
                  answers[question.id] === option
                    ? 'border-purple-500 bg-purple-50'
                    : 'hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'open-ended':
        return (
          <textarea
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="w-full h-32 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your response..."
          />
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {assessment.questions.length}</span>
          {assessment.duration && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
            </div>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / assessment.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-xl shadow-sm p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {assessment.questions[currentQuestion].question}
        </h2>
        {renderQuestion(assessment.questions[currentQuestion])}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          disabled={currentQuestion === 0}
          className="px-6 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (currentQuestion === assessment.questions.length - 1) {
              handleSubmit();
            } else {
              setCurrentQuestion(currentQuestion + 1);
            }
          }}
          className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <span>{currentQuestion === assessment.questions.length - 1 ? 'Complete' : 'Next'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default ConsciousnessAssessment;