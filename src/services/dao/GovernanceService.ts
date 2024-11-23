import { EventEmitter } from 'events';

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

class GovernanceService extends EventEmitter {
  private proposals: Map<string, Proposal> = new Map();
  private delegates: Map<string, Delegate> = new Map();
  private votingStats: Map<string, VotingStats> = new Map();

  constructor() {
    super();
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock proposals
    const mockProposal: Proposal = {
      id: '1',
      title: 'Increase Reward Distribution',
      description: 'Proposal to increase reward allocation for content creators',
      status: 'active',
      votes: {
        for: 234567,
        against: 45678,
        participation: 68
      },
      timeLeft: '2 days',
      creator: {
        name: 'Sarah Chen',
        avatar: 'https://example.com/avatar.jpg'
      }
    };

    this.proposals.set(mockProposal.id, mockProposal);

    // Mock delegates
    const mockDelegate: Delegate = {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://example.com/avatar.jpg',
      votingPower: '234.5K VP',
      delegators: 156,
      proposals: 12,
      participation: '98%'
    };

    this.delegates.set(mockDelegate.id, mockDelegate);

    // Mock voting stats
    const mockStats: VotingStats = {
      totalPower: '12,345 VP',
      stakedTokens: '5,000 ZTG',
      delegatedPower: '2,345 VP',
      lockPeriod: '6 months',
      multiplier: '1.5x'
    };

    this.votingStats.set('current-user', mockStats);
  }

  async getProposals(): Promise<Proposal[]> {
    return Array.from(this.proposals.values());
  }

  async getProposal(id: string): Promise<Proposal | null> {
    return this.proposals.get(id) || null;
  }

  async createProposal(proposal: Omit<Proposal, 'id'>): Promise<Proposal> {
    const id = Date.now().toString();
    const newProposal = { id, ...proposal };
    this.proposals.set(id, newProposal);
    this.emit('proposalCreated', newProposal);
    return newProposal;
  }

  async vote(proposalId: string, vote: 'for' | 'against'): Promise<void> {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) throw new Error('Proposal not found');

    if (vote === 'for') {
      proposal.votes.for += 1;
    } else {
      proposal.votes.against += 1;
    }

    proposal.votes.participation = Math.round(
      ((proposal.votes.for + proposal.votes.against) / 1000000) * 100
    );

    this.proposals.set(proposalId, proposal);
    this.emit('voted', { proposalId, vote });
  }

  async getDelegates(): Promise<Delegate[]> {
    return Array.from(this.delegates.values());
  }

  async delegate(delegateId: string, amount: number): Promise<void> {
    const delegate = this.delegates.get(delegateId);
    if (!delegate) throw new Error('Delegate not found');

    delegate.delegators += 1;
    this.delegates.set(delegateId, delegate);
    this.emit('delegated', { delegateId, amount });
  }

  async getVotingStats(userId: string): Promise<VotingStats | null> {
    return this.votingStats.get(userId) || null;
  }

  onProposalCreated(callback: (proposal: Proposal) => void) {
    this.on('proposalCreated', callback);
    return () => this.off('proposalCreated', callback);
  }

  onVoted(callback: (data: { proposalId: string; vote: 'for' | 'against' }) => void) {
    this.on('voted', callback);
    return () => this.off('voted', callback);
  }

  onDelegated(callback: (data: { delegateId: string; amount: number }) => void) {
    this.on('delegated', callback);
    return () => this.off('delegated', callback);
  }
}

export const governanceService = new GovernanceService();