import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, BookOpen, Star } from 'lucide-react';

function LearningStats() {
  const stats = [
    {
      icon: <BookOpen className="w-6 h-6 text-purple-500" />,
      title: "Courses Completed",
      value: "12",
      change: "+2 this month"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "Study Hours",
      value: "48",
      change: "+5 this week"
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: "Skills Mastered",
      value: "8",
      change: "+1 this month"
    },
    {
      icon: <Award className="w-6 h-6 text-green-500" />,
      title: "Achievements",
      value: "15",
      change: "2 pending"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-start justify-between mb-4">
            {stat.icon}
            <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{stat.title}</h3>
          <p className="text-sm text-gray-600">{stat.change}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default LearningStats;