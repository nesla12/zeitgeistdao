import React, { useState } from 'react';
import { Filter, MapPin, Plus, Package, Laptop, Briefcase, Search, ArrowUpRight } from 'lucide-react';
import FilterPanel from './marketplace/FilterPanel';
import ListingCard from './marketplace/ListingCard';
import CreateListingDialog from './marketplace/CreateListingDialog';
import { useMarketplace } from '../hooks/useMarketplace';
import PageTransition from './shared/PageTransition';
import TrendingItems from './marketplace/TrendingItems';
import FeaturedSellers from './marketplace/FeaturedSellers';

function Marketplace() {
  const { listings, loading } = useMarketplace();
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState({
    location: '',
    searchRadius: 50,
    minPrice: 0,
    maxPrice: 1000,
    rating: 0,
    availability: '',
    shipping: false,
    verified: false,
    ecoFriendly: false
  });

  const categories = [
    { id: 'all', name: 'All Items', icon: Package, color: 'purple' },
    { id: 'physical', name: 'Physical Goods', icon: Package, color: 'blue' },
    { id: 'digital', name: 'Digital Products', icon: Laptop, color: 'indigo' },
    { id: 'services', name: 'Services', icon: Briefcase, color: 'green' }
  ];

  const filteredListings = listings.filter(listing => 
    (selectedCategory === 'all' || listing.category === selectedCategory) &&
    (listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     listing.description?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Marketplace</h1>
            <p className="text-lg text-gray-600">Discover conscious products and services</p>
          </div>
          <button
            onClick={() => setIsCreateListingOpen(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Create Listing</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5 text-gray-400" />
              <span>Filters</span>
            </button>
          </div>

          {/* Category Navigation */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isSelected
                        ? `bg-${category.color}-100 text-${category.color}-600 border-2 border-${category.color}-200`
                        : 'bg-white text-gray-600 border-2 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? `text-${category.color}-500` : 'text-gray-400'}`} />
                    <span className="font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Panel */}
          <div className="lg:col-span-1">
            <FilterPanel
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              filters={filters}
              onFilterChange={setFilters}
            />
            <FeaturedSellers />
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <TrendingItems />
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-t-xl" />
                    <div className="bg-white p-4 rounded-b-xl space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredListings.map((listing, index) => (
                  <ListingCard key={listing.id || index} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Create Listing Dialog */}
        <CreateListingDialog
          isOpen={isCreateListingOpen}
          onClose={() => setIsCreateListingOpen(false)}
        />
      </div>
    </PageTransition>
  );
}

export default Marketplace;