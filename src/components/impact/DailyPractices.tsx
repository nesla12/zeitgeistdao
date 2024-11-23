import React, { useState } from 'react';
import { Sunrise, Moon, Book, Heart, CheckCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import PracticeGuideDialog from './PracticeGuideDialog';
import PracticeTimer from './PracticeTimer';
import PracticeStats from './PracticeStats';

interface Practice {
  id: string;
  name: string;
  description: string;
  duration: string;
  completed: boolean;
  time: string;
  icon: React.ReactNode;
  guide?: {
    steps: string[];
    tips: string[];
    benefits: string[];
  };
  streak: number;
  totalMinutes: number;
}

function DailyPractices() {
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [view, setView] = useState<'today' | 'stats'>('today');

  const practices: Practice[] = [
    {
      id: '1',
      name: 'Morning Meditation',
      description: 'Start your day with mindful awareness',
      duration: '20 min',
      completed: true,
      time: '6:00 AM',
      icon: <Sunrise className="w-5 h-5" />,
      guide: {
        steps: [
          'Find a quiet, comfortable space',
          'Sit in a relaxed but alert position',
          'Focus on your breath',
          'Observe thoughts without judgment',
          'Gently return focus to breath when distracted'
        ],
        tips: [
          'Maintain a straight spine',
          'Keep eyes softly closed or downcast',
          'Start with shorter sessions and gradually increase',
          'Use a meditation cushion for comfort'
        ],
        benefits: [
          'Increased focus and clarity',
          'Reduced stress and anxiety',
          'Better emotional regulation',
          'Enhanced self-awareness'
        ]
      },
      streak: 7,
      totalMinutes: 840
    },
    {
      id: '2',
      name: 'Wisdom Reading',
      description: 'Study ancient and modern wisdom',
      duration: '30 min',
      completed: false,
      time: '2:00 PM',
      icon: <Book className="w-5 h-5" />,
      guide: {
        steps: [
          'Choose material mindfully',
          'Create a peaceful reading environment',
          'Read slowly and reflectively',
          'Take notes on key insights',
          'Contemplate practical applications'
        ],
        tips: [
          'Minimize distractions',
          'Highlight meaningful passages',
          'Journal your reflections',
          'Discuss with others'
        ],
        benefits: [
          'Deeper understanding',
          'Expanded perspective',
          'Personal growth',
          'Practical wisdom'
        ]
      },
      streak: 4,
      totalMinutes: 600
    },
    {
      id: '3',
      name: 'Gratitude Practice',
      description: 'Express appreciation and cultivate joy',
      duration: '10 min',
      completed: false,
      time: '7:00 PM',
      icon: <Heart className="w-5 h-5" />,
      guide: {
        steps: [
          'Find a quiet moment',
          'Reflect on positive experiences',
          "Write down three things you're grateful for",
          'Include why they matter to you',
          'Feel the appreciation deeply'
        ],
        tips: [
          'Be specific in your gratitude',
          'Include small moments',
          'Vary your entries daily',
          'Share gratitude with others'
        ],
        benefits: [
          'Increased happiness',
          'Improved relationships',
          'Enhanced resilience',
          'Greater life satisfaction'
        ]
      },
      streak: 12,
      totalMinutes: 360
    },
    {
      id: '4',
      name: 'Evening Reflection',
      description: 'Review and integrate daily lessons',
      duration: '15 min',
      completed: false,
      time: '9:00 PM',
      icon: <Moon className="w-5 h-5" />,
      guide: {
        steps: [
          "Review the day's events",
          'Identify key learnings',
          'Acknowledge challenges and growth',
          'Set intentions for tomorrow',
          'Practice self-compassion'
        ],
        tips: [
          'Use a journal',
          'Focus on growth, not judgment',
          'Include both challenges and victories',
          'Consider impact on others'
        ],
        benefits: [
          'Better self-understanding',
          'Improved decision-making',
          'Enhanced personal growth',
          'Deeper self-awareness'
        ]
      },
      streak: 5,
      totalMinutes: 450
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Daily Practices</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setView('today')}
            className={`px-4 py-2 rounded-lg ${
              view === 'today'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setView('stats')}
            className={`px-4 py-2 rounded-lg ${
              view === 'stats'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Statistics
          </button>
        </div>
      </div>

      {view === 'today' ? (
        <div className="space-y-4">
          {practices.map((practice) => (
            <motion.div
              key={practice.id}
              whileHover={{ scale: 1.01 }}
              className={`p-4 rounded-lg border ${
                practice.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`${practice.completed ? 'text-green-500' : 'text-gray-400'}`}>
                    {practice.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{practice.name}</h3>
                    <p className="text-sm text-gray-600">{practice.description}</p>
                    <div className="flex items-center space-x-4 mt-1 text-sm">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{practice.time}</span>
                      </div>
                      <div className="flex items-center text-orange-500">
                        <span>{practice.streak} day streak</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedPractice(practice);
                      setShowGuide(true);
                    }}
                    className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
                  >
                    <Book className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPractice(practice);
                      setShowTimer(true);
                    }}
                    className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
                  >
                    <Calendar className="w-5 h-5" />
                  </button>
                  <button
                    className={`p-2 rounded-full ${
                      practice.completed
                        ? 'text-green-500 bg-green-100'
                        : 'text-gray-400 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <PracticeStats practices={practices} />
      )}

      {/* Practice Guide Dialog */}
      {selectedPractice && showGuide && (
        <PracticeGuideDialog
          practice={selectedPractice}
          onClose={() => setShowGuide(false)}
        />
      )}

      {/* Practice Timer Dialog */}
      {selectedPractice && showTimer && (
        <PracticeTimer
          practice={selectedPractice}
          onClose={() => setShowTimer(false)}
          onComplete={() => {
            // Handle practice completion
            setShowTimer(false);
          }}
        />
      )}
    </div>
  );
}

export default DailyPractices;