import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import PageTransition from '../shared/PageTransition';

function Privacy() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            How we protect and handle your data
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          {/* Introduction */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Data Protection</h2>
            </div>
            <p className="text-gray-600">
              At ZEITGEIST, we take your privacy seriously. This policy outlines how we collect,
              use, and protect your personal information when you use our platform.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Account Information</h3>
                <p className="text-gray-600">
                  When you create an account, we collect basic information such as your email,
                  username, and wallet address.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Usage Data</h3>
                <p className="text-gray-600">
                  We collect data about how you interact with our platform to improve our services
                  and user experience.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Transaction Information</h3>
                <p className="text-gray-600">
                  Information about your transactions and interactions within the marketplace.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Data Security</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We implement robust security measures to protect your data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>End-to-end encryption for sensitive data</li>
              <li>Regular security audits and updates</li>
              <li>Secure blockchain infrastructure</li>
              <li>Multi-factor authentication options</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
            </div>
            <p className="text-gray-600 mb-4">
              If you have any questions about our privacy policy, please contact us:
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-purple-600">privacy@zeitgeist.ai</p>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

export default Privacy;