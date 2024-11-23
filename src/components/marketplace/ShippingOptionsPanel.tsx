import React, { useState, useEffect } from 'react';
import { Package, Shield, Info, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { shippingService } from '../../services/marketplace/ShippingService';
import type { ShippingOption, ShippingInsurance } from '../../types/marketplace';

interface ShippingOptionsPanelProps {
  itemValue: number;
  weight: number;
  dimensions: number[];
  destination: string;
  onSelect: (option: ShippingOption, insurance?: ShippingInsurance) => void;
}

function ShippingOptionsPanel({
  itemValue,
  weight,
  dimensions,
  destination,
  onSelect
}: ShippingOptionsPanelProps) {
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [insuranceOptions, setInsuranceOptions] = useState<ShippingInsurance[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<string>('');
  const [selectedInsurance, setSelectedInsurance] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [shipping, insurance] = await Promise.all([
          shippingService.getShippingOptions(weight, dimensions, destination),
          shippingService.getInsuranceOptions(itemValue)
        ]);
        setShippingOptions(shipping);
        setInsuranceOptions(insurance);
      } catch (error) {
        console.error('Failed to fetch shipping options:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOptions();
  }, [itemValue, weight, dimensions, destination]);

  const handleSelection = () => {
    const shipping = shippingOptions.find(opt => opt.id === selectedShipping);
    const insurance = insuranceOptions.find(opt => opt.provider === selectedInsurance);
    if (shipping) {
      onSelect(shipping, insurance);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-24 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Shipping Options */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Options</h3>
        <div className="space-y-4">
          {shippingOptions.map((option) => (
            <motion.div
              key={option.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedShipping === option.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'hover:border-gray-300'
              }`}
              onClick={() => setSelectedShipping(option.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-purple-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">{option.name}</h4>
                    <p className="text-sm text-gray-600">{option.estimatedDays}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-900">${option.price.toFixed(2)}</span>
                  {option.isInsured && (
                    <div className="flex items-center text-sm text-green-600">
                      <Shield className="w-4 h-4 mr-1" />
                      <span>Insured</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Insurance Options */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Shipping Protection</h3>
          <button className="text-purple-600 hover:text-purple-700">
            <Info className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          {insuranceOptions.map((option) => (
            <motion.div
              key={option.provider}
              whileHover={{ scale: 1.02 }}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedInsurance === option.provider
                  ? 'border-purple-500 bg-purple-50'
                  : 'hover:border-gray-300'
              }`}
              onClick={() => setSelectedInsurance(option.provider)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">{option.provider}</h4>
                    <p className="text-sm text-gray-600">Up to ${option.coverageAmount.toFixed(2)} coverage</p>
                  </div>
                </div>
                <span className="font-medium text-gray-900">${option.cost.toFixed(2)}</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                {option.terms.map((term, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Warning for High-Value Items */}
      {itemValue > 500 && (
        <div className="flex items-center space-x-2 p-4 bg-yellow-50 text-yellow-800 rounded-lg">
          <AlertTriangle className="w-5 h-5" />
          <p className="text-sm">
            This is a high-value item. Additional insurance is strongly recommended.
          </p>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleSelection}
        disabled={!selectedShipping}
        className={`w-full py-3 rounded-lg ${
          selectedShipping
            ? 'bg-purple-600 text-white hover:bg-purple-700'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        Continue with Selected Options
      </button>
    </div>
  );
}

export default ShippingOptionsPanel;