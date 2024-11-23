import { useState, useEffect } from 'react';
import { listingService } from '../services/marketplace/ListingService';
import type { Listing } from '../types/marketplace';

export function useMarketplace(filters?: any) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        setLoading(true);
        const data = await listingService.getListings(filters);
        setListings(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [filters]);

  const searchListings = async (query: string) => {
    try {
      setLoading(true);
      const results = await listingService.searchListings(query);
      setListings(results);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createListing = async (listing: Partial<Listing>) => {
    try {
      const newListing = await listingService.createListing(listing);
      setListings(prev => [...prev, newListing]);
      return newListing;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    listings,
    loading,
    error,
    searchListings,
    createListing
  };
}

export default useMarketplace;