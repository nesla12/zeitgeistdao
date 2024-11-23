import React from 'react';
import { Book, Search, ArrowRight, FileText, Code, HelpCircle } from 'lucide-react';
import PageTransition from '../shared/PageTransition';

function Documentation() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about ZEITGEIST platform features and APIs
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Documentation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Book className="w-8 h-8 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Getting Started</h2>
            <p className="text-gray-600 mb-4">Learn the basics and set up your environment</p>
            <button className="text-purple-600 hover:text-purple-700 flex items-center">
              Learn More <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Code className="w-8 h-8 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">API Reference</h2>
            <p className="text-gray-600 mb-4">Detailed API documentation and examples</p>
            <button className="text-purple-600 hover:text-purple-700 flex items-center">
              Explore APIs <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <FileText className="w-8 h-8 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Tutorials</h2>
            <p className="text-gray-600 mb-4">Step-by-step guides for common tasks</p>
            <button className="text-purple-600 hover:text-purple-700 flex items-center">
              View Tutorials <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <HelpCircle className="w-6 h-6 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I get started?</h3>
              <p className="text-gray-600">Follow our quick start guide to begin your journey.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <HelpCircle className="w-6 h-6 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Where can I get help?</h3>
              <p className="text-gray-600">Join our community or contact support for assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Documentation;