import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Search, ArrowRight } from 'lucide-react';

function DelegationPanel() {
  const [searchQuery, setSearchQuery] = useState('');

  const delegates = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      votingPower: '234.5K VP',
      delegators: 156,
      proposals: 12,
      participation: '98%'
    },
    {
      id: '2',
      name: 'David Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      votingPower: '189.2K VP',
      delegators: 124,
      proposals: 8,
      participation: '95%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search delegates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Delegates List */}
      <div className="space-y-4">
        {delegates.map((delegate) => (
          <motion.div
            key={delegate.id}
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={delegate.avatar}
                  alt={delegate.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{delegate.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{delegate.delegators} delegators</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-purple-600">{delegate.votingPower}</div>
                <div className="text-sm text-gray-500">{delegate.participation} participation</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Proposals Created</div>
                <div className="font-medium text-gray-900">{delegate.proposals}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Voting Score</div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-medium text-gray-900">4.8/5.0</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50">
              <span>View Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default DelegationPanel;