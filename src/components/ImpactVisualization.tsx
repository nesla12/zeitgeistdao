import React from 'react';
import { Globe, Leaf, Users, TreePine } from 'lucide-react';

function ImpactVisualization() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Global Impact</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Visualize your contribution to planetary consciousness
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ImpactCard
          icon={<Globe className="h-8 w-8 text-blue-500" />}
          title="Global Reach"
          value="28"
          subtitle="Countries Impacted"
        />
        <ImpactCard
          icon={<Users className="h-8 w-8 text-purple-500" />}
          title="Lives Touched"
          value="1,234"
          subtitle="People Reached"
        />
        <ImpactCard
          icon={<Leaf className="h-8 w-8 text-emerald-500" />}
          title="Carbon Offset"
          value="45.2"
          subtitle="Tons CO2 Saved"
        />
        <ImpactCard
          icon={<TreePine className="h-8 w-8 text-green-500" />}
          title="Trees Planted"
          value="156"
          subtitle="Through Projects"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlobalMap />
        <ImpactTimeline />
      </div>
    </div>
  );
}

function ImpactCard({ icon, title, value, subtitle }: {
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

function GlobalMap() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Global Presence</h2>
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Interactive global impact map coming soon</p>
      </div>
    </div>
  );
}

function ImpactTimeline() {
  const events = [
    {
      date: "March 2024",
      title: "Community Garden Project",
      impact: "12 tons CO2 offset"
    },
    {
      date: "February 2024",
      title: "Consciousness Workshop",
      impact: "250 people reached"
    },
    {
      date: "January 2024",
      title: "Tree Planting Initiative",
      impact: "100 trees planted"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Impact Timeline</h2>
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-emerald-500" />
            <div>
              <p className="text-sm text-gray-500">{event.date}</p>
              <h3 className="font-medium text-gray-900">{event.title}</h3>
              <p className="text-sm text-emerald-600">{event.impact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImpactVisualization;