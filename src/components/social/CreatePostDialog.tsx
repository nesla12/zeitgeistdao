import React, { useState, useRef } from 'react';
import { X, Image, MapPin, Users, Hash, Globe, Lock, UserPlus, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocialFeatures } from '../../hooks/useSocialFeatures';

interface CreatePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreatePostDialog({ isOpen, onClose }: CreatePostDialogProps) {
  const [content, setContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isPosting,
    postVisibility,
    setPostVisibility,
    attachments,
    handleAttachment,
    location,
    setLocation,
    handlePost
  } = useSocialFeatures();

  const handleSubmit = async () => {
    await handlePost(content);
    setContent('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold">Create Post</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts with the community..."
            className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />

          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Attachment ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      const newAttachments = [...attachments];
                      newAttachments.splice(index, 1);
                      // Update attachments
                    }}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Post Controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-500 hover:text-purple-600"
              >
                <Image className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLocation(location ? null : 'Current Location')}
                className={`text-gray-500 hover:text-purple-600 ${location ? 'text-purple-600' : ''}`}
              >
                <MapPin className="w-5 h-5" />
              </button>
              <div className="relative">
                <button className="text-gray-500 hover:text-purple-600">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={postVisibility}
                onChange={(e) => setPostVisibility(e.target.value as any)}
                className="p-2 border rounded-lg text-sm"
              >
                <option value="public">Public</option>
                <option value="followers">Followers</option>
                <option value="private">Private</option>
              </select>
              <button
                onClick={handleSubmit}
                disabled={!content.trim() || isPosting}
                className={`px-4 py-2 rounded-lg text-white ${
                  !content.trim() || isPosting
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isPosting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleAttachment(e.target.files)}
        />
      </motion.div>
    </div>
  );
}

export default CreatePostDialog;