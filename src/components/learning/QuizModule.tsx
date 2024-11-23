import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import type { Quiz, QuizQuestion } from '../../types/learning';

interface QuizModuleProps {
  quiz: Quiz;
  onComplete: (score: number) => void;
}

function QuizModule({ quiz, onComplete }: QuizModuleProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : 0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (quiz.timeLimit && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quiz.timeLimit, timeLeft]);

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    let totalScore = 0;
    quiz.questions.forEach((question) => {
      const answer = answers[question.id];
      if (Array.isArray(question.correctAnswer)) {
        if (Array.isArray(answer) && 
            answer.length === question.correctAnswer.length && 
            answer.every(a => question.correctAnswer.includes(a))) {
          totalScore += question.points;
        }
      } else if (answer === question.correctAnswer) {
        totalScore += question.points;
      }
    });

    setScore(totalScore);
    setShowResults(true);
    onComplete(totalScore);
  };

  const renderQuestion = (question: QuizQuestion) => {
    switch (question.type) {
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

      case 'true-false':
        return (
          <div className="flex space-x-4">
            {['True', 'False'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(question.id, option)}
                className={`flex-1 p-4 rounded-lg border ${
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
            value={answers[question.id] as string || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="w-full h-32 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your answer..."
          />
        );
    }
  };

  if (showResults) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4">
            {score >= quiz.passingScore ? (
              <CheckCircle className="w-full h-full text-green-500" />
            ) : (
              <XCircle className="w-full h-full text-red-500" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Quiz Complete!
          </h2>
          <p className="text-gray-600">
            You scored {score} out of {quiz.questions.reduce((acc, q) => acc + q.points, 0)} points
          </p>
        </div>

        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{question.question}</h3>
                  <p className="text-sm text-gray-600">
                    Your answer: {answers[question.id]}
                  </p>
                </div>
                {answers[question.id] === question.correctAnswer ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              {answers[question.id] !== question.correctAnswer && question.explanation && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Explanation</p>
                      <p className="text-sm text-blue-800">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress and Timer */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
          {quiz.timeLimit && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
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
          {quiz.questions[currentQuestion].question}
        </h2>
        {renderQuestion(quiz.questions[currentQuestion])}
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
            if (currentQuestion === quiz.questions.length - 1) {
              handleSubmit();
            } else {
              setCurrentQuestion(currentQuestion + 1);
            }
          }}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          {currentQuestion === quiz.questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default QuizModule;