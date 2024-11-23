import React, { useState } from 'react';
import { BookOpen, Star, Users, Globe, Target, Heart, Award, Plus, Layout, BookMarked } from 'lucide-react';
import PageTransition from './shared/PageTransition';
import { useLearning } from '../hooks/useLearning';
import LearningPath from './learning/LearningPath';
import CourseGrid from './learning/CourseGrid';
import LearningStats from './learning/LearningStats';
import SkillTree from './learning/SkillTree';
import AchievementPanel from './learning/AchievementPanel';
import StudyTimer from './learning/StudyTimer';
import CreateCourseDialog from './learning/CreateCourseDialog';
import LearningDashboard from './learning/LearningDashboard';

function Learn() {
  const { courses, milestones, loading } = useLearning();
  const [activeView, setActiveView] = useState<'dashboard' | 'courses' | 'path' | 'skills'>('dashboard');
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);

  return (
    <PageTransition>
      <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Center</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Expand your knowledge and grow your consciousness
          </p>
          <button
            onClick={() => setIsCreateCourseOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            <span className="font-medium">Create New Course</span>
          </button>
        </header>

        {/* View Toggle */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeView === 'dashboard'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Layout className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveView('courses')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeView === 'courses'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BookMarked className="w-5 h-5" />
            <span>Courses</span>
          </button>
          <button
            onClick={() => setActiveView('path')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeView === 'path'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Target className="w-5 h-5" />
            <span>Learning Path</span>
          </button>
          <button
            onClick={() => setActiveView('skills')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeView === 'skills'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Star className="w-5 h-5" />
            <span>Skill Tree</span>
          </button>
        </div>

        {/* Learning Stats */}
        <LearningStats />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {activeView === 'dashboard' && (
              <LearningDashboard courses={courses} loading={loading} />
            )}
            {activeView === 'courses' && (
              <CourseGrid courses={courses} loading={loading} />
            )}
            {activeView === 'path' && (
              <LearningPath milestones={milestones} loading={loading} />
            )}
            {activeView === 'skills' && (
              <SkillTree />
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <StudyTimer />
            <AchievementPanel />
          </div>
        </div>

        {/* Create Course Dialog */}
        <CreateCourseDialog 
          isOpen={isCreateCourseOpen} 
          onClose={() => setIsCreateCourseOpen(false)} 
        />
      </div>
    </PageTransition>
  );
}

export default Learn;