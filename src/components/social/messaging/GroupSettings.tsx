import React, { useState } from 'react';
import { X, Camera, Bell, Lock, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface GroupSettingsProps {
  group: {
    name: string;
    description: string;
  };
  onClose: () => void;
}

function GroupSettings({ group, onClose }: GroupSettingsProps) {
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="w-80 bg-white border-l flex flex-col"
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Group Settings</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Group Image */}
        <div className="text-center">
          <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto flex items-center justify-center mb-2">
            <Users className="w-12 h-12 text-purple-600" />
          </div>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            Change Group Photo
          </button>
        </div>

        {/* Group Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
            />
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">Privacy</span>
            </div>
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value as 'public' | 'private')}
              className="px-3 py-1 border rounded-lg text-sm"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-6 border-t">
          <h4 className="text-sm font-medium text-red-600 mb-4">Danger Zone</h4>
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50">
            <Trash2 className="w-5 h-5" />
            <span>Leave Group</span>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="p-4 border-t">
        <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Save Changes
        </button>
      </div>
    </motion.div>
  );
}

export default GroupSettings;