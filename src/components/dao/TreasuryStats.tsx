import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ArrowUpRight, ArrowDownRight, PieChart } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import useTreasury from '../../hooks/dao/useTreasury';

function TreasuryStats() {
  const { stats } = useTreasury();

  if (!stats) return null;

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Treasury Balance',
        data: [4.2, 4.5, 4.8, 5.0, 5.1, 5.2],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Treasury Overview */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-6 h-6 text-purple-600" />
            <span className="text-sm text-green-600">+5.2% this month</span>
          </div>
          <p className="text-sm text-gray-600">Total Balance</p>
          <p className="text-2xl font-bold text-gray-900">{stats.balance}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <ArrowUpRight className="w-6 h-6 text-green-600" />
            <span className="text-sm text-green-600">+12% vs last month</span>
          </div>
          <p className="text-sm text-gray-600">Monthly Inflow</p>
          <p className="text-2xl font-bold text-gray-900">{stats.monthlyInflow}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <ArrowDownRight className="w-6 h-6 text-red-600" />
            <span className="text-sm text-red-600">+8% vs last month</span>
          </div>
          <p className="text-sm text-gray-600">Monthly Outflow</p>
          <p className="text-2xl font-bold text-gray-900">{stats.monthlyOutflow}</p>
        </div>
      </div>

      {/* Treasury Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Treasury Growth</h3>
        <div className="h-64">
          <Line data={chartData} options={options} />
        </div>
      </div>

      {/* Distribution Breakdown */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Distribution Breakdown</h3>
          <PieChart className="w-5 h-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          {Object.entries(stats.distribution).map(([category, percentage]) => (
            <div key={category}>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 capitalize">{category}</span>
                <span className="font-medium text-gray-900">{percentage}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-full rounded-full ${
                    category === 'rewards' ? 'bg-purple-600' :
                    category === 'development' ? 'bg-blue-600' :
                    category === 'community' ? 'bg-green-600' :
                    'bg-amber-600'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TreasuryStats;