import React, { useState } from 'react';
import { MessageCircle, Search, Settings, Plus, Users, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import GroupChatWindow from './GroupChatWindow';
import NewMessageDialog from './NewMessageDialog';
import GroupChatDialog from './GroupChatDialog';
import PageTransition from '../../shared/PageTransition';

function MessagingCenter() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [selectedChatType, setSelectedChatType] = useState<'direct' | 'group'>('direct');
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [isGroupChatOpen, setIsGroupChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'direct' | 'groups'>('all');

  const handleChatSelect = (chatId: string, type: 'direct' | 'group') => {
    setSelectedChat(chatId);
    setSelectedChatType(type);
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 h-[calc(100vh-12rem)]">
            {/* Sidebar */}
            <div className="col-span-4 border-r">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsGroupChatOpen(true)}
                      className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
                      title="Create Group Chat"
                    >
                      <Users className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setIsNewMessageOpen(true)}
                      className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
                      title="New Message"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
                      title="Filter Messages"
                    >
                      <Filter className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      filter === 'all'
                        ? 'bg-purple-100 text-purple-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('direct')}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      filter === 'direct'
                        ? 'bg-purple-100 text-purple-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Direct
                  </button>
                  <button
                    onClick={() => setFilter('groups')}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      filter === 'groups'
                        ? 'bg-purple-100 text-purple-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Groups
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <ChatList
                selectedChat={selectedChat}
                onSelectChat={handleChatSelect}
                searchQuery={searchQuery}
                filter={filter}
              />
            </div>

            {/* Chat Window */}
            <div className="col-span-8">
              {selectedChat ? (
                selectedChatType === 'group' ? (
                  <GroupChatWindow
                    groupId={selectedChat}
                    onClose={() => setSelectedChat(null)}
                  />
                ) : (
                  <ChatWindow
                    chatId={selectedChat}
                    onClose={() => setSelectedChat(null)}
                  />
                )
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                    <p>Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dialogs */}
        <NewMessageDialog
          isOpen={isNewMessageOpen}
          onClose={() => setIsNewMessageOpen(false)}
          onStartChat={(userId) => {
            handleChatSelect(userId, 'direct');
            setIsNewMessageOpen(false);
          }}
        />

        <GroupChatDialog
          isOpen={isGroupChatOpen}
          onClose={() => setIsGroupChatOpen(false)}
          onCreateGroup={(groupId) => {
            handleChatSelect(groupId, 'group');
            setIsGroupChatOpen(false);
          }}
        />
      </div>
    </PageTransition>
  );
}

export default MessagingCenter;