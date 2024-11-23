import { BigNumber } from '@ethersproject/bignumber';

export interface WalletBalance {
  tokens: number;
  rewards: number;
  votePower: number;
}

export interface Transaction {
  type: 'Received' | 'Sent';
  amount: string;
  from: string;
  timestamp: string;
}

export class WalletService {
  // Simulated wallet data for now, will be connected to blockchain later
  async getBalance(): Promise<WalletBalance> {
    return {
      tokens: 2458.32,
      rewards: 145.20,
      votePower: 320
    };
  }

  async getTransactions(): Promise<Transaction[]> {
    return [
      {
        type: 'Received',
        amount: '+45.32',
        from: 'Marketplace Fees',
        timestamp: '2h ago'
      },
      {
        type: 'Sent',
        amount: '-120.00',
        from: 'Project Vote',
        timestamp: '5h ago'
      },
      {
        type: 'Received',
        amount: '+89.21',
        from: 'Ad Revenue Share',
        timestamp: '12h ago'
      }
    ];
  }

  async getDistributionData() {
    return {
      users: { percentage: 50, amount: 2450.00 },
      projectVotes: { percentage: 30, amount: 1470.00 },
      platform: { percentage: 20, amount: 980.00 }
    };
  }
}

export const walletService = new WalletService();