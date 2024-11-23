import React from 'react';
import { Users, MessageCircle, Sparkles, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from './shared/PageTransition';
import AnimatedCounter from './shared/AnimatedCounter';

function WisdomCircle() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <motion.header 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wisdom Circle</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with fellow seekers and share in collective wisdom
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <UpcomingSession />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ActiveDiscussions />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <CommunityInsights />
        </motion.div>
      </div>
    </PageTransition>
  );
}

function UpcomingSession() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Next Session</h2>
        <Calendar className="h-5 w-5 text-emerald-500" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Date</span>
          <span className="font-medium">March 20, 2024</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Time</span>
          <span className="font-medium">2:00 PM EST</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Topic</span>
          <span className="font-medium">Collective Consciousness</span>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Join Session
        </motion.button>
      </div>
    </div>
  );
}

function ActiveDiscussions() {
  const discussions = [
    {
      title: "Environmental Stewardship",
      participants: 12,
      lastActive: "2 hours ago"
    },
    {
      title: "Inner Growth Practices",
      participants: 8,
      lastActive: "5 hours ago"
    },
    {
      title: "Community Building",
      participants: 15,
      lastActive: "1 day ago"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Active Discussions</h2>
        <MessageCircle className="h-5 w-5 text-emerald-500" />
      </div>
      <div className="space-y-4">
        {discussions.map((discussion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
          >
            <div>
              <h3 className="font-medium text-gray-900">{discussion.title}</h3>
              <p className="text-sm text-gray-500">{discussion.participants} participants</p>
            </div>
            <span className="text-sm text-gray-500">{discussion.lastActive}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CommunityInsights() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Community Insights</h2>
        <Sparkles className="h-5 w-5 text-emerald-500" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InsightCard
          icon={<Users className="h-6 w-6 text-purple-500" />}
          title="Active Members"
          value={156}
          trend="+12% this month"
        />
        <InsightCard
          icon={<MessageCircle className="h-6 w-6 text-blue-500" />}
          title="Discussions"
          value={28}
          trend="8 new this week"
        />
        <InsightCard
          icon={<Sparkles className="h-6 w-6 text-amber-500" />}
          title="Wisdom Shared"
          value={342}
          trend="Growing daily"
        />
      </div>
    </div>
  );
}

function InsightCard({ icon, title, value, trend }: {
  icon: React.ReactNode;
  title: string;
  value: number;
  trend: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-4 rounded-lg bg-gray-50"
    >
      <div className="flex items-center space-x-2 mb-2">
        {icon}
        <h3 className="font-medium text-gray-900">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">
        <AnimatedCounter value={value} />
      </p>
      <p className="text-sm text-gray-600">{trend}</p>
    </motion.div>
  );
}

export default WisdomCircle;