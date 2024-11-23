import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, TrendingUp } from 'lucide-react';

function VotingPower() {
  const votingStats = {
    totalPower: '12,345 VP',
    stakedTokens: '5,000 ECO',
    delegatedPower: '2,345 VP',
    lockPeriod: '6 months',
    multiplier: '1.5x'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Voting Power</h2>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Voting Power</span>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-purple-600" />
              <span className="font-bold text-gray-900">{votingStats.totalPower}</span>
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="h-full bg-purple-600 rounded-full" style={{ width: '75%' }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-2 text-purple-600 mb-1">
              <Lock className="w-4 h-4" />
              <span className="font-medium">Staked</span>
            </div>
            <span className="text-lg font-bold text-gray-900">{votingStats.stakedTokens}</span>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 text-green-600 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Delegated</span>
            </div>
            <span className="text-lg font-bold text-gray-900">{votingStats.delegatedPower}</span>
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Lock Period</span>
            <span className="font-medium text-gray-900">{votingStats.lockPeriod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Power Multiplier</span>
            <span className="font-medium text-purple-600">{votingStats.multiplier}</span>
          </div>
        </div>

        <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
          Increase Voting Power
        </button>
      </div>
    </div>
  );
}

export default VotingPower;