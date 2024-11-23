import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Users, Clock, ArrowLeft, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useGovernance from '../../../hooks/dao/useGovernance';

interface ProposalDetailsProps {
  proposalId: string;
}

function ProposalDetails({ proposalId }: ProposalDetailsProps) {
  const navigate = useNavigate();
  const { proposals, votingStats, vote } = useGovernance();
  const [isVoting, setIsVoting] = useState(false);
  const [showVoteConfirm, setShowVoteConfirm] = useState(false);
  const [voteType, setVoteType] = useState<'for' | 'against' | null>(null);

  const proposal = proposals.find(p => p.id === proposalId);

  if (!proposal) return null;

  const handleVote = async () => {
    if (!voteType || isVoting) return;
    setIsVoting(true);
    try {
      await vote(proposalId, voteType);
      setShowVoteConfirm(false);
    } catch (error) {
      console.error('Failed to vote:', error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-purple-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Proposals
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{proposal.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{proposal.timeLeft} left</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{proposal.votes.participation}% participation</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose max-w-none mb-8">
        <p className="text-gray-600">{proposal.description}</p>
      </div>

      {/* Voting Stats */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <ThumbsUp className="w-5 h-5 text-green-500" />
            <span className="text-lg font-medium text-gray-900">
              {proposal.votes.for.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium text-gray-900">
              {proposal.votes.against.toLocaleString()}
            </span>
            <ThumbsDown className="w-5 h-5 text-red-500" />
          </div>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{
              width: `${(proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Voting Actions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-blue-500" />
            <span className="text-blue-800">Your Voting Power: {votingStats?.totalPower}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              setVoteType('for');
              setShowVoteConfirm(true);
            }}
            className="flex items-center justify-center space-x-2 p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
          >
            <ThumbsUp className="w-5 h-5" />
            <span>Vote For</span>
          </button>
          <button
            onClick={() => {
              setVoteType('against');
              setShowVoteConfirm(true);
            }}
            className="flex items-center justify-center space-x-2 p-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
          >
            <ThumbsDown className="w-5 h-5" />
            <span>Vote Against</span>
          </button>
        </div>
      </div>

      {/* Vote Confirmation Modal */}
      {showVoteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Vote</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to vote {voteType === 'for' ? 'for' : 'against'} this proposal?
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowVoteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleVote}
                disabled={isVoting}
                className={`px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 ${
                  isVoting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isVoting ? 'Voting...' : 'Confirm Vote'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default ProposalDetails;