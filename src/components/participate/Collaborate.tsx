import React from 'react';
import { Users, Heart, Target, Star, ArrowRight, Globe, Clock, Gift } from 'lucide-react';
import PageTransition from '../shared/PageTransition';

function Collaborate() {
  const opportunities = [
    {
      id: '1',
      title: 'Community Ambassador',
      description: 'Help grow and nurture our conscious community',
      commitment: '5-10 hours/week',
      rewards: '500 ECO/month',
      skills: ['Community Building', 'Communication', 'Leadership'],
      icon: <Users className="w-8 h-8 text-purple-600" />
    },
    {
      id: '2',
      title: 'Content Creator',
      description: 'Create engaging content about consciousness and sustainability',
      commitment: 'Flexible',
      rewards: 'Per contribution',
      skills: ['Writing', 'Content Creation', 'Research'],
      icon: <Star className="w-8 h-8 text-blue-600" />
    },
    {
      id: '3',
      title: 'Project Lead',
      description: 'Lead impactful community projects',
      commitment: '10-15 hours/week',
      rewards: '1000 ECO/month',
      skills: ['Project Management', 'Leadership', 'Organization'],
      icon: <Target className="w-8 h-8 text-green-600" />
    }
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Collaborate With Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our mission to evolve consciousness through technology and community
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-purple-50 p-6 rounded-xl">
            <Users className="w-8 h-8 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">150+</h2>
            <p className="text-gray-600">Active Contributors</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl">
            <Globe className="w-8 h-8 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">28</h2>
            <p className="text-gray-600">Countries Represented</p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl">
            <Heart className="w-8 h-8 text-green-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">45K</h2>
            <p className="text-gray-600">Community Impact</p>
          </div>
        </div>

        {/* Opportunities */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-4">{opportunity.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {opportunity.title}
              </h3>
              <p className="text-gray-600 mb-4">{opportunity.description}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{opportunity.commitment}</span>
                </div>
                <div className="flex items-center text-sm text-purple-600">
                  <Gift className="w-4 h-4 mr-2" />
                  <span>{opportunity.rewards}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {opportunity.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Join the Community</h3>
              <p className="text-gray-600">Connect with like-minded individuals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Your Path</h3>
              <p className="text-gray-600">Find opportunities that match your skills</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Make an Impact</h3>
              <p className="text-gray-600">Contribute to meaningful projects</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Collaborate;