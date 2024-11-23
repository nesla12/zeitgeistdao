export interface MarketStats {
  tradingVolume: string;
  feePool: string;
  activeListings: string;
}

export interface Listing {
  id: string;
  title: string;
  price: string;
  creator: string;
  image: string;
  category: 'physical' | 'digital' | 'service';
  subCategory: string;
  location: string;
  distance: number;
  rating: number;
  reviews: number;
  tags: string[];
  type: 'new' | 'used';
  condition?: string;
  availability?: 'in-stock' | 'pre-order' | 'limited';
  shipping?: {
    worldwide: boolean;
    price: string;
    time: string;
  };
  description?: string;
}

export interface Trade {
  item: string;
  price: string;
  time: string;
}

export class MarketplaceService {
  async getStats(): Promise<MarketStats> {
    return {
      tradingVolume: '$124,582',
      feePool: '$8,245',
      activeListings: '1,245'
    };
  }

  async getFeaturedListings(): Promise<Listing[]> {
    return [
      {
        id: '1',
        title: "Handcrafted Meditation Cushion",
        price: "89.99",
        creator: "Zen Crafts",
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&q=80",
        category: "physical",
        subCategory: "meditation",
        location: "Portland, OR",
        distance: 15.2,
        rating: 4.8,
        reviews: 124,
        tags: ["meditation", "handmade", "sustainable"],
        type: "new",
        condition: "new",
        availability: "in-stock",
        shipping: {
          worldwide: true,
          price: "12.99",
          time: "3-5 days"
        }
      },
      {
        id: '2',
        title: "1-on-1 Mindfulness Coaching",
        price: "120.00",
        creator: "Sarah Chen",
        image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=500&q=80",
        category: "service",
        subCategory: "coaching",
        location: "Remote",
        distance: 0,
        rating: 4.9,
        reviews: 89,
        tags: ["coaching", "mindfulness", "personal-growth"],
        type: "new",
        availability: "limited"
      }
    ];
  }

  async getRecentTrades(): Promise<Trade[]> {
    return [
      {
        item: "Meditation Cushion",
        price: "89.99",
        time: "2m ago"
      },
      {
        item: "Mindfulness Session",
        price: "120.00",
        time: "15m ago"
      },
      {
        item: "Crystal Set",
        price: "45.99",
        time: "45m ago"
      }
    ];
  }
}

export const marketplaceService = new MarketplaceService();