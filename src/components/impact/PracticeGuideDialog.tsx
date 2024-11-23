import React from 'react';
import { X, BookOpen, Lightbulb, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface PracticeGuideDialogProps {
  practice: {
    name: string;
    guide: {
      steps: string[];
      tips: string[];
      benefits: string[];
    };
  };
  onClose: () => void;
}

function PracticeGuideDialog({ practice, onClose }: PracticeGuideDialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{practice.name} Guide</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Practice Steps */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Practice Steps</h3>
            </div>
            <div className="space-y-3">
              {practice.guide.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <p className="text-gray-600">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Tips */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">Helpful Tips</h3>
            </div>
            <ul className="space-y-2">
              {practice.guide.tips.map((tip, index) => (
                <li key={index} className="flex items-center space-x-2 text-gray-600">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900">Benefits</h3>
            </div>
            <ul className="space-y-2">
              {practice.guide.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center space-x-2 text-gray-600">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Got It
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default PracticeGuideDialog;