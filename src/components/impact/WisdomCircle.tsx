import React from 'react';
import { Users, Calendar, MessageCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface CircleEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: number;
  facilitator: string;
  topic: string;
}

function WisdomCircle() {
  const upcomingCircles: CircleEvent[] = [
    {
      id: '1',
      title: 'Indigenous Wisdom Circle',
      date: 'March 20, 2024',
      time: '2:00 PM EST',
      participants: 12,
      facilitator: 'Elder Sarah',
      topic: 'Earth Connection & Healing'
    },
    {
      id: '2',
      title: 'Future Visioning Circle',
      date: 'March 22, 2024',
      time: '3:00 PM EST',
      participants: 8,
      facilitator: 'David K.',
      topic: 'Regenerative Communities'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Wisdom Circles</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Join a Circle</span>
        </button>
      </div>

      <div className="space-y-6">
        {upcomingCircles.map((circle) => (
          <CircleCard key={circle.id} circle={circle} />
        ))}
      </div>
    </div>
  );
}

function CircleCard({ circle }: { circle: CircleEvent }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="border rounded-lg p-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{circle.title}</h3>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{circle.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{circle.participants} participants</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600">Facilitated by {circle.facilitator}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Topic: {circle.topic}</p>
          </div>
        </div>
        <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200">
          Register
        </button>
      </div>
    </motion.div>
  );
}

export default WisdomCircle;