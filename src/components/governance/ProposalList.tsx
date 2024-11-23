import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ThumbsUp, ThumbsDown, Users, Clock } from 'lucide-react';

function ProposalList() {
  const proposals = [
    {
      id: '1',
      title: 'Increase Reward Distribution for Content Creators',
      description: 'Proposal to increase the reward allocation for high-quality content creators from 20% to 25% of the total distribution.',
      status: 'active',
      votes: {
        for: 234567,
        against: 45678,
        participation: 68
      },
      timeLeft: '2 days',
      creator: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
      }
    },
    {
      id: '2',
      title: 'Implement New Sustainability Metrics',
      description: 'Add environmental impact tracking and rewards for eco-friendly actions within the platform.',
      status: 'active',
      votes: {
        for: 189234,
        against: 23456,
        participation: 72
      },
      timeLeft: '5 days',
      creator: {
        name: 'David Kumar',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      }
    }
  ];

  return (
    <div className="space-y-6">
      {proposals.map((proposal) => (
        <motion.div
          key={proposal.id}
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {proposal.title}
                </h3>
                <p className="text-gray-600 mb-4">{proposal.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{proposal.timeLeft} left</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{proposal.votes.participation}% participation</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <ThumbsUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {proposal.votes.for.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    {proposal.votes.against.toLocaleString()}
                  </span>
                  <ThumbsDown className="w-4 h-4 text-red-500" />
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${(proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default ProposalList;