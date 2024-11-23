import React from 'react';
import { FileText, AlertCircle, Users, Scale } from 'lucide-react';
import PageTransition from '../shared/PageTransition';

function Terms() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">
            Please read these terms carefully before using our platform
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          {/* Agreement */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Scale className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">User Agreement</h2>
            </div>
            <p className="text-gray-600">
              By accessing or using ZEITGEIST, you agree to be bound by these Terms of Service
              and all applicable laws and regulations.
            </p>
          </section>

          {/* Platform Rules */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Platform Rules</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Account Responsibilities</h3>
                <p className="text-gray-600">
                  You are responsible for maintaining the security of your account and all
                  activities that occur under your account.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Content Guidelines</h3>
                <p className="text-gray-600">
                  Users must ensure all content posted follows our community guidelines and
                  respects intellectual property rights.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Transaction Rules</h3>
                <p className="text-gray-600">
                  All marketplace transactions must comply with our platform policies and
                  applicable laws.
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimers */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Disclaimers</h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <p className="text-gray-600">
                The platform is provided "as is" without warranties of any kind, either express
                or implied.
              </p>
              <p className="text-gray-600">
                We are not responsible for any losses or damages that may occur through the
                use of our platform.
              </p>
            </div>
          </section>

          {/* Updates */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Terms Updates</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We may update these terms from time to time. We will notify users of any
              significant changes.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-purple-600">Last updated: March 2024</p>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

export default Terms;