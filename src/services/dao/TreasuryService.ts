import { EventEmitter } from 'events';

export interface TreasuryStats {
  balance: string;
  monthlyInflow: string;
  monthlyOutflow: string;
  distribution: {
    rewards: number;
    development: number;
    community: number;
    reserve: number;
  };
}

export interface TreasuryTransaction {
  id: string;
  type: 'inflow' | 'outflow';
  amount: string;
  category: keyof TreasuryStats['distribution'];
  description: string;
  timestamp: Date;
}

class TreasuryService extends EventEmitter {
  private stats: TreasuryStats = {
    balance: '5.2M ZTG',
    monthlyInflow: '+320K ZTG',
    monthlyOutflow: '-180K ZTG',
    distribution: {
      rewards: 45,
      development: 25,
      community: 20,
      reserve: 10
    }
  };

  private transactions: TreasuryTransaction[] = [];

  async getTreasuryStats(): Promise<TreasuryStats> {
    return this.stats;
  }

  async getTransactions(
    startDate?: Date,
    endDate?: Date,
    category?: keyof TreasuryStats['distribution']
  ): Promise<TreasuryTransaction[]> {
    let filtered = this.transactions;

    if (startDate) {
      filtered = filtered.filter(tx => tx.timestamp >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter(tx => tx.timestamp <= endDate);
    }

    if (category) {
      filtered = filtered.filter(tx => tx.category === category);
    }

    return filtered;
  }

  async createTransaction(
    type: 'inflow' | 'outflow',
    amount: string,
    category: keyof TreasuryStats['distribution'],
    description: string
  ): Promise<TreasuryTransaction> {
    const transaction: TreasuryTransaction = {
      id: Date.now().toString(),
      type,
      amount,
      category,
      description,
      timestamp: new Date()
    };

    this.transactions.push(transaction);
    this.emit('transactionCreated', transaction);
    return transaction;
  }

  async updateDistribution(
    newDistribution: TreasuryStats['distribution']
  ): Promise<void> {
    // Validate distribution percentages sum to 100
    const total = Object.values(newDistribution).reduce((sum, value) => sum + value, 0);
    if (total !== 100) {
      throw new Error('Distribution percentages must sum to 100');
    }

    this.stats.distribution = newDistribution;
    this.emit('distributionUpdated', newDistribution);
  }

  onTransactionCreated(callback: (transaction: TreasuryTransaction) => void) {
    this.on('transactionCreated', callback);
    return () => this.off('transactionCreated', callback);
  }

  onDistributionUpdated(callback: (distribution: TreasuryStats['distribution']) => void) {
    this.on('distributionUpdated', callback);
    return () => this.off('distributionUpdated', callback);
  }
}

export const treasuryService = new TreasuryService();