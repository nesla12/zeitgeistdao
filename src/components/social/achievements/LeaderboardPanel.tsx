import React, { useState } from 'react';
import { Trophy, Medal, Crown, ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

function LeaderboardPanel() {
  const [timeframe, setTimeframe] = useState('weekly');
  const [category, setCategory] = useState('overall');

  const leaderboard = [
    {
      rank: 1,
      user: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        level: 45
      },
      score: 1250,
      change: 'up',
      achievements: 48
    },
    {
      rank: 2,
      user: {
        name: 'David Kumar',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        level: 42
      },
      score: 1180,
      change: 'down',
      achievements: 45
    }
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-1 border rounded-lg text-sm"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="allTime">All Time</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-1 border rounded-lg text-sm"
          >
            <option value="overall">Overall</option>
            <option value="engagement">Engagement</option>
            <option value="content">Content Creation</option>
            <option value="impact">Impact</option>
          </select>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-4">
        {leaderboard.map((entry) => (
          <motion.div
            key={entry.rank}
            whileHover={{ scale: 1.01 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 text-center">
                {entry.rank === 1 && <Crown className="w-6 h-6 text-yellow-500 mx-auto" />}
                {entry.rank === 2 && <Medal className="w-6 h-6 text-gray-400 mx-auto" />}
                {entry.rank === 3 && <Medal className="w-6 h-6 text-amber-600 mx-auto" />}
                {entry.rank > 3 && <span className="text-gray-600">#{entry.rank}</span>}
              </div>
              <img
                src={entry.user.avatar}
                alt={entry.user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-900">{entry.user.name}</h3>
                <p className="text-sm text-gray-600">Level {entry.user.level}</p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="text-right">
                <div className="font-medium text-gray-900">{entry.score}</div>
                <div className="flex items-center text-sm">
                  {entry.change === 'up' ? (
                    <ArrowUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-gray-600">{entry.achievements} achievements</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default LeaderboardPanel;