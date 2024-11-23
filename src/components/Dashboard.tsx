import React from 'react';
import { Brain, Heart, Users, TreePine } from 'lucide-react';

function Dashboard() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Consciousness Journey</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Track your growth across multiple dimensions of awareness and impact
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<Brain className="h-8 w-8 text-purple-500" />}
          title="Awareness Level"
          value="78%"
          subtitle="Holistic Understanding"
        />
        <MetricCard
          icon={<Heart className="h-8 w-8 text-rose-500" />}
          title="Emotional Intelligence"
          value="85%"
          subtitle="Relational Wisdom"
        />
        <MetricCard
          icon={<Users className="h-8 w-8 text-blue-500" />}
          title="Community Impact"
          value="92%"
          subtitle="Collective Wellbeing"
        />
        <MetricCard
          icon={<TreePine className="h-8 w-8 text-emerald-500" />}
          title="Environmental Harmony"
          value="88%"
          subtitle="Earth Connection"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <JourneyTimeline />
        <ImpactMap />
      </div>
    </div>
  );
}

function MetricCard({ icon, title, value, subtitle }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-transform hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        {icon}
        <span className="text-2xl font-bold text-gray-900">{value}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}

function JourneyTimeline() {
  const milestones = [
    { date: '2024-03-15', title: 'Started Meditation Practice', description: 'Daily mindfulness routine established' },
    { date: '2024-03-10', title: 'Community Project Launch', description: 'Initiated local sustainability program' },
    { date: '2024-03-05', title: 'Wisdom Circle Session', description: 'Deep dialogue on collective consciousness' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Growth Journey</h2>
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-emerald-500" />
            <div>
              <p className="text-sm text-gray-500">{milestone.date}</p>
              <h3 className="font-medium text-gray-900">{milestone.title}</h3>
              <p className="text-sm text-gray-600">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImpactMap() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Global Impact Visualization</h2>
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Interactive impact map coming soon</p>
      </div>
    </div>
  );
}

export default Dashboard;