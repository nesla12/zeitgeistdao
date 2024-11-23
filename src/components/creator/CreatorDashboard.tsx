import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Star, BarChart2, Settings, Plus } from 'lucide-react';
import CreatorMetrics from './CreatorMetrics';
import ContentManager from './ContentManager';
import EarningsPanel from './EarningsPanel';
import AnalyticsPanel from './AnalyticsPanel';
import CreateContentDialog from './CreateContentDialog';

function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'earnings' | 'analytics'>('overview');
  const [isCreateContentOpen, setIsCreateContentOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Creator Dashboard</h1>
          <p className="text-gray-600">Manage your content and track your impact</p>
        </div>
        <button
          onClick={() => setIsCreateContentOpen(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Content</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            activeTab === 'overview'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span>Overview</span>
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            activeTab === 'content'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Star className="w-5 h-5" />
          <span>Content</span>
        </button>
        <button
          onClick={() => setActiveTab('earnings')}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            activeTab === 'earnings'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <DollarSign className="w-5 h-5" />
          <span>Earnings</span>
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            activeTab === 'analytics'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <BarChart2 className="w-5 h-5" />
          <span>Analytics</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {activeTab === 'overview' && (
          <>
            <CreatorMetrics />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <EarningsPanel />
              <AnalyticsPanel />
            </div>
          </>
        )}
        {activeTab === 'content' && <ContentManager />}
        {activeTab === 'earnings' && <EarningsPanel detailed />}
        {activeTab === 'analytics' && <AnalyticsPanel detailed />}
      </div>

      {/* Create Content Dialog */}
      <CreateContentDialog
        isOpen={isCreateContentOpen}
        onClose={() => setIsCreateContentOpen(false)}
      />
    </div>
  );
}

export default CreatorDashboard;