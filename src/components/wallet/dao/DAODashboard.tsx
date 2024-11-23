import React, { useState } from 'react';
import { Shield, Vote, Scale, Users, TrendingUp, Coins } from 'lucide-react';
import PageTransition from '../../shared/PageTransition';
import ProposalList from './ProposalList';
import VotingPower from './VotingPower';
import TreasuryStats from './TreasuryStats';
import DelegationPanel from './DelegationPanel';
import CreateProposalDialog from './CreateProposalDialog';
import StakingPanel from './StakingPanel';

function DAODashboard() {
  const [activeTab, setActiveTab] = useState<'proposals' | 'treasury' | 'delegation' | 'staking'>('proposals');
  const [isCreateProposalOpen, setIsCreateProposalOpen] = useState(false);

  const stats = {
    totalStaked: '2.5M ZTG',
    activeProposals: 12,
    voterParticipation: '68%',
    treasuryBalance: '5.2M ZTG'
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Governance</h1>
            <p className="text-gray-600">Shape the future of our conscious community</p>
          </div>
          <button
            onClick={() => setIsCreateProposalOpen(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Vote className="w-5 h-5" />
            <span>Create Proposal</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-6 h-6 text-purple-600" />
              <span className="text-sm text-green-600">+5.2% this month</span>
            </div>
            <p className="text-sm text-gray-600">Total Staked</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalStaked}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Vote className="w-6 h-6 text-blue-600" />
              <span className="text-sm text-blue-600">12 active</span>
            </div>
            <p className="text-sm text-gray-600">Active Proposals</p>
            <p className="text-2xl font-bold text-gray-900">{stats.activeProposals}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-6 h-6 text-green-600" />
              <span className="text-sm text-green-600">+2.3% this week</span>
            </div>
            <p className="text-sm text-gray-600">Voter Participation</p>
            <p className="text-2xl font-bold text-gray-900">{stats.voterParticipation}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Coins className="w-6 h-6 text-amber-600" />
              <span className="text-sm text-green-600">+120K this month</span>
            </div>
            <p className="text-sm text-gray-600">Treasury Balance</p>
            <p className="text-2xl font-bold text-gray-900">{stats.treasuryBalance}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('proposals')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === 'proposals'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Vote className="w-5 h-5" />
            <span>Proposals</span>
          </button>
          <button
            onClick={() => setActiveTab('treasury')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === 'treasury'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Scale className="w-5 h-5" />
            <span>Treasury</span>
          </button>
          <button
            onClick={() => setActiveTab('delegation')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === 'delegation'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Delegation</span>
          </button>
          <button
            onClick={() => setActiveTab('staking')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === 'staking'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Staking</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'proposals' && <ProposalList />}
            {activeTab === 'treasury' && <TreasuryStats />}
            {activeTab === 'delegation' && <DelegationPanel />}
            {activeTab === 'staking' && <StakingPanel />}
          </div>
          <div>
            <VotingPower />
          </div>
        </div>

        {/* Create Proposal Dialog */}
        <CreateProposalDialog
          isOpen={isCreateProposalOpen}
          onClose={() => setIsCreateProposalOpen(false)}
        />
      </div>
    </PageTransition>
  );
}

export default DAODashboard;