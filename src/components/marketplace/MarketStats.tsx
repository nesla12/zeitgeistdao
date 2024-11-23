import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Package, Users } from 'lucide-react';
import type { MarketStats } from '../../services/MarketplaceService';

interface MarketStatsProps {
  stats: MarketStats | null;
  loading: boolean;
}

function MarketStats({ stats, loading }: MarketStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
            <div className="h-8 w-8 bg-gray-200 rounded-lg mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statItems = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "Trading Volume",
      value: stats.tradingVolume,
      trend: "+12.5% this month"
    },
    {
      icon: <Package className="w-8 h-8 text-purple-500" />,
      title: "Active Listings",
      value: stats.activeListings,
      trend: "Growing daily"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-blue-500" />,
      title: "Fee Pool",
      value: stats.feePool,
      trend: "Distributed weekly"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {statItems.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-start justify-between mb-4">
            {item.icon}
            <span className="text-sm text-green-600">{item.trend}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
          <p className="text-2xl font-bold text-gray-900">{item.value}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default MarketStats;