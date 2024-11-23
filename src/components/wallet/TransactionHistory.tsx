import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface Transaction {
  type: 'Received' | 'Sent';
  amount: string;
  from: string;
  timestamp: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  selectedAsset: string;
  onAssetChange: (asset: string) => void;
}

function TransactionHistory({ transactions, selectedAsset, onAssetChange }: TransactionHistoryProps) {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedAsset}
            onChange={(e) => onAssetChange(e.target.value)}
            className="px-3 py-1 border rounded-lg text-sm"
          >
            <option value="all">All Assets</option>
            <option value="ETH">Ethereum</option>
            <option value="SOL">Solana</option>
            <option value="ECO">EcoToken</option>
            <option value="VOTE">VoteToken</option>
          </select>
          <button className="text-purple-600 hover:text-purple-700 text-sm">
            Export CSV
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {transactions.map((tx, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {tx.type === 'Received' ? 
                <ArrowDownLeft className="h-5 w-5 text-emerald-500" /> :
                <ArrowUpRight className="h-5 w-5 text-red-500" />
              }
              <div>
                <p className="font-medium text-gray-900">{tx.from}</p>
                <p className="text-sm text-gray-500">{tx.timestamp}</p>
              </div>
            </div>
            <span className={`font-medium ${
              tx.type === 'Received' ? 'text-emerald-500' : 'text-red-500'
            }`}>{tx.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionHistory;