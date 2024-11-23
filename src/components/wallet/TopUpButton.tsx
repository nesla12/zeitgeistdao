import React, { useState } from 'react';
import { Plus, CreditCard, Landmark, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TopUpMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

function TopUpButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const topUpMethods: TopUpMethod[] = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Instant top-up with any card'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <Landmark className="w-5 h-5" />,
      description: 'Direct bank transfer (1-3 days)'
    },
    {
      id: 'crypto',
      name: 'Crypto Transfer',
      icon: <Wallet className="w-5 h-5" />,
      description: 'Transfer from external wallet'
    }
  ];

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsModalOpen(true)}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Top Up</span>
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Up Your Wallet</h2>
                <p className="text-gray-600 mb-6">Choose your preferred top-up method:</p>
                
                <div className="space-y-4">
                  {topUpMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center p-4 border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
                    >
                      <div className="p-2 bg-purple-100 rounded-lg">
                        {method.icon}
                      </div>
                      <div className="ml-4 text-left">
                        <h3 className="font-medium text-gray-900">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-6 w-full px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default TopUpButton;