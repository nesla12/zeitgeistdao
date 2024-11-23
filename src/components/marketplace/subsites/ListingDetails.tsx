import React, { useState } from 'react';
import { Star, Shield, Package, MapPin, Heart, Share2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ShippingOptionsPanel from '../ShippingOptionsPanel';

function ListingDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isShippingOpen, setIsShippingOpen] = useState(false);

  const listing = {
    title: "Handcrafted Meditation Cushion",
    price: 89.99,
    description: "Premium quality meditation cushion made with sustainable materials. Perfect for daily practice.",
    condition: "New",
    category: "Meditation",
    location: "Portland, OR",
    seller: {
      name: "Eco Crafts Co.",
      rating: 4.9,
      verified: true
    },
    images: [
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&q=80",
      "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=500&q=80"
    ],
    features: [
      "Organic cotton cover",
      "Buckwheat hull filling",
      "Removable cover for washing",
      "Height: 15cm, Diameter: 35cm"
    ],
    shipping: {
      available: true,
      insurance: true,
      time: "3-5 business days"
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden">
            <img
              src={listing.images[selectedImage]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-4">
            {listing.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <img src={image} alt={`${listing.title} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Listing Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-purple-600">${listing.price}</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {listing.condition}
              </span>
            </div>
          </div>

          {/* Seller Info */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="font-medium">{listing.seller.rating}</span>
              </div>
              <span className="text-gray-500">|</span>
              <div className="flex items-center space-x-1">
                <span>{listing.seller.name}</span>
                {listing.seller.verified && (
                  <Shield className="w-4 h-4 text-blue-500" />
                )}
              </div>
            </div>
            <button className="text-purple-600 hover:text-purple-700">
              View Profile
            </button>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-600">{listing.description}</p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Features</h2>
            <ul className="space-y-2">
              {listing.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => setIsShippingOpen(true)}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
            >
              Buy Now
            </button>
            <button className="p-3 text-gray-600 hover:text-purple-600 border rounded-lg hover:border-purple-600">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-3 text-gray-600 hover:text-purple-600 border rounded-lg hover:border-purple-600">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Info */}
          {listing.shipping.available && (
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Package className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Shipping Available</p>
                <p className="text-sm text-gray-600">{listing.shipping.time}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Shipping Options Modal */}
      {isShippingOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping & Insurance</h2>
            <ShippingOptionsPanel
              itemValue={listing.price}
              weight={2}
              dimensions={[35, 35, 15]}
              destination="US"
              onSelect={(option, insurance) => {
                console.log('Selected shipping:', option, insurance);
                setIsShippingOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingDetails;