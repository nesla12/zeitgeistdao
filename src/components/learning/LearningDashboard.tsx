import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, TrendingUp, BookOpen } from 'lucide-react';
import type { Course } from '../../types/learning';

interface LearningDashboardProps {
  courses: Course[];
  loading: boolean;
}

function LearningDashboard({ courses, loading }: LearningDashboardProps) {
  const upcomingLessons = [
    {
      title: "Introduction to Mindfulness",
      time: "2:00 PM",
      duration: "45 min",
      instructor: "Sarah Chen"
    },
    {
      title: "Advanced Meditation",
      time: "4:30 PM",
      duration: "60 min",
      instructor: "David Kumar"
    }
  ];

  const weeklyProgress = {
    hoursStudied: 12.5,
    coursesCompleted: 2,
    streak: 5
  };

  return (
    <div className="space-y-6">
      {/* Weekly Progress */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Progress</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{weeklyProgress.hoursStudied}h</div>
            <div className="text-sm text-gray-600">Study Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{weeklyProgress.coursesCompleted}</div>
            <div className="text-sm text-gray-600">Courses Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{weeklyProgress.streak} days</div>
            <div className="text-sm text-gray-600">Learning Streak</div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
          <Calendar className="w-5 h-5 text-purple-600" />
        </div>
        <div className="space-y-4">
          {upcomingLessons.map((lesson, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                  <p className="text-sm text-gray-600">with {lesson.instructor}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{lesson.time}</div>
                <div className="text-sm text-gray-600">{lesson.duration}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <TrendingUp className="w-5 h-5 text-purple-600" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <div className="flex-1">
                <p className="text-gray-900">Completed Chapter {3 - index}</p>
                <p className="text-sm text-gray-600">Introduction to Mindfulness</p>
              </div>
              <span className="text-sm text-gray-500">{index + 1}h ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningDashboard;