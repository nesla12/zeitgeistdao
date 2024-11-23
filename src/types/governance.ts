export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'rejected' | 'canceled';
  votes: {
    for: number;
    against: number;
    participation: number;
  };
  timeLeft: string;
  creator: {
    name: string;
    avatar: string;
  };
  executionDate?: string;
  discussionUrl?: string;
}

export interface TreasuryDistribution {
  rewards: number;
  development: number;
  community: number;
  reserve: number;
}

export interface VotingStats {
  totalPower: string;
  stakedTokens: string;
  delegatedPower: string;
  lockPeriod: string;
  multiplier: string;
}

export interface Delegate {
  id: string;
  name: string;
  avatar: string;
  votingPower: string;
  delegators: number;
  proposals: number;
  participation: string;
  votingScore?: number;
}