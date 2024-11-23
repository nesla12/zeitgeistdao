import React from 'react';
import { ExternalLink, Star, Shield, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ExternalProduct } from '../../types/marketplace';

interface ExternalProductCardProps {
  product: ExternalProduct;
}

function ExternalProductCard({ product }: ExternalProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        {product.sponsored && (
          <span className="absolute top-2 right-2 px-2 py-1 bg-gray-800 text-white text-xs rounded">
            Sponsored
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">{product.vendor}</span>
          {product.prime && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Prime
            </span>
          )}
        </div>

        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.title}</h3>

        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-purple-600">${product.price.toFixed(2)}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviews})</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {product.freeShipping ? (
            <div className="flex items-center text-green-600 text-sm">
              <Truck className="w-4 h-4 mr-1" />
              <span>Free Shipping</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-600 text-sm">
              <Truck className="w-4 h-4 mr-1" />
              <span>Shipping: ${product.shippingPrice?.toFixed(2)}</span>
            </div>
          )}
          <div className="flex items-center text-gray-600 text-sm">
            <Shield className="w-4 h-4 mr-1" />
            <span>Buyer Protection</span>
          </div>
        </div>

        <a
          href={product.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <span>View on {product.vendor}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

export default ExternalProductCard;