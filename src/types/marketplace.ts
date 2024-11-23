// Add to existing file

export interface CheckoutItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  shipping?: {
    method: string;
    cost: number;
    insurance?: {
      provider: string;
      cost: number;
      coverage: number;
    };
  };
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'crypto' | 'platform-token';
  details: {
    name?: string;
    last4?: string;
    network?: string;
  };
}

export interface ShippingAddress {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface CheckoutState {
  items: CheckoutItem[];
  subtotal: number;
  shipping: number;
  insurance: number;
  tax: number;
  total: number;
  paymentMethod?: PaymentMethod;
  shippingAddress?: ShippingAddress;
}

export interface MarketplaceCategory {
  id: string;
  name: string;
  description: string;
  subcategories: {
    id: string;
    name: string;
    description: string;
  }[];
}

export const MARKETPLACE_CATEGORIES: MarketplaceCategory[] = [
  {
    id: 'second-hand',
    name: 'Second Hand',
    description: 'Pre-loved conscious items',
    subcategories: [
      {
        id: 'meditation',
        name: 'Meditation & Mindfulness',
        description: 'Cushions, mats, and tools'
      },
      {
        id: 'crystals',
        name: 'Crystals & Stones',
        description: 'Natural healing stones'
      },
      {
        id: 'books',
        name: 'Books & Journals',
        description: 'Wisdom literature and journals'
      }
    ]
  },
  {
    id: 'digital',
    name: 'Digital Products',
    description: 'Digital resources and tools',
    subcategories: [
      {
        id: 'courses',
        name: 'Online Courses',
        description: 'Self-paced learning materials'
      },
      {
        id: 'meditations',
        name: 'Guided Meditations',
        description: 'Audio and video guides'
      },
      {
        id: 'ebooks',
        name: 'Digital Books',
        description: 'eBooks and PDFs'
      }
    ]
  },
  {
    id: 'services',
    name: 'Services',
    description: 'Professional conscious services',
    subcategories: [
      {
        id: 'coaching',
        name: 'Personal Coaching',
        description: 'One-on-one guidance'
      },
      {
        id: 'healing',
        name: 'Healing Sessions',
        description: 'Energy and alternative healing'
      },
      {
        id: 'workshops',
        name: 'Live Workshops',
        description: 'Interactive group sessions'
      }
    ]
  },
  {
    id: 'new-products',
    name: 'New Products',
    description: 'Curated items from trusted vendors',
    subcategories: [
      {
        id: 'amazon',
        name: 'Amazon Selection',
        description: 'Prime-eligible conscious products'
      },
      {
        id: 'etsy',
        name: 'Etsy Artisans',
        description: 'Handcrafted conscious items'
      },
      {
        id: 'eco-brands',
        name: 'Eco-Friendly Brands',
        description: 'Sustainable product lines'
      }
    ]
  }
];