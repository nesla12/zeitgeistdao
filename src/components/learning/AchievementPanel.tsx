import React from 'react';
import { Award, Star, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  unlocked: boolean;
}

function AchievementPanel() {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Early Bird',
      description: 'Complete 5 morning meditation sessions',
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      progress: 80,
      unlocked: false
    },
    {
      id: '2',
      title: 'Knowledge Seeker',
      description: 'Complete your first course',
      icon: <Trophy className="w-5 h-5 text-purple-500" />,
      progress: 100,
      unlocked: true
    },
    {
      id: '3',
      title: 'Wisdom Keeper',
      description: 'Share insights with the community',
      icon: <Award className="w-5 h-5 text-blue-500" />,
      progress: 60,
      unlocked: false
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
      
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg ${
              achievement.unlocked ? 'bg-purple-50' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded-lg">
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                
                {!achievement.unlocked && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-purple-600 h-1 rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {achievement.progress}% Complete
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AchievementPanel;