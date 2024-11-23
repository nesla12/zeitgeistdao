import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PracticeTimerProps {
  practice: {
    name: string;
    duration: string;
  };
  onClose: () => void;
  onComplete: () => void;
}

function PracticeTimer({ practice, onClose, onComplete }: PracticeTimerProps) {
  const initialTime = parseInt(practice.duration) * 60; // Convert minutes to seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [showCompleteMessage, setShowCompleteMessage] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            setShowCompleteMessage(true);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setTimeLeft(initialTime);
    setIsActive(false);
    setShowCompleteMessage(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{practice.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {showCompleteMessage ? (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold text-green-600 mb-4">Practice Complete!</h3>
                <p className="text-gray-600 mb-6">
                  Great job completing your practice session.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleReset}
                    className="flex-1 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50"
                  >
                    Start Again
                  </button>
                  <button
                    onClick={() => {
                      onComplete();
                      onClose();
                    }}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Finish
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="timer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-gray-900 mb-8">
                  {formatTime(timeLeft)}
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleReset}
                    className="p-3 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setIsActive(!isActive)}
                    className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                  >
                    {isActive ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default PracticeTimer;