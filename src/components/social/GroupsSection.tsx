import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function GroupsSection() {
  const groups = [
    {
      id: 1,
      name: "Mindful Living Circle",
      members: 234,
      description: "A community focused on mindful living practices",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80",
      topics: ["Mindfulness", "Wellness", "Personal Growth"]
    },
    {
      id: 2,
      name: "Eco Warriors",
      members: 189,
      description: "Taking action for environmental consciousness",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80",
      topics: ["Environment", "Sustainability", "Action"]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Popular Groups</h2>
        <button className="text-purple-600 hover:text-purple-700 flex items-center space-x-1">
          <span>Explore Groups</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <motion.div
            key={group.id}
            whileHover={{ scale: 1.02 }}
            className="flex space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <img
              src={group.image}
              alt={group.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">{group.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Users className="w-4 h-4 mr-1" />
                <span>{group.members} members</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{group.description}</p>
              <div className="flex flex-wrap gap-2">
                {group.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 h-fit">
              Join
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default GroupsSection;