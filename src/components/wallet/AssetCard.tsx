import React from 'react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface AssetCardProps {
  symbol: string;
  name: string;
  balance: string;
  value: string;
  change: string;
  onSend: () => void;
  onReceive: () => void;
}

function AssetCard({ symbol, name, balance, value, change, onSend, onReceive }: AssetCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <CreditCard className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{symbol}</p>
          </div>
        </div>
        <span className={`text-sm ${
          change.startsWith('+') ? 'text-green-600' : 'text-red-600'
        }`}>{change}</span>
      </div>
      
      <div className="space-y-1 mb-4">
        <div className="text-2xl font-bold text-gray-900">${value}</div>
        <div className="text-sm text-gray-600">{balance} {symbol}</div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={onSend}
          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors text-sm"
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>Send</span>
        </button>
        <button
          onClick={onReceive}
          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors text-sm"
        >
          <ArrowDownLeft className="w-4 h-4" />
          <span>Receive</span>
        </button>
      </div>
    </motion.div>
  );
}

export default AssetCard;