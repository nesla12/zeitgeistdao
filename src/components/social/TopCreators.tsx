import React from 'react';
import { User } from 'lucide-react';

interface Creator {
  name: string;
  role: string;
  followers: number;
  following: number;
  avatar: string;
}

function TopCreators() {
  const creators: Creator[] = [
    {
      name: "Elena Woods",
      role: "Environmental Activist",
      followers: 1234,
      following: 89,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      name: "David Chen",
      role: "Sustainable Tech",
      followers: 982,
      following: 76,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
      name: "Sarah Miller",
      role: "Community Builder",
      followers: 1567,
      following: 92,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Creators</h2>
      <div className="space-y-6">
        {creators.map((creator, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-900">{creator.name}</h3>
                <p className="text-sm text-gray-600">{creator.role}</p>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                  <span>{creator.followers} followers</span>
                  <span>{creator.following} following</span>
                </div>
              </div>
            </div>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCreators;