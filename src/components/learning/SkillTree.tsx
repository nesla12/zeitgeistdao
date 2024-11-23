import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Globe, Users, Star, Lock } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  icon: React.ReactNode;
  unlocked: boolean;
  prerequisites: string[];
}

function SkillTree() {
  const skills: Skill[] = [
    {
      id: 'mindfulness',
      name: 'Mindfulness',
      description: 'Develop present moment awareness',
      level: 3,
      maxLevel: 5,
      icon: <Brain className="w-6 h-6" />,
      unlocked: true,
      prerequisites: []
    },
    {
      id: 'emotional-intelligence',
      name: 'Emotional Intelligence',
      description: 'Understand and manage emotions',
      level: 2,
      maxLevel: 5,
      icon: <Heart className="w-6 h-6" />,
      unlocked: true,
      prerequisites: ['mindfulness']
    },
    {
      id: 'systems-thinking',
      name: 'Systems Thinking',
      description: 'Understand complex relationships',
      level: 0,
      maxLevel: 5,
      icon: <Globe className="w-6 h-6" />,
      unlocked: false,
      prerequisites: ['mindfulness', 'emotional-intelligence']
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Skill Tree</h2>
      
      <div className="space-y-6">
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border ${
              skill.unlocked ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${
                skill.unlocked ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-400'
              }`}>
                {skill.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">{skill.name}</h3>
                  {!skill.unlocked && <Lock className="w-4 h-4 text-gray-400" />}
                </div>
                <p className="text-sm text-gray-600">{skill.description}</p>
                
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Level {skill.level}/{skill.maxLevel}</span>
                    <span className="text-gray-600">
                      {skill.level === skill.maxLevel ? 'Mastered' : `${skill.level * 20}%`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        skill.unlocked ? 'bg-purple-600' : 'bg-gray-400'
                      }`}
                      style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default SkillTree;