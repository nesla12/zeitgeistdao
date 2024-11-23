import React from 'react';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface EarningsPanelProps {
  detailed?: boolean;
}

function EarningsPanel({ detailed = false }: EarningsPanelProps) {
  const earnings = {
    total: 2458.32,
    pending: 450.00,
    lastPayout: 2008.32,
    nextPayout: '2024-03-31',
    history: [
      {
        id: '1',
        date: '2024-03-15',
        amount: 450.00,
        type: 'Content Revenue',
        status: 'pending'
      },
      {
        id: '2',
        date: '2024-03-01',
        amount: 2008.32,
        type: 'Monthly Payout',
        status: 'completed'
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Earnings</h2>
        {detailed && (
          <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center space-x-2 text-purple-600 mb-1">
            <DollarSign className="w-5 h-5" />
            <span className="font-medium">Total Earnings</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">${earnings.total.toFixed(2)}</span>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2 text-green-600 mb-1">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Pending</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">${earnings.pending.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Next Payout Date</span>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{earnings.nextPayout}</span>
          </div>
        </div>

        {detailed && (
          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-4">Transaction History</h3>
            <div className="space-y-4">
              {earnings.history.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900">{transaction.type}</div>
                    <div className="text-sm text-gray-600">{transaction.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      ${transaction.amount.toFixed(2)}
                    </div>
                    <div className={`text-sm ${
                      transaction.status === 'completed' ? 'text-green-600' : 'text-amber-600'
                    }`}>
                      {transaction.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EarningsPanel;