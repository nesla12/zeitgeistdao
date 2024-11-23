import React from 'react';
import { motion } from 'framer-motion';
import { Package, Leaf, Heart, Diamond, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

function CategoryExplorer() {
  const categories = [
    {
      id: 'meditation',
      name: 'Meditation & Mindfulness',
      icon: <Heart className="w-6 h-6" />,
      description: 'Tools and accessories for meditation practice',
      color: 'purple',
      subcategories: ['Cushions', 'Mats', 'Timers', 'Accessories']
    },
    {
      id: 'crystals',
      name: 'Crystals & Stones',
      icon: <Diamond className="w-6 h-6" />,
      description: 'Natural crystals and healing stones',
      color: 'blue',
      subcategories: ['Raw Crystals', 'Polished Stones', 'Crystal Jewelry']
    },
    {
      id: 'sustainable',
      name: 'Sustainable Living',
      icon: <Leaf className="w-6 h-6" />,
      description: 'Eco-friendly products and tools',
      color: 'green',
      subcategories: ['Home & Living', 'Personal Care', 'Zero Waste']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className={`p-6 bg-${category.color}-50`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-lg bg-${category.color}-100`}>
                  {category.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
              </div>
              <p className="text-gray-600 mb-4">{category.description}</p>
              
              <div className="space-y-2">
                {category.subcategories.map((sub, index) => (
                  <Link
                    key={index}
                    to={`/marketplace/category/${category.id}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block px-3 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CategoryExplorer;