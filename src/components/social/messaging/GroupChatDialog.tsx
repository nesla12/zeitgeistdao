import React, { useState } from 'react';
import { X, Users, Search, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface GroupChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (groupId: string) => void;
}

function GroupChatDialog({ isOpen, onClose, onCreateGroup }: GroupChatDialogProps) {
  const [groupName, setGroupName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const users = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      name: 'David Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    }
  ];

  const handleCreateGroup = () => {
    if (groupName && selectedUsers.length > 0) {
      // Create group chat
      const groupId = Math.random().toString(36).substr(2, 9);
      onCreateGroup(groupId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Create Group Chat</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter group name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add Members
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Search users..."
              />
            </div>
          </div>

          {/* Selected Users */}
          {selectedUsers.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedUsers.map((userId) => {
                const user = users.find(u => u.id === userId);
                return (
                  <div
                    key={userId}
                    className="flex items-center space-x-1 bg-purple-100 text-purple-600 px-2 py-1 rounded-full"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-4 h-4 rounded-full"
                    />
                    <span className="text-sm">{user?.name}</span>
                    <button
                      onClick={() => setSelectedUsers(selectedUsers.filter(id => id !== userId))}
                      className="hover:text-purple-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* User List */}
          <div className="max-h-60 overflow-y-auto">
            {users
              .filter(user => !selectedUsers.includes(user.id))
              .map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUsers([...selectedUsers, user.id])}
                  className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="flex-1 text-left">{user.name}</span>
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              ))}
          </div>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={handleCreateGroup}
            disabled={!groupName || selectedUsers.length === 0}
            className={`w-full py-2 rounded-lg ${
              groupName && selectedUsers.length > 0
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Create Group
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default GroupChatDialog;