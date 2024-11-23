import React, { useState } from 'react';
import { WalletIcon, Gift } from 'lucide-react';
import PageTransition from './shared/PageTransition';
import AssetCard from './wallet/AssetCard';
import TransactionHistory from './wallet/TransactionHistory';
import RewardDistribution from './wallet/RewardDistribution';
import SecuritySettings from './wallet/SecuritySettings';
import RewardSettings from './wallet/RewardSettings';
import TopUpButton from './wallet/TopUpButton';
import AddCurrencyButton from './wallet/AddCurrencyButton';
import ImpactProjects from './wallet/ImpactProjects';

function Wallet() {
  const [selectedAsset, setSelectedAsset] = useState('all');

  const assets = [
    { symbol: 'ETH', name: 'Ethereum', balance: '1.245', value: '2,458.32', change: '+12.5%' },
    { symbol: 'SOL', name: 'Solana', balance: '45.67', value: '892.45', change: '+8.3%' },
    { symbol: 'ECO', name: 'EcoToken', balance: '1,234', value: '1,234.00', change: '+15.2%' },
    { symbol: 'VOTE', name: 'VoteToken', balance: '500', value: '500.00', change: '+5.5%' }
  ];

  const transactions = [
    {
      type: 'Received',
      amount: '+45.32 ECO',
      from: 'Marketplace Fees',
      timestamp: '2h ago'
    },
    {
      type: 'Sent',
      amount: '-120.00 VOTE',
      from: 'Project Vote',
      timestamp: '5h ago'
    },
    {
      type: 'Received',
      amount: '+89.21 ECO',
      from: 'Ad Revenue Share',
      timestamp: '12h ago'
    }
  ];

  const handleSend = (asset: string) => {
    // Implement send functionality
    console.log(`Send ${asset}`);
  };

  const handleReceive = (asset: string) => {
    // Implement receive functionality
    console.log(`Receive ${asset}`);
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Platform Wallet</h1>
            <p className="text-lg text-gray-600">Manage your assets and track platform rewards</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <AddCurrencyButton />
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200">
              <Gift className="w-5 h-5" />
              <span>Claim Rewards</span>
            </button>
            <TopUpButton />
          </div>
        </div>

        {/* Asset Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assets.map((asset) => (
            <AssetCard 
              key={asset.symbol} 
              {...asset} 
              onSend={() => handleSend(asset.symbol)}
              onReceive={() => handleReceive(asset.symbol)}
            />
          ))}
        </div>

        {/* Transaction History & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <TransactionHistory
            transactions={transactions}
            selectedAsset={selectedAsset}
            onAssetChange={setSelectedAsset}
          />
          <RewardDistribution />
        </div>

        {/* Impact Projects */}
        <ImpactProjects />

        {/* Security & Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SecuritySettings />
          <RewardSettings />
        </div>
      </div>
    </PageTransition>
  );
}

export default Wallet;