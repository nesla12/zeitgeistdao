import React from 'react';
import { motion } from 'framer-motion';
import { Users, Circle } from 'lucide-react';

interface ChatListProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string, type: 'direct' | 'group') => void;
  searchQuery: string;
}

function ChatList({ selectedChat, onSelectChat, searchQuery }: ChatListProps) {
  const chats = [
    {
      id: '1',
      type: 'direct' as const,
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      lastMessage: 'Looking forward to the meditation session!',
      time: '2m ago',
      unread: 2,
      online: true
    },
    {
      id: '2',
      type: 'group' as const,
      name: 'Mindfulness Circle',
      avatar: null,
      lastMessage: 'David: Great insights everyone!',
      time: '1h ago',
      unread: 0,
      members: 8
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto">
      {filteredChats.map((chat) => (
        <motion.button
          key={chat.id}
          whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.025)' }}
          onClick={() => onSelectChat(chat.id, chat.type)}
          className={`w-full p-4 flex items-center space-x-3 border-b ${
            selectedChat === chat.id ? 'bg-purple-50' : ''
          }`}
        >
          {chat.type === 'direct' ? (
            <div className="relative">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full"
              />
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
          ) : (
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          )}

          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">{chat.name}</span>
              <span className="text-xs text-gray-500">{chat.time}</span>
            </div>
            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
          </div>

          {chat.unread > 0 && (
            <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">{chat.unread}</span>
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

export default ChatList;