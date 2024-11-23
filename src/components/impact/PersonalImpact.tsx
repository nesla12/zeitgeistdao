import React from 'react';
import { TreePine, Users, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImpactMetric } from '../../services/ImpactService';

interface PersonalImpactProps {
  metrics: ImpactMetric[];
  loading: boolean;
}

function PersonalImpact({ metrics, loading }: PersonalImpactProps) {
  const impactMetrics = [
    {
      title: "Environmental Impact",
      icon: <TreePine className="w-6 h-6 text-emerald-500" />,
      description: "Your actions have helped:",
      items: [
        "Reduce carbon emissions by 2.5 tons",
        "Save 1,200 gallons of water",
        "Support 3 regenerative projects"
      ]
    },
    {
      title: "Social Impact",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      description: "Your community engagement:",
      items: [
        "Participated in 5 wisdom circles",
        "Mentored 2 community members",
        "Contributed to 3 collective decisions"
      ]
    },
    {
      title: "Investment Impact",
      icon: <DollarSign className="w-6 h-6 text-purple-500" />,
      description: "Your conscious investments:",
      items: [
        "75% in regenerative projects",
        "Supported 4 community initiatives",
        "Generated positive impact returns"
      ]
    }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {impactMetrics.map((metric, index) => (
          <ImpactCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
}

interface ImpactCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  items: string[];
}

function ImpactCard({ title, icon, description, items }: ImpactCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-50 rounded-lg p-4"
    >
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-gray-700 flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default PersonalImpact;