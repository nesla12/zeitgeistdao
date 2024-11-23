import React from 'react';
import { BookOpen, Star, Trophy, Target } from 'lucide-react';

function LearningJourney() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Journey</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Track your personal growth and development path
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProgressCard
          icon={<BookOpen className="h-8 w-8 text-blue-500" />}
          title="Courses Completed"
          value="12"
          total="15"
        />
        <ProgressCard
          icon={<Star className="h-8 w-8 text-amber-500" />}
          title="Skills Mastered"
          value="8"
          total="10"
        />
        <ProgressCard
          icon={<Trophy className="h-8 w-8 text-emerald-500" />}
          title="Achievements"
          value="24"
          total="30"
        />
      </div>

      <CurrentLearning />
      <LearningPath />
    </div>
  );
}

function ProgressCard({ icon, title, value, total }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  total: string;
}) {
  const percentage = (parseInt(value) / parseInt(total)) * 100;
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        {icon}
        <span className="text-2xl font-bold text-gray-900">{value}/{total}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-emerald-500 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function CurrentLearning() {
  const courses = [
    {
      title: "Mindfulness Fundamentals",
      progress: 75,
      timeLeft: "2 hours left"
    },
    {
      title: "Environmental Leadership",
      progress: 45,
      timeLeft: "4 hours left"
    },
    {
      title: "Community Building",
      progress: 90,
      timeLeft: "1 hour left"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Learning</h2>
      <div className="space-y-6">
        {courses.map((course, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900">{course.title}</h3>
              <span className="text-sm text-gray-500">{course.timeLeft}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LearningPath() {
  const milestones = [
    {
      title: "Foundation",
      description: "Basic principles and practices",
      status: "completed"
    },
    {
      title: "Intermediate",
      description: "Advanced concepts and applications",
      status: "in-progress"
    },
    {
      title: "Advanced",
      description: "Leadership and community building",
      status: "upcoming"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Learning Path</h2>
        <Target className="h-5 w-5 text-emerald-500" />
      </div>
      <div className="space-y-8">
        {milestones.map((milestone, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className={`flex-shrink-0 w-4 h-4 rounded-full mt-1 ${
              milestone.status === 'completed' ? 'bg-emerald-500' :
              milestone.status === 'in-progress' ? 'bg-blue-500' :
              'bg-gray-300'
            }`} />
            <div>
              <h3 className="font-medium text-gray-900">{milestone.title}</h3>
              <p className="text-sm text-gray-600">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LearningJourney;