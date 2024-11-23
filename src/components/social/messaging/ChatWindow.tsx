import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Image, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatWindowProps {
  chatId: string;
  onClose: () => void;
}

function ChatWindow({ chatId, onClose }: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = [
    {
      id: '1',
      sender: 'Sarah Chen',
      content: 'Hi! Are you joining the meditation session today?',
      time: '2:30 PM',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      sender: 'You',
      content: 'Yes, I'll be there! What time does it start?',
      time: '2:32 PM',
      isSelf: true
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            alt="Sarah Chen"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium text-gray-900">Sarah Chen</h3>
            <span className="text-sm text-green-500">Online</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isSelf ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-[70%] ${msg.isSelf ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {!msg.isSelf && (
                <img
                  src={msg.avatar}
                  alt={msg.sender}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div>
                <div
                  className={`p-3 rounded-lg ${
                    msg.isSelf
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {msg.content}
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${
                  msg.isSelf ? 'text-right' : ''
                }`}>
                  {msg.time}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50">
            <Paperclip className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50">
            <Image className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowEmoji(!showEmoji)}
            className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
          >
            <Smile className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => {
              if (message.trim()) {
                // Send message
                setMessage('');
              }
            }}
            className={`p-2 rounded-lg ${
              message.trim()
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;