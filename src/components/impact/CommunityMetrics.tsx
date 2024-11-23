import React from 'react';
import { Users, MessageCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

function CommunityMetrics() {
  const metrics = [
    {
      title: "Indigenous Knowledge",
      participants: 128,
      discussions: 5,
      icon: <Star className="w-6 h-6 text-amber-500" />
    },
    {
      title: "Regenerative Practices",
      participants: 256,
      discussions: 8,
      icon: <Users className="w-6 h-6 text-green-500" />
    },
    {
      title: "Future Visioning",
      participants: 192,
      discussions: 6,
      icon: <MessageCircle className="w-6 h-6 text-blue-500" />
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Wisdom</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  participants: number;
  discussions: number;
  icon: React.ReactNode;
}

function MetricCard({ title, participants, discussions, icon }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-50 rounded-lg p-4"
    >
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Participants</span>
          <span className="font-medium text-gray-900">{participants}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Active Discussions</span>
          <span className="font-medium text-gray-900">{discussions}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default CommunityMetrics;