import React from 'react';
import { Target, Trophy, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function ChallengesSection() {
  const challenges = [
    {
      id: 1,
      title: "30 Days of Mindfulness",
      participants: 1234,
      daysLeft: 15,
      progress: 50,
      reward: "Mindfulness Master Badge",
      image: "https://images.unsplash.com/photo-1518709414768-a88981a4515d?w=500&q=80"
    },
    {
      id: 2,
      title: "Zero Waste Week",
      participants: 856,
      daysLeft: 7,
      progress: 75,
      reward: "Earth Guardian Badge",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Active Challenges</h2>
        <button className="text-purple-600 hover:text-purple-700 flex items-center space-x-1">
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        {challenges.map((challenge) => (
          <motion.div
            key={challenge.id}
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex space-x-4">
              <img
                src={challenge.image}
                alt={challenge.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-2">{challenge.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{challenge.participants} participants</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    <span>{challenge.daysLeft} days left</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm mb-3">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-600">Reward: {challenge.reward}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ChallengesSection;