import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Check } from 'lucide-react';

interface AchievementCardProps {
  achievement: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    rarity: string;
    progress: number;
    unlocked: boolean;
    date?: string;
    requirements?: string[];
  };
}

function AchievementCard({ achievement }: AchievementCardProps) {
  const rarityColors = {
    common: 'bg-gray-100 text-gray-800',
    rare: 'bg-blue-100 text-blue-800',
    epic: 'bg-purple-100 text-purple-800',
    legendary: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-lg border ${
        achievement.unlocked ? 'bg-white' : 'bg-gray-50'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-purple-100 rounded-lg">
          {achievement.icon}
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          rarityColors[achievement.rarity as keyof typeof rarityColors]
        }`}>
          {achievement.rarity}
        </span>
      </div>

      <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>

      {achievement.unlocked ? (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-green-600">
            <Check className="w-4 h-4 mr-1" />
            <span>Unlocked</span>
          </div>
          {achievement.date && (
            <span className="text-gray-500">{achievement.date}</span>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{achievement.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${achievement.progress}%` }}
            />
          </div>
          {achievement.requirements && (
            <div className="mt-3">
              <span className="text-sm font-medium text-gray-700">Requirements:</span>
              <ul className="mt-1 space-y-1">
                {achievement.requirements.map((req, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default AchievementCard;