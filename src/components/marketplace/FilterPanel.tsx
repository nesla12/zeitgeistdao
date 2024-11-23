import React from 'react';
import { Filter, MapPin, Tag, DollarSign, Star } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    category: string;
    subCategory: string;
    type: string;
    location: string;
    maxDistance: number;
    minPrice: number;
    maxPrice: number;
    minRating: number;
    availability: string;
  };
  onFilterChange: (filters: any) => void;
}

function FilterPanel({ isOpen, onClose, filters, onFilterChange }: FilterPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      {/* Category Filters */}
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Category</h3>
        <div className="space-y-2">
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="physical">Physical Goods</option>
            <option value="digital">Digital Products</option>
            <option value="service">Services</option>
          </select>
        </div>
      </div>

      {/* Location Filter */}
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Location</h3>
        <div className="space-y-4">
          <select
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">All Locations</option>
            <option value="worldwide">Worldwide</option>
            <option value="remote">Remote Only</option>
            <option value="local">Local Only</option>
          </select>

          {filters.location === 'local' && (
            <div>
              <label className="block text-sm text-gray-600 mb-2">Maximum Distance</label>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.maxDistance}
                onChange={(e) => onFilterChange({ ...filters, maxDistance: e.target.value })}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>0 km</span>
                <span>{filters.maxDistance} km</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Price Range</h3>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
            className="w-full p-2 border rounded-lg"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Minimum Rating</h3>
        <select
          value={filters.minRating}
          onChange={(e) => onFilterChange({ ...filters, minRating: e.target.value })}
          className="w-full p-2 border rounded-lg"
        >
          <option value="0">Any Rating</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Availability</h3>
        <select
          value={filters.availability}
          onChange={(e) => onFilterChange({ ...filters, availability: e.target.value })}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Any Availability</option>
          <option value="in-stock">In Stock</option>
          <option value="pre-order">Pre-order</option>
          <option value="limited">Limited Availability</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button
          onClick={() => onFilterChange({
            category: '',
            subCategory: '',
            type: '',
            location: '',
            maxDistance: 50,
            minPrice: 0,
            maxPrice: 1000,
            minRating: 0,
            availability: ''
          })}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          Reset
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default FilterPanel;