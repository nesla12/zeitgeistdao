import React from 'react';
import { Shield } from 'lucide-react';

function SecuritySettings() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">Security Status</h2>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-green-700">2FA Enabled</span>
          </div>
          <button className="text-sm text-green-600">Manage</button>
        </div>
        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span className="text-purple-700">Recovery Phrase Backed Up</span>
          </div>
          <button className="text-sm text-purple-600">View</button>
        </div>
      </div>
    </div>
  );
}

export default SecuritySettings;