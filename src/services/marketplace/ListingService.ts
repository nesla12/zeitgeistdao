import type { Listing } from '../../types/marketplace';

class ListingService {
  async getListings(filters?: any): Promise<Listing[]> {
    // Simulated API call
    return [
      {
        id: '1',
        title: "Handcrafted Meditation Cushion",
        price: "89.99",
        creator: "Eco Crafts Co.",
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&q=80",
        category: "physical",
        subCategory: "meditation",
        location: "Portland, OR",
        distance: 15.2,
        rating: 4.8,
        reviews: 124,
        tags: ["meditation", "handmade", "sustainable"],
        type: "new",
        description: "Premium quality meditation cushion made with sustainable materials",
        shipping: {
          worldwide: true,
          price: "12.99",
          time: "3-5 days",
          insurance: true
        }
      },
      {
        id: '2',
        title: "Digital Mindfulness Course",
        price: "49.99",
        creator: "Sarah Chen",
        image: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=500&q=80",
        category: "digital",
        subCategory: "courses",
        location: "Remote",
        distance: 0,
        rating: 4.9,
        reviews: 89,
        tags: ["mindfulness", "course", "digital"],
        type: "new",
        description: "Comprehensive mindfulness course with lifetime access",
        shipping: {
          worldwide: true,
          price: "0",
          time: "Instant delivery",
          insurance: false
        }
      }
    ];
  }

  async getListing(id: string): Promise<Listing | null> {
    const listings = await this.getListings();
    return listings.find(listing => listing.id === id) || null;
  }

  async createListing(listing: Partial<Listing>): Promise<Listing> {
    // Simulated API call
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...listing
    } as Listing;
  }

  async updateListing(id: string, updates: Partial<Listing>): Promise<Listing> {
    // Simulated API call
    return {
      id,
      ...updates
    } as Listing;
  }

  async deleteListing(id: string): Promise<boolean> {
    // Simulated API call
    return true;
  }

  async getFeaturedListings(): Promise<Listing[]> {
    const listings = await this.getListings();
    return listings.slice(0, 4);
  }

  async searchListings(query: string): Promise<Listing[]> {
    const listings = await this.getListings();
    return listings.filter(listing => 
      listing.title.toLowerCase().includes(query.toLowerCase()) ||
      listing.description?.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export const listingService = new ListingService();