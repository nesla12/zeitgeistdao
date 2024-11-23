import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, ArrowLeft, Info, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ListingCard from '../ListingCard';
import { categoryService } from '../../../services/marketplace/CategoryService';
import type { Category } from '../../../types/marketplace';

function CategoryView() {
  const { categoryId, subcategoryId } = useParams();
  const [sortBy, setSortBy] = useState('recommended');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [condition, setCondition] = useState<string[]>([]);
  const [showInfo, setShowInfo] = useState(false);

  // Get category details
  const category = categoryService.getCategories().find(c => c.id === categoryId);
  const subcategory = category?.subcategories.find(s => s.id === subcategoryId);

  if (!category) return <div>Category not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          to="/marketplace"
          className="flex items-center text-gray-600 hover:text-purple-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
            <p className="text-gray-600">{category.description}</p>
          </div>
          <button
            onClick={() => setShowInfo(true)}
            className="p-2 text-gray-400 hover:text-purple-600 rounded-full"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Requirements Notice */}
      {category.insuranceRequired && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <span className="text-blue-800">
              Items in this category require shipping insurance for values over ${category.minInsuranceValue}
            </span>
          </div>
        </motion.div>
      )}

      {/* Subcategory Navigation */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {category.subcategories.map((sub) => (
          <Link
            key={sub.id}
            to={`/marketplace/category/${category.id}/${sub.id}`}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              sub.id === subcategoryId
                ? 'bg-purple-100 text-purple-600 font-medium'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {sub.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-900">Filters</span>
              </div>
              <button 
                className="text-sm text-purple-600 hover:text-purple-700"
                onClick={() => {
                  setPriceRange([0, 1000]);
                  setCondition([]);
                }}
              >
                Reset
              </button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-24 px-3 py-2 border rounded-lg"
                  placeholder="Min"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-24 px-3 py-2 border rounded-lg"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Condition Filter */}
            {subcategory?.allowedConditions && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <div className="space-y-2">
                  {subcategory.allowedConditions.map((cond) => (
                    <label key={cond} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={condition.includes(cond)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCondition([...condition, cond]);
                          } else {
                            setCondition(condition.filter(c => c !== cond));
                          }
                        }}
                        className="rounded text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-700 capitalize">{cond}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="recommended">Recommended</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example listings - replace with actual data */}
            {[1, 2, 3, 4].map((i) => (
              <ListingCard
                key={i}
                listing={{
                  id: `${i}`,
                  title: "Example Listing",
                  price: "99.99",
                  creator: "Seller Name",
                  image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&q=80",
                  category: "physical",
                  subCategory: subcategoryId || "",
                  location: "Portland, OR",
                  distance: 15.2,
                  rating: 4.8,
                  reviews: 124,
                  tags: ["meditation", "handmade"],
                  type: "new",
                  shipping: {
                    worldwide: true,
                    price: "12.99",
                    time: "3-5 days"
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Category Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{category.name} Guidelines</h2>
            <div className="space-y-4">
              {category.shippingRequired && (
                <div className="flex items-start space-x-3">
                  <Package className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Shipping Required</h3>
                    <p className="text-sm text-gray-600">
                      All items in this category must offer shipping options.
                    </p>
                  </div>
                </div>
              )}
              {category.insuranceRequired && (
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Insurance Required</h3>
                    <p className="text-sm text-gray-600">
                      Items valued over ${category.minInsuranceValue} require shipping insurance.
                    </p>
                  </div>
                </div>
              )}
              {subcategory?.requiresAuthentication && (
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Authentication Required</h3>
                    <p className="text-sm text-gray-600">
                      Items in this subcategory require authentication before listing.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowInfo(false)}
              className="w-full mt-6 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryView;