import React from 'react';
import { Calendar, Clock, Target, Award } from 'lucide-react';
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

interface PracticeStatsProps {
  practices: Array<{
    name: string;
    streak: number;
    totalMinutes: number;
  }>;
}

function PracticeStats({ practices }: PracticeStatsProps) {
  const totalMinutes = practices.reduce((acc, practice) => acc + practice.totalMinutes, 0);
  const averageStreak = Math.round(
    practices.reduce((acc, practice) => acc + practice.streak, 0) / practices.length
  );

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Practice Minutes',
        data: [45, 60, 75, 60, 90, 75, 60],
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
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center space-x-2 text-purple-600 mb-2">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Total Practice Time</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(totalMinutes / 60)} hours
          </div>
          <p className="text-sm text-gray-600">{totalMinutes} minutes</p>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center space-x-2 text-green-600 mb-2">
            <Target className="w-5 h-5" />
            <span className="font-medium">Average Streak</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {averageStreak} days
          </div>
          <p className="text-sm text-gray-600">Across all practices</p>
        </div>

        <div className="bg-orange-50 rounded-lg p-6">
          <div className="flex items-center space-x-2 text-orange-600 mb-2">
            <Award className="w-5 h-5" />
            <span className="font-medium">Consistency Score</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">92%</div>
          <p className="text-sm text-gray-600">Last 30 days</p>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-lg p-6 border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h3>
        <div className="h-64">
          <Line data={data} options={options} />
        </div>
      </div>

      {/* Practice Breakdown */}
      <div className="bg-white rounded-lg p-6 border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Breakdown</h3>
        <div className="space-y-4">
          {practices.map((practice) => (
            <div key={practice.name} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{practice.name}</h4>
                <p className="text-sm text-gray-600">
                  {Math.round(practice.totalMinutes / 60)} hours total
                </p>
              </div>
              <div className="text-right">
                <div className="font-medium text-purple-600">
                  {practice.streak} day streak
                </div>
                <p className="text-sm text-gray-600">
                  {practice.totalMinutes} minutes
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PracticeStats;