import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Topic {
  name: string;
  posts: number;
  participants: number;
  trending?: boolean;
}

interface TrendingTopicsProps {
  topics: Topic[];
}

function TrendingTopics({ topics }: TrendingTopicsProps) {
  const trendingTopics: Topic[] = [
    {
      name: "Regenerative Agriculture",
      posts: 156,
      participants: 234,
      trending: true
    },
    {
      name: "Community Gardens",
      posts: 124,
      participants: 189,
      trending: true
    },
    {
      name: "Zero Waste",
      posts: 98,
      participants: 145
    },
    {
      name: "Local Food",
      posts: 87,
      participants: 167
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Trending Topics</h2>
      <div className="space-y-4">
        {trendingTopics.map((topic, index) => (
          <motion.div
            key={index}
            whileHover={{ x: 4 }}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
          >
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-900">#{topic.name}</h3>
                {topic.trending && (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                )}
              </div>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-gray-500">{topic.posts} posts</span>
                <span className="text-sm text-gray-500">{topic.participants} participants</span>
              </div>
            </div>
            <TrendingUp className={`w-5 h-5 ${topic.trending ? 'text-green-500' : 'text-gray-400'}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default TrendingTopics;