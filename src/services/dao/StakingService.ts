import { EventEmitter } from 'events';

export interface StakingInfo {
  totalStaked: string;
  rewards: string;
  apr: string;
  nextReward: string;
  lockPeriods: {
    days: number;
    multiplier: string;
  }[];
}

export interface StakingPosition {
  id: string;
  amount: number;
  lockPeriod: number;
  startDate: Date;
  endDate: Date;
  rewards: number;
  multiplier: string;
}

class StakingService extends EventEmitter {
  private stakingPositions: Map<string, StakingPosition[]> = new Map();
  private stakingInfo: StakingInfo = {
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

  async getStakingInfo(): Promise<StakingInfo> {
    return this.stakingInfo;
  }

  async stake(userId: string, amount: number, lockPeriod: number): Promise<StakingPosition> {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + lockPeriod);

    const multiplier = this.stakingInfo.lockPeriods.find(
      period => period.days === lockPeriod
    )?.multiplier || '1x';

    const position: StakingPosition = {
      id: Date.now().toString(),
      amount,
      lockPeriod,
      startDate,
      endDate,
      rewards: 0,
      multiplier
    };

    const userPositions = this.stakingPositions.get(userId) || [];
    userPositions.push(position);
    this.stakingPositions.set(userId, userPositions);

    this.emit('staked', { userId, position });
    return position;
  }

  async unstake(userId: string, positionId: string): Promise<void> {
    const userPositions = this.stakingPositions.get(userId);
    if (!userPositions) throw new Error('No staking positions found');

    const position = userPositions.find(pos => pos.id === positionId);
    if (!position) throw new Error('Staking position not found');

    if (new Date() < position.endDate) {
      throw new Error('Cannot unstake before lock period ends');
    }

    this.stakingPositions.set(
      userId,
      userPositions.filter(pos => pos.id !== positionId)
    );

    this.emit('unstaked', { userId, positionId });
  }

  async getStakingPositions(userId: string): Promise<StakingPosition[]> {
    return this.stakingPositions.get(userId) || [];
  }

  async calculateRewards(userId: string): Promise<number> {
    const positions = this.stakingPositions.get(userId) || [];
    return positions.reduce((total, position) => {
      const multiplier = parseFloat(position.multiplier);
      return total + (position.amount * 0.125 * multiplier);
    }, 0);
  }

  onStaked(callback: (data: { userId: string; position: StakingPosition }) => void) {
    this.on('staked', callback);
    return () => this.off('staked', callback);
  }

  onUnstaked(callback: (data: { userId: string; positionId: string }) => void) {
    this.on('unstaked', callback);
    return () => this.off('unstaked', callback);
  }
}

export const stakingService = new StakingService();