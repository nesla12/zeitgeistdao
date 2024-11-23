import React, { useState } from 'react';
import { Globe } from 'lucide-react';

function ImpactMap() {
  const [selectedRegion, setSelectedRegion] = useState('global');

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Global Impact Map</h2>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="px-3 py-1 border rounded-lg text-sm"
        >
          <option value="global">Global</option>
          <option value="americas">Americas</option>
          <option value="europe">Europe</option>
          <option value="asia">Asia</option>
          <option value="africa">Africa</option>
        </select>
      </div>
      
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Interactive impact map visualization coming soon</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600">Active Projects</p>
          <p className="text-2xl font-bold text-purple-600">24</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">Impact Zones</p>
          <p className="text-2xl font-bold text-green-600">12</p>
        </div>
      </div>
    </div>
  );
}

export default ImpactMap;