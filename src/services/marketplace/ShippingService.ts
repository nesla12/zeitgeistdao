import type { ShippingOption, ShippingInsurance, ShippingRestriction } from '../../types/marketplace';

class ShippingService {
  async getShippingOptions(weight: number, dimensions: number[], destination: string): Promise<ShippingOption[]> {
    return [
      {
        id: 'standard',
        name: 'Standard Shipping',
        price: 5.99,
        estimatedDays: '5-7 business days',
        isInsured: false,
        insuranceValue: 0,
        carrier: 'USPS',
        trackingAvailable: true
      },
      {
        id: 'express',
        name: 'Express Shipping',
        price: 12.99,
        estimatedDays: '2-3 business days',
        isInsured: true,
        insuranceValue: 100,
        carrier: 'UPS',
        trackingAvailable: true
      },
      {
        id: 'priority',
        name: 'Priority Insured',
        price: 24.99,
        estimatedDays: '1-2 business days',
        isInsured: true,
        insuranceValue: 500,
        carrier: 'FedEx',
        trackingAvailable: true
      }
    ];
  }

  async getInsuranceOptions(itemValue: number): Promise<ShippingInsurance[]> {
    return [
      {
        provider: 'Platform Protection',
        coverageAmount: itemValue,
        cost: itemValue * 0.02, // 2% of item value
        description: 'Full coverage against loss, damage, or theft',
        terms: [
          'Coverage during transit only',
          'Claims must be filed within 30 days',
          'Proof of value required'
        ]
      },
      {
        provider: 'Premium Protection',
        coverageAmount: itemValue * 1.5,
        cost: itemValue * 0.035, // 3.5% of item value
        description: 'Extended coverage with additional benefits',
        terms: [
          'Coverage during transit and 30 days after delivery',
          'No deductible',
          'Instant claim processing'
        ]
      }
    ];
  }

  async getShippingRestrictions(): Promise<ShippingRestriction[]> {
    return [
      {
        type: 'country',
        value: 'International',
        reason: 'Shipping insurance not available for international shipments'
      },
      {
        type: 'item',
        value: 'fragile',
        reason: 'Special packaging required for fragile items'
      },
      {
        type: 'region',
        value: 'remote',
        reason: 'Additional fees apply for remote locations'
      }
    ];
  }
}

export const shippingService = new ShippingService();