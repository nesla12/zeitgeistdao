import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark, Globe, Users, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface PostCardProps {
  post: {
    id: string;
    author: string;
    avatar: string;
    content: string;
    images?: string[];
    likes: number;
    comments: number;
    timeAgo: string;
    isLiked?: boolean;
    isSaved?: boolean;
    visibility: 'public' | 'followers' | 'private';
  };
}

function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showActions, setShowActions] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const getVisibilityIcon = () => {
    switch (post.visibility) {
      case 'public':
        return <Globe className="w-4 h-4 text-gray-400" />;
      case 'followers':
        return <Users className="w-4 h-4 text-gray-400" />;
      case 'private':
        return <Lock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-gray-900">{post.author}</h3>
              {getVisibilityIcon()}
            </div>
            <p className="text-sm text-gray-500">{post.timeAgo}</p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="text-gray-400 hover:text-gray-600"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                Report Post
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                Mute Author
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50">
                Block User
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.content}</p>

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className="mb-4">
          <div className={`grid gap-2 ${
            post.images.length === 1 ? 'grid-cols-1' :
            post.images.length === 2 ? 'grid-cols-2' :
            'grid-cols-3'
          }`}>
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => {/* Open image viewer */}}
              />
            ))}
          </div>
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between text-gray-500 pt-4 border-t">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 hover:text-purple-600 ${
            isLiked ? 'text-purple-600' : ''
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likesCount}</span>
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 hover:text-purple-600"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-purple-600">
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
        <button
          onClick={() => setIsSaved(!isSaved)}
          className={`hover:text-purple-600 ${isSaved ? 'text-purple-600' : ''}`}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex space-x-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
              alt="Your avatar"
              className="w-8 h-8 rounded-full"
            />
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default PostCard;