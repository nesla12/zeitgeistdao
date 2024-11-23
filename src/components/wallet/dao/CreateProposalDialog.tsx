import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import useGovernance from '../../../hooks/dao/useGovernance';

interface CreateProposalDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateProposalDialog({ isOpen, onClose }: CreateProposalDialogProps) {
  const { createProposal } = useGovernance();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createProposal({
        title,
        description,
        status: 'active',
        votes: { for: 0, against: 0, participation: 0 },
        timeLeft: '7 days',
        creator: {
          name: 'Current User',
          avatar: 'https://example.com/avatar.jpg'
        }
      });
      onClose();
    } catch (error) {
      console.error('Failed to create proposal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Create Proposal</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter proposal title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
              placeholder="Describe your proposal"
              required
            />
          </div>

          <div className="flex items-start space-x-2 p-4 bg-blue-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Important Information</p>
              <p>Proposals require a minimum of 1000 ZTG tokens staked to be eligible for submission.
                 The voting period lasts for 7 days.</p>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title || !description}
              className={`px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 ${
                isSubmitting || !title || !description ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Creating...' : 'Create Proposal'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default CreateProposalDialog;