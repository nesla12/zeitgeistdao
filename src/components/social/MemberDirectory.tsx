import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../shared/PageTransition';

function MemberDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  const members = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      role: 'Environmental Activist',
      location: 'Portland, OR',
      interests: ['Sustainability', 'Meditation', 'Community'],
      verified: true,
      level: 32,
      joinDate: 'March 2024'
    },
    {
      id: '2',
      name: 'David Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      role: 'Mindfulness Coach',
      location: 'Seattle, WA',
      interests: ['Meditation', 'Personal Growth', 'Teaching'],
      verified: true,
      level: 28,
      joinDate: 'February 2024'
    }
  ];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInterests = selectedInterests.length === 0 || 
                            member.interests.some(interest => selectedInterests.includes(interest));
    const matchesLocation = !selectedLocation || member.location.includes(selectedLocation);
    return matchesSearch && matchesInterests && matchesLocation;
  });

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Member Directory</h1>
            <p className="text-gray-600">Connect with conscious individuals in your community</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Locations</option>
              <option value="Portland">Portland</option>
              <option value="Seattle">Seattle</option>
            </select>
          </div>

          {/* Interest Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {['Meditation', 'Sustainability', 'Personal Growth', 'Community', 'Teaching'].map((interest) => (
              <button
                key={interest}
                onClick={() => {
                  if (selectedInterests.includes(interest)) {
                    setSelectedInterests(selectedInterests.filter(i => i !== interest));
                  } else {
                    setSelectedInterests([...selectedInterests, interest]);
                  }
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedInterests.includes(interest)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Member Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    {member.verified && (
                      <Shield className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{member.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-purple-600">Level {member.level}</div>
                  <div className="text-xs text-gray-500">Joined {member.joinDate}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {member.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  View Profile
                </button>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  Connect
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

export default MemberDirectory;