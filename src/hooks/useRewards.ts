import { useState, useEffect } from 'react';
import { rewardDistributionService, RewardEvent, RewardPool } from '../services/rewards/RewardDistributionService';

export default function useRewards(userId: string) {
  const [balance, setBalance] = useState(0);
  const [rewardEvents, setRewardEvents] = useState<RewardEvent[]>([]);
  const [activePool, setActivePool] = useState<RewardPool | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateBalance = () => {
      setBalance(rewardDistributionService.getUserBalance(userId));
    };

    const updateRewards = () => {
      setRewardEvents(rewardDistributionService.getUserRewards(userId));
    };

    const updatePool = () => {
      setActivePool(rewardDistributionService.getCurrentPool());
    };

    // Initial load
    updateBalance();
    updateRewards();
    updatePool();
    setLoading(false);

    // Subscribe to events
    rewardDistributionService.on('rewardDistributed', (event: RewardEvent) => {
      if (event.userId === userId) {
        updateBalance();
        updateRewards();
      }
    });

    rewardDistributionService.on('distributionCompleted', () => {
      updatePool();
      updateBalance();
      updateRewards();
    });

    return () => {
      // Cleanup event listeners
      rewardDistributionService.off('rewardDistributed', updateBalance);
      rewardDistributionService.off('distributionCompleted', updatePool);
    };
  }, [userId]);

  return {
    balance,
    rewardEvents,
    activePool,
    loading
  };
}