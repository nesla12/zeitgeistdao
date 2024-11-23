import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import type { Milestone } from '../../types/learning';

interface LearningPathProps {
  milestones: Milestone[];
  loading: boolean;
}

function LearningPath({ milestones, loading }: LearningPathProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
          <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gray-200 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Learning Path</h2>
        <Target className="h-5 w-5 text-purple-500" />
      </div>
      <div className="space-y-8">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4"
          >
            <div className={`flex-shrink-0 w-4 h-4 rounded-full mt-1 ${
              milestone.status === 'completed' ? 'bg-purple-500' :
              milestone.status === 'in-progress' ? 'bg-blue-500' :
              'bg-gray-300'
            }`} />
            <div>
              <h3 className="font-medium text-gray-900">{milestone.title}</h3>
              <p className="text-sm text-gray-600">{milestone.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default LearningPath;