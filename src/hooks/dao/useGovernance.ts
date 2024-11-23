import { useState, useEffect } from 'react';
import { governanceService, Proposal, VotingStats, Delegate } from '../../services/dao/GovernanceService';

export function useGovernance() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [votingStats, setVotingStats] = useState<VotingStats | null>(null);
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [proposalsData, statsData, delegatesData] = await Promise.all([
          governanceService.getProposals(),
          governanceService.getVotingStats('current-user'),
          governanceService.getDelegates()
        ]);

        setProposals(proposalsData);
        setVotingStats(statsData);
        setDelegates(delegatesData);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch governance data:', error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Subscribe to events
    const unsubscribeProposal = governanceService.onProposalCreated((proposal) => {
      setProposals(prev => [...prev, proposal]);
    });

    const unsubscribeVote = governanceService.onVoted(({ proposalId, vote }) => {
      setProposals(prev => prev.map(p => 
        p.id === proposalId
          ? {
              ...p,
              votes: {
                ...p.votes,
                [vote]: p.votes[vote] + 1,
                participation: Math.round(
                  ((p.votes.for + p.votes.against + 1) / 1000000) * 100
                )
              }
            }
          : p
      ));
    });

    return () => {
      unsubscribeProposal();
      unsubscribeVote();
    };
  }, []);

  const createProposal = async (proposal: Omit<Proposal, 'id'>) => {
    try {
      const newProposal = await governanceService.createProposal(proposal);
      setProposals(prev => [...prev, newProposal]);
      return newProposal;
    } catch (error) {
      console.error('Failed to create proposal:', error);
      throw error;
    }
  };

  const vote = async (proposalId: string, vote: 'for' | 'against') => {
    try {
      await governanceService.vote(proposalId, vote);
    } catch (error) {
      console.error('Failed to vote:', error);
      throw error;
    }
  };

  const delegate = async (delegateId: string, amount: number) => {
    try {
      await governanceService.delegate(delegateId, amount);
    } catch (error) {
      console.error('Failed to delegate:', error);
      throw error;
    }
  };

  return {
    proposals,
    votingStats,
    delegates,
    loading,
    error,
    createProposal,
    vote,
    delegate
  };
}

export default useGovernance;