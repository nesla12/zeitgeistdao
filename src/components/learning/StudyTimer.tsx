import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

function StudyTimer() {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [type, setType] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      // Switch between focus and break
      if (type === 'focus') {
        setTime(5 * 60); // 5 minute break
        setType('break');
      } else {
        setTime(25 * 60); // 25 minute focus
        setType('focus');
      }
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time, type]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setTime(25 * 60);
    setIsActive(false);
    setType('focus');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Study Timer</h2>
        <Clock className="w-5 h-5 text-purple-600" />
      </div>

      <div className="text-center">
        <motion.div
          animate={{ scale: isActive ? [1, 1.02, 1] : 1 }}
          transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
          className={`text-4xl font-bold mb-4 ${
            type === 'focus' ? 'text-purple-600' : 'text-green-600'
          }`}
        >
          {formatTime(time)}
        </motion.div>

        <p className="text-gray-600 mb-6">
          {type === 'focus' ? 'Focus Session' : 'Break Time'}
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className="p-3 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudyTimer;