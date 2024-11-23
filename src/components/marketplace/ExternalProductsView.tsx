import React, { useState, useEffect } from 'react';
import { Filter, Search, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import ExternalProductCard from './ExternalProductCard';
import { externalProductService } from '../../services/marketplace/ExternalProductService';
import type { ExternalProduct, ExternalVendor } from '../../types/marketplace';

function ExternalProductsView() {
  const [products, setProducts] = useState<ExternalProduct[]>([]);
  const [vendors, setVendors] = useState<ExternalVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showSponsored, setShowSponsored] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, vendorsData] = await Promise.all([
          externalProductService.getExternalProducts(searchQuery),
          externalProductService.getVendors()
        ]);
        setProducts(productsData);
        setVendors(vendorsData);
      } catch (error) {
        console.error('Failed to fetch external products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [searchQuery]);

  const filteredProducts = products.filter(product => {
    const matchesVendor = selectedVendors.length === 0 || selectedVendors.includes(product.vendor);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSponsored = showSponsored || !product.sponsored;
    return matchesVendor && matchesPrice && matchesSponsored;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">External Products</h1>
          <p className="text-gray-600">Discover products from trusted vendors</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Search..."
                />
              </div>
            </div>

            {/* Vendor Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendors
              </label>
              <div className="space-y-2">
                {vendors.map((vendor) => (
                  <label key={vendor.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedVendors.includes(vendor.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedVendors([...selectedVendors, vendor.id]);
                        } else {
                          setSelectedVendors(selectedVendors.filter(v => v !== vendor.id));
                        }
                      }}
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-700">{vendor.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
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

            {/* Additional Filters */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showSponsored}
                  onChange={(e) => setShowSponsored(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">Show Sponsored</span>
              </label>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <ExternalProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExternalProductsView;