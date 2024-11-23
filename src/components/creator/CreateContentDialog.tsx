import React, { useState } from 'react';
import { X, Image, Tag, Calendar, Globe, Lock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import RichTextEditor from '../social/RichTextEditor';

interface CreateContentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateContentDialog({ isOpen, onClose }: CreateContentDialogProps) {
  const [contentType, setContentType] = useState<'post' | 'article' | 'event'>('post');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'followers' | 'private'>('public');
  const [tags, setTags] = useState<string[]>([]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Create Content</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Content Type Selection */}
          <div className="flex space-x-4 mb-6">
            {[
              { id: 'post', label: 'Post' },
              { id: 'article', label: 'Article' },
              { id: 'event', label: 'Event' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setContentType(type.id as typeof contentType)}
                className={`px-4 py-2 rounded-lg ${
                  contentType === type.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Title */}
          <div className="mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Rich Text Editor */}
          <div className="mb-6">
            <RichTextEditor
              value={content}
              onChange={setContent}
              onImageUpload={async (file) => {
                // Handle image upload
                return URL.createObjectURL(file);
              }}
            />
          </div>

          {/* Visibility Settings */}
          <div className="flex items-center space-x-4 mb-6">
            <label className="text-sm font-medium text-gray-700">Visibility:</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as typeof visibility)}
              className="px-3 py-1 border rounded-lg text-sm"
            >
              <option value="public">Public</option>
              <option value="followers">Followers Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                >
                  {tag}
                  <button
                    onClick={() => setTags(tags.filter((_, i) => i !== index))}
                    className="ml-2 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add tags..."
                className="px-2 py-1 border-b focus:outline-none focus:border-purple-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value) {
                    setTags([...tags, e.currentTarget.value]);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle content creation
              onClose();
            }}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Publish
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default CreateContentDialog;