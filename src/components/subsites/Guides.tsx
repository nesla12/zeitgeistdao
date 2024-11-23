import React from 'react';
import { BookOpen, Star, Clock, Users } from 'lucide-react';
import PageTransition from '../shared/PageTransition';

function Guides() {
  const guides = [
    {
      title: "Getting Started with ZEITGEIST",
      description: "A comprehensive guide to begin your journey",
      category: "Beginner",
      duration: "15 min",
      author: "ZEITGEIST Team",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=500&q=80"
    },
    {
      title: "Advanced Platform Features",
      description: "Deep dive into platform capabilities",
      category: "Advanced",
      duration: "30 min",
      author: "Tech Team",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&q=80"
    }
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Platform Guides</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how to make the most of ZEITGEIST with our comprehensive guides
          </p>
        </div>

        {/* Guide Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-purple-50 p-6 rounded-xl">
            <BookOpen className="w-8 h-8 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Beginner Guides</h2>
            <p className="text-gray-600">Start your journey here</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl">
            <Star className="w-8 h-8 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Best Practices</h2>
            <p className="text-gray-600">Optimize your experience</p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl">
            <Users className="w-8 h-8 text-green-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Community Guides</h2>
            <p className="text-gray-600">Learn from the community</p>
          </div>
        </div>

        {/* Guide List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                    {guide.category}
                  </span>
                  <span className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {guide.duration}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-gray-600 mb-4">{guide.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">By {guide.author}</span>
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    Read Guide
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

export default Guides;