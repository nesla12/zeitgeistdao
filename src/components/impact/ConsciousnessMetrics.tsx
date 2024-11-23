import React from 'react';
import { Brain, Heart, Globe, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricProps {
  title: string;
  score: number;
  maxScore: number;
  icon: React.ReactNode;
  color: string;
}

function ConsciousnessMetrics() {
  const metrics = [
    {
      title: "Awareness Depth",
      score: 7.5,
      maxScore: 10,
      icon: <Brain className="w-6 h-6" />,
      color: "purple"
    },
    {
      title: "Relational Intelligence",
      score: 8.2,
      maxScore: 10,
      icon: <Heart className="w-6 h-6" />,
      color: "rose"
    },
    {
      title: "Systems Understanding",
      score: 6.8,
      maxScore: 10,
      icon: <Globe className="w-6 h-6" />,
      color: "blue"
    },
    {
      title: "Wisdom Integration",
      score: 7.9,
      maxScore: 10,
      icon: <Lightbulb className="w-6 h-6" />,
      color: "amber"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Consciousness Development Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
}

function MetricCard({ title, score, maxScore, icon, color }: MetricProps) {
  const percentage = (score / maxScore) * 100;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-50 rounded-lg p-4"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className={`text-${color}-500`}>{icon}</div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="relative pt-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold inline-block text-gray-600">
            Score: {score}/{maxScore}
          </span>
          <span className="text-xs font-semibold inline-block text-gray-600">
            {percentage.toFixed(1)}%
          </span>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${percentage}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${color}-500`}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default ConsciousnessMetrics;