import React from 'react';
import { Star, Shield, Package, MapPin, Calendar, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function SellerProfile() {
  const seller = {
    name: "Eco Crafts Co.",
    joinDate: "March 2023",
    location: "Portland, OR",
    rating: 4.9,
    reviews: 156,
    verified: true,
    sales: 450,
    responseTime: "< 2 hours",
    description: "We create handcrafted meditation tools and sustainable lifestyle products.",
    badges: ["Top Seller", "Fast Shipper", "Eco-Friendly"],
    categories: ["Meditation", "Sustainable Living", "Handcrafted"]
  };

  const recentListings = [
    {
      id: 1,
      title: "Handcrafted Meditation Cushion",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=300&q=80"
    },
    {
      id: 2,
      title: "Bamboo Meditation Timer",
      price: "$45.00",
      image: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=300&q=80"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Seller Header */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                alt={seller.name}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-gray-900">{seller.name}</h1>
                  {seller.verified && (
                    <Shield className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="font-medium">{seller.rating}</span>
                    <span className="text-gray-500 ml-1">({seller.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Member since {seller.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 max-w-2xl">{seller.description}</p>
          </div>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
            Contact Seller
          </button>
        </div>

        {/* Seller Stats */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{seller.sales}</div>
            <div className="text-sm text-gray-600">Total Sales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{seller.responseTime}</div>
            <div className="text-sm text-gray-600">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">98%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="text-sm text-gray-600">Active Listings</div>
          </div>
        </div>
      </div>

      {/* Recent Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Listings</h2>
          <div className="space-y-4">
            {recentListings.map((listing) => (
              <motion.div
                key={listing.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{listing.title}</h3>
                  <p className="text-purple-600 font-medium">{listing.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Reviews</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b pb-4 last:border-0">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <span className="text-gray-500">2 days ago</span>
                </div>
                <p className="text-gray-600">
                  Great quality product and fast shipping. Very satisfied with my purchase!
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerProfile;