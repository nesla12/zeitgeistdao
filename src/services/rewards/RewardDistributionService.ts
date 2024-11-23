// Custom event emitter for browser compatibility
class EventEmitterBrowser {
  private listeners: { [key: string]: Function[] } = {};

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event: string, data?: any) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => callback(data));
  }

  off(event: string, callback: Function) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }
}

export interface RewardEvent {
  id: string;
  userId: string;
  type: 'contribution' | 'progress' | 'voting' | 'governance';
  amount: number;
  timestamp: Date;
  metadata?: {
    contentId?: string;
    projectId?: string;
    achievementId?: string;
    proposalId?: string;
  };
}

export interface RewardPool {
  id: string;
  name: string;
  totalAmount: number;
  distributedAmount: number;
  remainingAmount: number;
  startDate: Date;
  endDate: Date;
  distribution: {
    contributions: number;
    progress: number;
    voting: number;
    governance: number;
  };
}

export interface VotingAllocation {
  social: number;
  ecological: number;
  infrastructure: number;
  holistic: number;
}

class RewardDistributionService extends EventEmitterBrowser {
  private rewardEvents: Map<string, RewardEvent> = new Map();
  private rewardPools: Map<string, RewardPool> = new Map();
  private userBalances: Map<string, number> = new Map();
  private distributionInterval: number | null = null;

  constructor() {
    super();
    this.initializeRewardPools();
    this.startDistributionCycle();
  }

  private initializeRewardPools() {
    const currentPool: RewardPool = {
      id: `pool-${Date.now()}`,
      name: '12-Hour Distribution Pool',
      totalAmount: 0,
      distributedAmount: 0,
      remainingAmount: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 12 * 60 * 60 * 1000),
      distribution: {
        contributions: 0.5,
        progress: 0.1,
        voting: 0.2,
        governance: 0.2
      }
    };

    this.rewardPools.set(currentPool.id, currentPool);
  }

  private startDistributionCycle() {
    // Run distribution every 12 hours
    this.distributionInterval = window.setInterval(() => {
      this.distributePoolRewards();
    }, 12 * 60 * 60 * 1000);
  }

  public stopDistributionCycle() {
    if (this.distributionInterval) {
      window.clearInterval(this.distributionInterval);
      this.distributionInterval = null;
    }
  }

  private async distributePoolRewards() {
    const currentPool = Array.from(this.rewardPools.values())[0];
    const periodRevenue = await this.calculatePeriodRevenue();
    
    const newPool: RewardPool = {
      id: `pool-${Date.now()}`,
      name: '12-Hour Distribution Pool',
      totalAmount: periodRevenue,
      distributedAmount: 0,
      remainingAmount: periodRevenue,
      startDate: new Date(),
      endDate: new Date(Date.now() + 12 * 60 * 60 * 1000),
      distribution: currentPool.distribution
    };

    await Promise.all([
      this.distributeContributionRewards(newPool),
      this.distributeProgressRewards(newPool),
      this.distributeVotingTokens(newPool),
      this.distributeGovernanceRewards(newPool)
    ]);

    this.archivePool(currentPool.id);
    this.rewardPools.set(newPool.id, newPool);

    this.emit('distributionCompleted', {
      poolId: newPool.id,
      totalDistributed: newPool.distributedAmount,
      timestamp: new Date()
    });
  }

  private async calculatePeriodRevenue(): Promise<number> {
    // Mock implementation - replace with actual calculation
    return 100000;
  }

  private async distributeContributionRewards(pool: RewardPool) {
    const contributionAmount = pool.totalAmount * pool.distribution.contributions;
    const contributors = await this.getActiveContributors();
    
    for (const contributor of contributors) {
      const reward = this.calculateContributorReward(contributor);
      await this.distributeReward({
        id: `reward-${Date.now()}-${contributor.id}`,
        userId: contributor.id,
        type: 'contribution',
        amount: reward,
        timestamp: new Date()
      });
    }
  }

  private async getActiveContributors() {
    // Mock implementation - replace with actual data fetch
    return [{ id: 'user1', contributions: 10 }, { id: 'user2', contributions: 5 }];
  }

  private calculateContributorReward(contributor: { id: string; contributions: number }) {
    // Mock implementation - replace with actual calculation
    return contributor.contributions * 100;
  }

  private async distributeReward(event: RewardEvent) {
    this.rewardEvents.set(event.id, event);
    const currentBalance = this.userBalances.get(event.userId) || 0;
    this.userBalances.set(event.userId, currentBalance + event.amount);
    this.emit('rewardDistributed', event);
  }

  private archivePool(poolId: string) {
    // Mock implementation - replace with actual archiving logic
    this.rewardPools.delete(poolId);
  }

  // Public methods for external use
  public getUserBalance(userId: string): number {
    return this.userBalances.get(userId) || 0;
  }

  public getUserRewards(userId: string): RewardEvent[] {
    return Array.from(this.rewardEvents.values())
      .filter(event => event.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  public getCurrentPool(): RewardPool | undefined {
    return Array.from(this.rewardPools.values())[0];
  }
}

export const rewardDistributionService = new RewardDistributionService();