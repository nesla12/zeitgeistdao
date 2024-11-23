import React from 'react';
import { Users, TreePine, Target, Coins } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

function PlatformMetrics() {
  const metrics = [
    {
      value: "10K+",
      label: "Active Members",
      icon: <Users className="w-6 h-6 text-purple-500" />
    },
    {
      value: "500+",
      label: "Impact Projects",
      icon: <Target className="w-6 h-6 text-blue-500" />
    },
    {
      value: "100K+",
      label: "Trees Planted",
      icon: <TreePine className="w-6 h-6 text-green-500" />
    },
    {
      value: "Ꞗ50+",
      label: "Distributed Rewards",
      icon: <Coins className="w-6 h-6 text-amber-500" />
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">{metric.icon}</div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
          <div className="text-gray-600">{metric.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default PlatformMetrics;