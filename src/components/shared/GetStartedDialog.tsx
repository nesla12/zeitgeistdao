import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Gift, Sparkles, ArrowRight, X, Copy, Check, Share2 } from 'lucide-react';

interface GetStartedDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function GetStartedDialog({ isOpen, onClose }: GetStartedDialogProps) {
  const [activeTab, setActiveTab] = useState<'personal' | 'collaborate' | 'refer'>('personal');
  const [referralCode] = useState('ZEIT2024');
  const [copied, setCopied] = useState(false);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Get Started with ZEITGEIST</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex-1 px-6 py-3 text-sm font-medium ${
              activeTab === 'personal'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Personal Journey
          </button>
          <button
            onClick={() => setActiveTab('collaborate')}
            className={`flex-1 px-6 py-3 text-sm font-medium ${
              activeTab === 'collaborate'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Collaborate
          </button>
          <button
            onClick={() => setActiveTab('refer')}
            className={`flex-1 px-6 py-3 text-sm font-medium ${
              activeTab === 'refer'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Refer & Earn
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'personal' && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Your Goals</h3>
                    <p className="text-gray-600 mb-4">Define your consciousness evolution journey</p>
                    <button className="flex items-center text-purple-600 hover:text-purple-700">
                      <span>Start Now</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Progress</h3>
                    <p className="text-gray-600 mb-4">Monitor your growth and achievements</p>
                    <button className="flex items-center text-green-600 hover:text-green-700">
                      <span>View Dashboard</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'collaborate' && (
              <motion.div
                key="collaborate"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border p-6 rounded-xl">
                    <Users className="w-8 h-8 text-purple-600 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Join a Circle</h3>
                    <p className="text-gray-600 mb-4">Connect with like-minded individuals</p>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                      Browse Circles
                    </button>
                  </div>
                  <div className="border p-6 rounded-xl">
                    <Sparkles className="w-8 h-8 text-purple-600 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Create a Project</h3>
                    <p className="text-gray-600 mb-4">Start your own initiative</p>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                      Start Project
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'refer' && (
              <motion.div
                key="refer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <Gift className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Share & Earn Rewards</h3>
                  <p className="text-gray-600">Invite friends and earn consciousness tokens</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">Your Referral Code</span>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white px-3 py-1 rounded-lg border text-purple-600 font-mono">
                        {referralCode}
                      </code>
                      <button
                        onClick={copyReferralCode}
                        className="p-2 text-gray-400 hover:text-purple-600"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <button className="flex items-center justify-center space-x-2 w-full bg-[#1DA1F2] text-white p-3 rounded-lg hover:bg-[#1a8cd8]">
                      <Share2 className="w-5 h-5" />
                      <span>Share on Twitter</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 w-full bg-[#0A66C2] text-white p-3 rounded-lg hover:bg-[#084d92]">
                      <Share2 className="w-5 h-5" />
                      <span>Share on LinkedIn</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 mb-1">5</div>
                    <div className="text-sm text-gray-600">Friends Invited</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 mb-1">3</div>
                    <div className="text-sm text-gray-600">Joined</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 mb-1">150</div>
                    <div className="text-sm text-gray-600">Tokens Earned</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default GetStartedDialog;