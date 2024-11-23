import React, { useState } from 'react';
import { Plus, Search, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Currency {
  symbol: string;
  name: string;
  network: string;
  popular: boolean;
}

function AddCurrencyButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currencies: Currency[] = [
    { symbol: 'BTC', name: 'Bitcoin', network: 'Bitcoin', popular: true },
    { symbol: 'ETH', name: 'Ethereum', network: 'Ethereum', popular: true },
    { symbol: 'SOL', name: 'Solana', network: 'Solana', popular: true },
    { symbol: 'USDC', name: 'USD Coin', network: 'Multi-chain', popular: true },
    { symbol: 'MATIC', name: 'Polygon', network: 'Polygon', popular: false },
    { symbol: 'DOT', name: 'Polkadot', network: 'Polkadot', popular: false },
    { symbol: 'AVAX', name: 'Avalanche', network: 'Avalanche', popular: false }
  ];

  const filteredCurrencies = currencies.filter(currency =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsModalOpen(true)}
        className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors flex items-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Add Currency</span>
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40" 
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Currency</h2>
                
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search currencies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Popular Currencies */}
                {searchQuery === '' && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-3">Popular Currencies</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {currencies.filter(c => c.popular).map((currency) => (
                        <button
                          key={currency.symbol}
                          className="flex items-center space-x-2 p-3 border rounded-lg hover:border-purple-500 hover:bg-purple-50"
                        >
                          <Star className="w-4 h-4 text-yellow-500" />
                          <div className="text-left">
                            <div className="font-medium text-gray-900">{currency.symbol}</div>
                            <div className="text-xs text-gray-500">{currency.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Currencies */}
                <div className="max-h-60 overflow-y-auto">
                  <div className="space-y-2">
                    {filteredCurrencies.map((currency) => (
                      <button
                        key={currency.symbol}
                        className="w-full flex items-center justify-between p-3 border rounded-lg hover:border-purple-500 hover:bg-purple-50"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <span className="font-medium text-purple-600">{currency.symbol}</span>
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-900">{currency.name}</div>
                            <div className="text-xs text-gray-500">{currency.network}</div>
                          </div>
                        </div>
                        <Plus className="w-5 h-5 text-purple-600" />
                      </button>
                    ))}
                  </div>
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

export default AddCurrencyButton;