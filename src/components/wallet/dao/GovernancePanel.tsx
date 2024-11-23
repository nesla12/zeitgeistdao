import React, { useState } from 'react';
import { Vote, Shield, Users, Scale, ChevronRight, TrendingUp, Coins } from 'lucide-react';
import { motion } from 'framer-motion';
import ProposalList from './ProposalList';
import VotingPower from './VotingPower';
import TreasuryStats from './TreasuryStats';
import DelegationPanel from './DelegationPanel';

function GovernancePanel() {
  const [activeTab, setActiveTab] = useState<'proposals' | 'treasury' | 'delegation'>('proposals');

  const stats = {
    totalStaked: '2.5M ZTG',
    activeProposals: 12,
    voterParticipation: '68%',
    treasuryBalance: '5.2M ZTG'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-6 h-6 text-purple-600" />
            <span className="text-sm text-green-600">+5.2% this month</span>
          </div>
          <p className="text-sm text-gray-600">Total Staked</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalStaked}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Vote className="w-6 h-6 text-blue-600" />
            <span className="text-sm text-blue-600">12 active</span>
          </div>
          <p className="text-sm text-gray-600">Active Proposals</p>
          <p className="text-2xl font-bold text-gray-900">{stats.activeProposals}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-6 h-6 text-green-600" />
            <span className="text-sm text-green-600">+2.3% this week</span>
          </div>
          <p className="text-sm text-gray-600">Voter Participation</p>
          <p className="text-2xl font-bold text-gray-900">{stats.voterParticipation}</p>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg">
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
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeTab === 'proposals' && <ProposalList />}
          {activeTab === 'treasury' && <TreasuryStats />}
          {activeTab === 'delegation' && <DelegationPanel />}
        </div>
        <div>
          <VotingPower />
        </div>
      </div>
    </div>
  );
}

export default GovernancePanel;