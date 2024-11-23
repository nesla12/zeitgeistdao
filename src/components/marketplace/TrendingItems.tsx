import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

function TrendingItems() {
  const trendingItems = [
    {
      title: "Handcrafted Meditation Cushion",
      price: "$89.99",
      change: "+15%",
      volume: "156 sales"
    },
    {
      title: "Digital Mindfulness Course",
      price: "$49.99",
      change: "+28%",
      volume: "234 enrollments"
    },
    {
      title: "Eco-Friendly Yoga Mat",
      price: "$75.00",
      change: "+10%",
      volume: "98 sales"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Trending Now</h2>
        </div>
        <button className="text-purple-600 hover:text-purple-700 flex items-center space-x-1">
          <span>View All</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {trendingItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ x: 4 }}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
          >
            <div>
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-gray-600">{item.price}</span>
                <span className="text-sm text-green-600">{item.change}</span>
              </div>
            </div>
            <span className="text-sm text-gray-500">{item.volume}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default TrendingItems;