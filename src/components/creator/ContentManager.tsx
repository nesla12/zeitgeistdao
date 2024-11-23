import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye, Clock, MessageCircle, Heart } from 'lucide-react';

function ContentManager() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const content = [
    {
      id: '1',
      title: 'Introduction to Mindfulness',
      type: 'article',
      status: 'published',
      publishDate: '2024-03-15',
      views: 1234,
      likes: 89,
      comments: 12
    },
    {
      id: '2',
      title: 'Meditation Techniques Workshop',
      type: 'video',
      status: 'draft',
      lastEdited: '2024-03-18',
      views: 0,
      likes: 0,
      comments: 0
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Content Library</h2>
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1 border rounded-lg text-sm"
          >
            <option value="all">All Content</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border rounded-lg text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
            <option value="engagement">Highest Engagement</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {content.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.01 }}
            className="p-4 border rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="capitalize">{item.type}</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{item.status === 'published' ? item.publishDate : `Last edited ${item.lastEdited}`}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {item.status === 'published' && (
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>{item.views}</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span>{item.comments}</span>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ContentManager;