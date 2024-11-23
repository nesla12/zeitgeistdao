import React from 'react';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import PageTransition from '../shared/PageTransition';

function Blog() {
  const posts = [
    {
      title: "The Future of Conscious Technology",
      excerpt: "Exploring how technology can enhance human consciousness and connection.",
      author: "Sarah Chen",
      date: "March 15, 2024",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80"
    },
    {
      title: "Building Sustainable Communities",
      excerpt: "Learn how communities are coming together to create lasting change.",
      author: "Michael Torres",
      date: "March 12, 2024",
      category: "Community",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80"
    }
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ZEITGEIST Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, updates, and stories from our community
          </p>
        </div>

        {/* Featured Post */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                alt="Featured post"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                Featured
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-4">
                Evolving Consciousness in the Digital Age
              </h2>
              <p className="text-gray-600 mb-6">
                Discover how technology and consciousness are merging to create new possibilities
                for human evolution and connection.
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Elena Woods</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">March 18, 2024</span>
                </div>
              </div>
              <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
                Read More <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-purple-600">{post.category}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{post.date}</span>
                    </div>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

export default Blog;