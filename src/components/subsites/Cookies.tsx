import React from 'react';
import { Cookie, Info, Settings, Shield } from 'lucide-react';
import PageTransition from '../shared/PageTransition';

function Cookies() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600">
            Understanding how we use cookies to improve your experience
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          {/* What are Cookies */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Info className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">What Are Cookies?</h2>
            </div>
            <p className="text-gray-600">
              Cookies are small text files that are placed on your device when you visit our
              website. They help us provide you with a better experience by remembering your
              preferences and understanding how you use our platform.
            </p>
          </section>

          {/* Types of Cookies */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Cookie className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Types of Cookies We Use</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Essential Cookies</h3>
                <p className="text-gray-600">
                  Required for basic platform functionality and security. These cannot be
                  disabled.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Performance Cookies</h3>
                <p className="text-gray-600">
                  Help us understand how visitors interact with our platform by collecting
                  anonymous information.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Functionality Cookies</h3>
                <p className="text-gray-600">
                  Remember your preferences and personalize your experience.
                </p>
              </div>
            </div>
          </section>

          {/* Cookie Settings */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Managing Cookies</h2>
            </div>
            <p className="text-gray-600 mb-4">
              You can control and/or delete cookies as you wish. You can delete all cookies
              that are already on your device and you can set most browsers to prevent them
              from being placed.
            </p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Cookie Settings
            </button>
          </section>

          {/* Privacy & Security */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Privacy & Security</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We respect your privacy and are committed to protecting your personal information.
              Our use of cookies complies with applicable data protection laws.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-purple-600">
                For more information about how we protect your privacy, please see our{' '}
                <a href="/privacy" className="underline hover:text-purple-700">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

export default Cookies;