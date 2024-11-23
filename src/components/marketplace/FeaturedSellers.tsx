import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Award } from 'lucide-react';

function FeaturedSellers() {
  const sellers = [
    {
      name: "Eco Crafts Co.",
      rating: 4.9,
      reviews: 156,
      verified: true,
      badge: "Top Seller",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    },
    {
      name: "Mindful Goods",
      rating: 4.8,
      reviews: 124,
      verified: true,
      badge: "Eco-Friendly",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    {
      name: "Conscious Living",
      rating: 4.7,
      reviews: 98,
      verified: true,
      badge: "Rising Star",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Featured Sellers</h2>
      <div className="space-y-6">
        {sellers.map((seller, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="flex items-start space-x-4"
          >
            <img
              src={seller.avatar}
              alt={seller.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-900">{seller.name}</h3>
                {seller.verified && (
                  <Shield className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">{seller.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({seller.reviews} reviews)</span>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 mt-2 rounded text-xs font-medium bg-purple-100 text-purple-800">
                {seller.badge}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedSellers;