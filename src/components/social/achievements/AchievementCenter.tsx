import React, { useState } from 'react';
import { Trophy, Star, Target, Medal, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import AchievementCard from './AchievementCard';
import LeaderboardPanel from './LeaderboardPanel';
import ProgressTracker from './ProgressTracker';

function AchievementCenter() {
  const [activeTab, setActiveTab] = useState<'achievements' | 'leaderboard' | 'progress'>('achievements');

  const achievements = [
    {
      id: '1',
      title: 'Early Adopter',
      description: 'One of the first 1000 members',
      icon: <Star className="w-6 h-6" />,
      rarity: 'rare',
      progress: 100,
      unlocked: true,
      date: '2024-03-15'
    },
    {
      id: '2',
      title: 'Community Builder',
      description: 'Create and manage an active group',
      icon: <Users className="w-6 h-6" />,
      rarity: 'epic',
      progress: 75,
      unlocked: false,
      requirements: ['Create a group', 'Reach 50 members', 'Maintain 80% engagement']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
          <p className="text-gray-600">Track your progress and earn rewards</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === 'achievements'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span>Achievements</span>
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === 'leaderboard'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Medal className="w-5 h-5" />
            <span>Leaderboard</span>
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === 'progress'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Progress</span>
          </button>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Achievements</p>
              <h3 className="text-3xl font-bold text-gray-900">24/50</h3>
            </div>
            <Trophy className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Current Rank</p>
              <h3 className="text-3xl font-bold text-gray-900">Silver</h3>
            </div>
            <Medal className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Next Milestone</p>
              <h3 className="text-3xl font-bold text-gray-900">Gold</h3>
            </div>
            <Target className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        )}
        {activeTab === 'leaderboard' && <LeaderboardPanel />}
        {activeTab === 'progress' && <ProgressTracker />}
      </div>
    </div>
  );
}

export default AchievementCenter;