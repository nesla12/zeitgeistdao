import React from 'react';
import { Award, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

function CommunityImpact() {
  const topContributors = [
    {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      impact: "12.5 tons CO2 saved",
      badge: "Environmental Champion"
    },
    {
      name: "Michael Torres",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      impact: "85 trees planted",
      badge: "Forest Guardian"
    },
    {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      impact: "250 people reached",
      badge: "Community Leader"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Community Impact Leaders</h2>
      <div className="space-y-6">
        {topContributors.map((contributor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4"
          >
            <img
              src={contributor.avatar}
              alt={contributor.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-900">{contributor.name}</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {contributor.badge}
                </span>
              </div>
              <p className="text-sm text-gray-600">{contributor.impact}</p>
            </div>
            <Star className="w-5 h-5 text-yellow-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CommunityImpact;