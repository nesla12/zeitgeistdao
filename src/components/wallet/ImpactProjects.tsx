import React, { useState } from 'react';
import { TreePine, Users, Target, ArrowUpRight, Filter, Search, Calendar, TrendingUp, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'environmental' | 'social' | 'educational';
  votingPower: number;
  totalVotes: number;
  deadline: string;
  image: string;
  impact: {
    metric: string;
    value: string;
  };
  rewards: {
    tokens: number;
    badges: string[];
  };
  progress: number;
}

function ImpactProjects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const projects: Project[] = [
    {
      id: '1',
      title: 'Community Forest Restoration',
      description: 'Support local communities in reforesting degraded land',
      category: 'environmental',
      votingPower: 450,
      totalVotes: 2500,
      deadline: '3 days left',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&fit=crop',
      impact: {
        metric: 'Trees Planted',
        value: '1,234'
      },
      rewards: {
        tokens: 500,
        badges: ['Forest Guardian', 'Earth Protector']
      },
      progress: 65
    },
    {
      id: '2',
      title: 'Indigenous Wisdom Archive',
      description: 'Preserve and digitize indigenous knowledge',
      category: 'educational',
      votingPower: 320,
      totalVotes: 1800,
      deadline: '5 days left',
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500&fit=crop',
      impact: {
        metric: 'Knowledge Preserved',
        value: '50 Stories'
      },
      rewards: {
        tokens: 300,
        badges: ['Wisdom Keeper', 'Cultural Guardian']
      },
      progress: 45
    },
    {
      id: '3',
      title: 'Sustainable Agriculture Hub',
      description: 'Create community gardens and education centers',
      category: 'social',
      votingPower: 280,
      totalVotes: 2100,
      deadline: '2 days left',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&fit=crop',
      impact: {
        metric: 'Gardens Created',
        value: '12'
      },
      rewards: {
        tokens: 400,
        badges: ['Green Thumb', 'Community Builder']
      },
      progress: 80
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Target },
    { id: 'environmental', label: 'Environmental', icon: TreePine },
    { id: 'social', label: 'Social', icon: Users },
    { id: 'educational', label: 'Educational', icon: Award }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Impact Projects</h2>
          <p className="text-sm text-gray-600 mt-1">Vote to support regenerative initiatives</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
          >
            <Filter className="w-5 h-5" />
          </button>
          <button className="text-purple-600 hover:text-purple-700 flex items-center space-x-2">
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-purple-100 text-purple-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [showDetails, setShowDetails] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'environmental':
        return <TreePine className="w-5 h-5 text-green-500" />;
      case 'social':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'educational':
        return <Target className="w-5 h-5 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg border overflow-hidden"
    >
      <div className="aspect-video relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            project.category === 'environmental' ? 'bg-green-100 text-green-800' :
            project.category === 'social' ? 'bg-blue-100 text-blue-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          {getCategoryIcon(project.category)}
          <h3 className="font-semibold text-gray-900">{project.title}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
        
        {/* Impact & Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">{project.impact.metric}</span>
            </div>
            <span className="font-medium text-green-600">{project.impact.value}</span>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Rewards */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-gray-600">Rewards</span>
            </div>
            <span className="font-medium text-purple-600">{project.rewards.tokens} ECO</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {project.rewards.badges.map((badge, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">{project.deadline}</span>
            </div>
            <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
              Vote ({project.votingPower})
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ImpactProjects;