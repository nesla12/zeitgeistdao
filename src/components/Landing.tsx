import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Heart, Leaf, ChevronRight, ArrowRight, MessageCircle } from 'lucide-react';
import PageTransition from './shared/PageTransition';
import SearchDialog from './shared/SearchDialog';
import GetStartedDialog from './shared/GetStartedDialog';
import PlatformMetrics from './shared/PlatformMetrics';
import AIChat from './shared/AIChat';

function Landing() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Transform the World Through Conscious Action
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join our community of changemakers using blockchain technology to create 
              positive impact and foster collective wisdom.
            </p>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsGetStartedOpen(true)}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <span>Start Your Journey</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <Link
                  to="/impact"
                  className="text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center space-x-2"
                >
                  <span>Explore Impact</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <button
                onClick={() => setIsAIChatOpen(true)}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 px-6 py-2 rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Ask AI Guide</span>
              </button>
            </div>
          </div>
        </div>

        {/* Platform Metrics */}
        <PlatformMetrics />

        {/* Core Values */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Brain className="w-12 h-12 text-green-500" />,
                title: "Conscious Evolution",
                description: "Foster personal and collective growth through wisdom and awareness"
              },
              {
                icon: <Heart className="w-12 h-12 text-purple-500" />,
                title: "Community Connection",
                description: "Build meaningful relationships and support collective wellbeing"
              },
              {
                icon: <Leaf className="w-12 h-12 text-blue-500" />,
                title: "Environmental Stewardship",
                description: "Protect and regenerate Earth's ecosystems for future generations"
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-full bg-${index === 0 ? 'green' : index === 1 ? 'purple' : 'blue'}-100`}>
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <GetStartedDialog isOpen={isGetStartedOpen} onClose={() => setIsGetStartedOpen(false)} />
      <AIChat isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </PageTransition>
  );
}

export default Landing;