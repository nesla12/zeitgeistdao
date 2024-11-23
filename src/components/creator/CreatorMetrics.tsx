import React from 'react';
import { Users, Star, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

function CreatorMetrics() {
  const metrics = [
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Total Followers",
      value: "1,234",
      change: "+12% this month"
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: "Content Rating",
      value: "4.8",
      change: "Based on 156 reviews"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      title: "Engagement Rate",
      value: "8.5%",
      change: "+2.3% this week"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-purple-500" />,
      title: "Total Earnings",
      value: "$2,458",
      change: "+$450 this month"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-start justify-between mb-4">
            {metric.icon}
            <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{metric.title}</h3>
          <p className="text-sm text-gray-600">{metric.change}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default CreatorMetrics;