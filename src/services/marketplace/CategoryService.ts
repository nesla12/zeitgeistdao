import type { Category, Subcategory } from '../../types/marketplace';
import { Package, Book, Laptop, Heart, Leaf, Paint } from 'lucide-react';

class CategoryService {
  async getCategories(): Promise<Category[]> {
    return [
      {
        id: 'meditation',
        name: 'Meditation & Mindfulness',
        icon: 'Brain',
        description: 'Tools and accessories for meditation practice',
        shippingRequired: true,
        insuranceRequired: true,
        minInsuranceValue: 50,
        subcategories: [
          {
            id: 'cushions',
            name: 'Meditation Cushions',
            description: 'Zafus, meditation pillows, and floor cushions',
            allowedConditions: ['new', 'like-new']
          },
          {
            id: 'mats',
            name: 'Meditation Mats',
            description: 'Traditional meditation and prayer mats',
            allowedConditions: ['new', 'like-new']
          },
          {
            id: 'accessories',
            name: 'Meditation Accessories',
            description: 'Bells, timers, and other meditation tools',
            allowedConditions: ['new', 'like-new', 'good']
          }
        ]
      },
      {
        id: 'crystals',
        name: 'Crystals & Stones',
        icon: 'Diamond',
        description: 'Natural crystals and healing stones',
        shippingRequired: true,
        insuranceRequired: true,
        minInsuranceValue: 100,
        subcategories: [
          {
            id: 'raw',
            name: 'Raw Crystals',
            description: 'Unpolished natural crystals',
            allowedConditions: ['new'],
            requiresAuthentication: true
          },
          {
            id: 'polished',
            name: 'Polished Stones',
            description: 'Tumbled and polished healing stones',
            allowedConditions: ['new'],
            requiresAuthentication: true
          },
          {
            id: 'jewelry',
            name: 'Crystal Jewelry',
            description: 'Wearable crystal pieces',
            allowedConditions: ['new', 'like-new'],
            requiresVerification: true
          }
        ]
      },
      {
        id: 'sustainable',
        name: 'Sustainable Living',
        icon: 'Leaf',
        description: 'Eco-friendly products and tools',
        shippingRequired: true,
        insuranceRequired: false,
        subcategories: [
          {
            id: 'home',
            name: 'Home & Living',
            description: 'Sustainable household items',
            allowedConditions: ['new', 'like-new', 'good']
          },
          {
            id: 'personal-care',
            name: 'Personal Care',
            description: 'Natural and eco-friendly care products',
            allowedConditions: ['new']
          },
          {
            id: 'zero-waste',
            name: 'Zero Waste',
            description: 'Reusable and plastic-free alternatives',
            allowedConditions: ['new', 'like-new']
          }
        ]
      }
    ];
  }

  async getConditions(): Promise<ListingCondition[]> {
    return [
      {
        id: 'new',
        label: 'New',
        description: 'Brand new, unused item in original packaging'
      },
      {
        id: 'like-new',
        label: 'Like New',
        description: 'Used once or twice, in perfect condition'
      },
      {
        id: 'good',
        label: 'Good',
        description: 'Used but well maintained, fully functional'
      },
      {
        id: 'fair',
        label: 'Fair',
        description: 'Shows signs of use but still functional'
      }
    ];
  }
}

export const categoryService = new CategoryService();