import React, { useState } from 'react';
import { Star, MapPin, Clock, Package, Shield, Heart, Share2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Listing } from '../../services/MarketplaceService';
import ShippingOptionsPanel from './ShippingOptionsPanel';

interface ListingCardProps {
  listing: Listing;
}

function ListingCard({ listing }: ListingCardProps) {
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleBuyNow = () => {
    if (listing.category === 'physical' && listing.price > 500) {
      // High-value items require shipping insurance
      setIsShippingOpen(true);
    } else {
      // Handle direct purchase
      console.log('Processing purchase:', listing);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="relative">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>
        <div className="absolute top-2 left-2 flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            listing.category === 'physical' ? 'bg-blue-100 text-blue-800' :
            listing.category === 'digital' ? 'bg-purple-100 text-purple-800' :
            'bg-green-100 text-green-800'
          }`}>
            {listing.category}
          </span>
          {listing.type === 'new' && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              New
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{listing.title}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-purple-600">${listing.price}</span>
            {listing.price > 500 && (
              <div className="flex items-center text-amber-600" title="High-value item">
                <AlertTriangle className="w-4 h-4" />
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-600">{listing.rating}</span>
            <span className="text-sm text-gray-400">({listing.reviews})</span>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{listing.location}</span>
            {listing.distance > 0 && (
              <span className="text-gray-400">({listing.distance} km)</span>
            )}
          </div>

          {listing.shipping && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>{listing.shipping.worldwide ? 'Ships worldwide' : 'Local shipping'}</span>
              </div>
              {listing.shipping.insurance && (
                <div className="flex items-center space-x-1 text-green-600">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs">Insured shipping available</span>
                </div>
              )}
            </div>
          )}

          {listing.availability === 'limited' && (
            <div className="flex items-center space-x-2 text-amber-600">
              <Clock className="w-4 h-4" />
              <span>Limited availability</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {listing.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-2">
          <button 
            onClick={handleBuyNow}
            className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {listing.category === 'physical' ? 'Buy Now' : 'Get Now'}
          </button>
          <button 
            className="p-2 text-gray-600 hover:text-purple-600 border rounded-lg hover:border-purple-600"
            title="Share listing"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Shipping Options Modal */}
      {isShippingOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping & Insurance</h2>
            <ShippingOptionsPanel
              itemValue={parseFloat(listing.price)}
              weight={1}
              dimensions={[10, 10, 10]}
              destination="US"
              onSelect={(option, insurance) => {
                console.log('Selected shipping:', option, insurance);
                setIsShippingOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ListingCard;