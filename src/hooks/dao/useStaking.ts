import { useState, useEffect } from 'react';
import { stakingService, StakingInfo, StakingPosition } from '../../services/dao/StakingService';

export function useStaking() {
  const [stakingInfo, setStakingInfo] = useState<StakingInfo | null>(null);
  const [positions, setPositions] = useState<StakingPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [info, userPositions] = await Promise.all([
          stakingService.getStakingInfo(),
          stakingService.getStakingPositions('current-user')
        ]);

        setStakingInfo(info);
        setPositions(userPositions);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch staking data:', error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Subscribe to events
    const unsubscribeStaked = stakingService.onStaked(({ position }) => {
      setPositions(prev => [...prev, position]);
    });

    const unsubscribeUnstaked = stakingService.onUnstaked(({ positionId }) => {
      setPositions(prev => prev.filter(pos => pos.id !== positionId));
    });

    return () => {
      unsubscribeStaked();
      unsubscribeUnstaked();
    };
  }, []);

  const stake = async (amount: number, lockPeriod: number) => {
    try {
      const position = await stakingService.stake('current-user', amount, lockPeriod);
      return position;
    } catch (error) {
      console.error('Failed to stake:', error);
      throw error;
    }
  };

  const unstake = async (positionId: string) => {
    try {
      await stakingService.unstake('current-user', positionId);
    } catch (error) {
      console.error('Failed to unstake:', error);
      throw error;
    }
  };

  const calculateRewards = async () => {
    try {
      return await stakingService.calculateRewards('current-user');
    } catch (error) {
      console.error('Failed to calculate rewards:', error);
      throw error;
    }
  };

  return {
    stakingInfo,
    positions,
    loading,
    error,
    stake,
    unstake,
    calculateRewards
  };
}

export default useStaking;