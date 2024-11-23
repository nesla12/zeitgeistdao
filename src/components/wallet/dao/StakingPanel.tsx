import React, { useState } from 'react';
import { Lock, Unlock, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function StakingPanel() {
  const [amount, setAmount] = useState('');
  const [lockPeriod, setLockPeriod] = useState('30');
  const [isStaking, setIsStaking] = useState(false);

  const stakingInfo = {
    totalStaked: '2,500 ZTG',
    rewards: '125 ZTG',
    apr: '12.5%',
    nextReward: '2d 5h',
    lockPeriods: [
      { days: 30, multiplier: '1x' },
      { days: 90, multiplier: '1.5x' },
      { days: 180, multiplier: '2x' },
      { days: 365, multiplier: '3x' }
    ]
  };

  const handleStake = async () => {
    if (!amount || isStaking) return;
    setIsStaking(true);
    try {
      // Implement staking logic here
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAmount('');
      // Show success message
    } catch (error) {
      // Handle error
      console.error('Staking failed:', error);
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Staking</h2>

      {/* Staking Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-purple-600 mb-1">
            <Lock className="w-5 h-5" />
            <span className="font-medium">Total Staked</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">{stakingInfo.totalStaked}</span>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-green-600 mb-1">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Rewards</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">{stakingInfo.rewards}</span>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-600 mb-1">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">APR</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">{stakingInfo.apr}</span>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-amber-600 mb-1">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Next Reward</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">{stakingInfo.nextReward}</span>
        </div>
      </div>

      {/* Staking Form */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Stake
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter amount"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              ZTG
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lock Period
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stakingInfo.lockPeriods.map((period) => (
              <button
                key={period.days}
                onClick={() => setLockPeriod(period.days.toString())}
                className={`p-4 rounded-lg border text-center ${
                  lockPeriod === period.days.toString()
                    ? 'border-purple-500 bg-purple-50'
                    : 'hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">{period.days} days</div>
                <div className="text-sm text-purple-600">{period.multiplier} rewards</div>
              </button>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="flex items-start space-x-2 p-4 bg-blue-50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Important Information</p>
            <p>Staked tokens are locked for the selected period. Early unstaking will result in a penalty.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleStake}
            disabled={!amount || isStaking}
            className={`flex-1 py-3 rounded-lg ${
              !amount || isStaking
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {isStaking ? 'Staking...' : 'Stake Tokens'}
          </button>
          <button className="flex-1 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50">
            Unstake
          </button>
        </div>
      </div>
    </div>
  );
}

export default StakingPanel;