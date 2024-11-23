import React, { useState } from 'react';
import { Globe, Brain, Heart, Users } from 'lucide-react';
import PageTransition from './shared/PageTransition';
import TabButton from './shared/TabButton';
import PersonalImpact from './impact/PersonalImpact';
import ConsciousnessMetrics from './impact/ConsciousnessMetrics';
import DailyPractices from './impact/DailyPractices';
import WisdomCircle from './impact/WisdomCircle';
import ImpactGrowthTrend from './impact/ImpactGrowthTrend';
import CommunityMetrics from './impact/CommunityMetrics';
import { useImpact } from '../hooks/useImpact';

function Impact() {
  const [activeTab, setActiveTab] = useState('overview');
  const { metrics, events, loading } = useImpact();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'consciousness', label: 'Consciousness', icon: Brain },
    { id: 'practices', label: 'Practices', icon: Heart },
    { id: 'community', label: 'Community', icon: Users }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <PersonalImpact metrics={metrics} loading={loading} />
            <div className="mt-8">
              <ImpactGrowthTrend events={events} />
            </div>
          </>
        );
      case 'consciousness':
        return <ConsciousnessMetrics />;
      case 'practices':
        return <DailyPractices />;
      case 'community':
        return (
          <>
            <CommunityMetrics />
            <div className="mt-8">
              <WisdomCircle />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Impact & Transformation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore your journey of personal and collective transformation through conscious action and deep wisdom.
          </p>
        </header>

        <div className="flex space-x-4 mb-8">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>

        <div className="space-y-8">
          {renderContent()}
        </div>
      </div>
    </PageTransition>
  );
}

export default Impact;