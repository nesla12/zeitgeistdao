import React from 'react';
import { MessageCircle, Mail, Book, HelpCircle } from 'lucide-react';
import PageTransition from '../shared/PageTransition';

function Support() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get help with your ZEITGEIST experience
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h2>
            <p className="text-gray-600 mb-4">Get instant help from our team</p>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              Start Chat
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <Mail className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h2>
            <p className="text-gray-600 mb-4">Send us your questions</p>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              Contact Us
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <Book className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Knowledge Base</h2>
            <p className="text-gray-600 mb-4">Browse help articles</p>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              View Articles
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <HelpCircle className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Community Help</h2>
            <p className="text-gray-600 mb-4">Get help from the community</p>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              Join Forum
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "How do I get started?",
                answer: "Follow our quick start guide to begin your journey with ZEITGEIST."
              },
              {
                question: "How can I connect my wallet?",
                answer: "Click the Connect button in the top navigation and follow the prompts."
              },
              {
                question: "What are consciousness tokens?",
                answer: "Consciousness tokens are our platform's currency for rewarding positive impact."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Support;