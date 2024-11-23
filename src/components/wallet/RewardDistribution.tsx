import React from 'react';
import { Clock, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import useRewards from '../../hooks/useRewards';

function RewardDistribution() {
  const { balance, rewardEvents, activePool, loading } = useRewards('current-user');

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="h-24 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Reward Distribution</h2>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <span className="text-sm text-gray-600">Next distribution in {getTimeUntilNextDistribution()}</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Current Balance */}
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-600 mb-1">Current Balance</p>
          <div className="text-2xl font-bold text-purple-600">{balance.toLocaleString()} ECO</div>
        </div>

        {/* Distribution Breakdown */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Distribution Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Contributions (50%)</span>
                <span className="font-medium text-gray-900">
                  {(activePool?.totalAmount * 0.5).toLocaleString()} ECO
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '50%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Progress (10%)</span>
                <span className="font-medium text-gray-900">
                  {(activePool?.totalAmount * 0.1).toLocaleString()} ECO
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Voting (20%)</span>
                <span className="font-medium text-gray-900">
                  {(activePool?.totalAmount * 0.2).toLocaleString()} ECO
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Governance (20%)</span>
                <span className="font-medium text-gray-900">
                  {(activePool?.totalAmount * 0.2).toLocaleString()} ECO
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-600 h-2 rounded-full" style={{ width: '20%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Rewards */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Recent Rewards</h3>
          <div className="space-y-3">
            {rewardEvents.slice(0, 5).map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">+{event.amount} ECO</p>
                    <p className="text-sm text-gray-600 capitalize">{event.type} Reward</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(event.timestamp).toLocaleDateString()}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getTimeUntilNextDistribution(): string {
  const now = new Date();
  const currentHour = now.getHours();
  const nextDistributionHour = currentHour < 12 ? 12 : 24;
  const hoursLeft = nextDistributionHour - currentHour;
  const minutesLeft = 60 - now.getMinutes();
  
  return `${hoursLeft}h ${minutesLeft}m`;
}

export default RewardDistribution;