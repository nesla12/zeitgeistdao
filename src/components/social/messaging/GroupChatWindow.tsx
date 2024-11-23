import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Image, Paperclip, MoreVertical, Users, Settings, ThumbsUp, Heart, Star, Video, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GroupMemberList from './GroupMemberList';
import GroupSettings from './GroupSettings';
import MessageReactions from './MessageReactions';
import RichTextEditor from '../RichTextEditor';

interface GroupChatWindowProps {
  groupId: string;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  reactions?: {
    type: string;
    users: string[];
  }[];
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name?: string;
  }[];
}

function GroupChatWindow({ groupId, onClose }: GroupChatWindowProps) {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ... rest of the component implementation remains the same

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Simulate file upload
      const attachment = {
        type: file.type.startsWith('image/') ? 'image' : 'file',
        url: URL.createObjectURL(file),
        name: file.name
      };
      
      // Add message with attachment
      handleSendMessage(message, [attachment]);
    }
  };

  const handleEditMessage = (msg: Message) => {
    setIsEditing(true);
    setEditingMessage(msg);
    setMessage(msg.content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingMessage(null);
    setMessage('');
  };

  const handleUpdateMessage = () => {
    if (editingMessage && message.trim()) {
      // Update message logic
      handleCancelEdit();
    }
  };

  return (
    <div className="h-full flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Group Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{group.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{group.members.length} members</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-green-500">
                  {group.members.filter(m => m.online).length} online
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50">
              <Video className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowMembers(true)}
              className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
            >
              <Users className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* ... existing message rendering code ... */}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          {isEditing ? (
            <div className="space-y-2">
              <RichTextEditor
                value={message}
                onChange={setMessage}
                onImageUpload={async (file) => {
                  // Handle image upload
                  return URL.createObjectURL(file);
                }}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateMessage}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Update
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileUpload}
                multiple
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
              >
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
                onChange={(e) => {
                  setMessage(e.target.value);
                  handleTyping();
                }}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={() => handleSendMessage(message)}
                className={`p-2 rounded-lg ${
                  message.trim()
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Side Panels */}
      <AnimatePresence>
        {showMembers && (
          <GroupMemberList
            members={group.members}
            onClose={() => setShowMembers(false)}
          />
        )}
        {showSettings && (
          <GroupSettings
            group={group}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default GroupChatWindow;