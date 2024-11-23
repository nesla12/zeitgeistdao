import React, { useState } from 'react';
import { BarChart2, TrendingUp, Users, Clock } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AnalyticsPanelProps {
  detailed?: boolean;
}

function AnalyticsPanel({ detailed = false }: AnalyticsPanelProps) {
  const [timeframe, setTimeframe] = useState('week');

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Views',
        data: [150, 230, 180, 290, 320, 250, 400],
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
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 4
      }
    },
    scales: {
      x: {
        type: 'category' as const,
        grid: {
          display: false
        }
      },
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>
        {detailed && (
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-1 border rounded-lg text-sm"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last Year</option>
          </select>
        )}
      </div>

      <div className="h-[300px] mb-6">
        <Line data={data} options={options} />
      </div>

      {detailed && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600 mb-1">
              <Users className="w-4 h-4" />
              <span>Total Views</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">1,820</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Engagement Rate</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">8.5%</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
              <span>Avg. View Time</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">4:32</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsPanel;