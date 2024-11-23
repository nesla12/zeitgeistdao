import React, { useState } from 'react';
import { Users, MessageCircle, Heart, Share2, Filter, TrendingUp, Calendar, Globe, Plus, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from './shared/PageTransition';
import { useContent } from '../hooks/useContent';
import { motion } from 'framer-motion';
import CreatePostDialog from './social/CreatePostDialog';
import PostCard from './social/PostCard';
import TopCreators from './social/TopCreators';
import TrendingTopics from './social/TrendingTopics';
import EventsSection from './social/EventsSection';
import GroupsSection from './social/GroupsSection';
import ChallengesSection from './social/ChallengesSection';

function Social() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'feed' | 'events' | 'groups' | 'challenges'>('feed');
  const [contentFilter, setContentFilter] = useState<'all' | 'events' | 'discussions' | 'projects' | 'wisdom'>('all');
  const { posts, members, topics, loading } = useContent();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const handleCreatorMode = () => {
    navigate('/creator/dashboard');
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Community</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleCreatorMode}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <User className="w-5 h-5" />
              <span>Creator Mode</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setViewMode('feed')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              viewMode === 'feed'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Globe className="w-5 h-5" />
            <span>Feed</span>
          </button>
          <button
            onClick={() => setViewMode('events')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              viewMode === 'events'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Events</span>
          </button>
          <button
            onClick={() => setViewMode('groups')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              viewMode === 'groups'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Groups</span>
          </button>
          <button
            onClick={() => setViewMode('challenges')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              viewMode === 'challenges'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Challenges</span>
          </button>
        </div>

        {/* Content Filters */}
        {viewMode === 'feed' && (
          <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
            <button
              onClick={() => setContentFilter('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                contentFilter === 'all'
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setContentFilter('events')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                contentFilter === 'events'
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setContentFilter('discussions')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                contentFilter === 'discussions'
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Discussions
            </button>
            <button
              onClick={() => setContentFilter('projects')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                contentFilter === 'projects'
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setContentFilter('wisdom')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                contentFilter === 'wisdom'
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Wisdom
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {viewMode === 'feed' && (
              <>
                {/* Create Post Button */}
                <button
                  onClick={() => setIsCreatePostOpen(true)}
                  className="w-full bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Plus className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-gray-500">Share your thoughts with the community...</span>
                  </div>
                </button>

                {/* Feed */}
                {loading ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                        <div className="animate-pulse space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full" />
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-gray-200 rounded w-1/4" />
                              <div className="h-3 bg-gray-200 rounded w-1/5" />
                            </div>
                          </div>
                          <div className="h-20 bg-gray-200 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {posts.map((post, index) => (
                      <PostCard key={post.id || index} post={post} />
                    ))}
                  </div>
                )}
              </>
            )}

            {viewMode === 'events' && <EventsSection />}
            {viewMode === 'groups' && <GroupsSection />}
            {viewMode === 'challenges' && <ChallengesSection />}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <TopCreators />
            <TrendingTopics topics={topics} />
          </div>
        </div>

        {/* Create Post Dialog */}
        <CreatePostDialog
          isOpen={isCreatePostOpen}
          onClose={() => setIsCreatePostOpen(false)}
        />
      </div>
    </PageTransition>
  );
}

export default Social;