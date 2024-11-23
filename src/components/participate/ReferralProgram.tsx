import React, { useState } from 'react';
import { Gift, Users, TrendingUp, Copy, Share2, Award } from 'lucide-react';
import PageTransition from '../shared/PageTransition';

function ReferralProgram() {
  const [referralCode] = useState('ZEIT2024');
  const [copied, setCopied] = useState(false);

  const stats = {
    totalReferred: 156,
    activeReferrals: 89,
    totalEarned: '2,450 ECO'
  };

  const rewards = [
    {
      level: 'Bronze',
      requirement: '5 referrals',
      reward: '100 ECO per referral',
      bonus: '+5% on all earnings'
    },
    {
      level: 'Silver',
      requirement: '15 referrals',
      reward: '150 ECO per referral',
      bonus: '+10% on all earnings'
    },
    {
      level: 'Gold',
      requirement: '30 referrals',
      reward: '200 ECO per referral',
      bonus: '+15% on all earnings'
    }
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Referral Program</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share the gift of consciousness and earn rewards
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-6 h-6 text-purple-600" />
              <span className="text-sm text-green-600">+12 this month</span>
            </div>
            <p className="text-sm text-gray-600">Total Referred</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalReferred}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <span className="text-sm text-green-600">57% conversion</span>
            </div>
            <p className="text-sm text-gray-600">Active Referrals</p>
            <p className="text-2xl font-bold text-gray-900">{stats.activeReferrals}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Gift className="w-6 h-6 text-amber-600" />
              <span className="text-sm text-green-600">+450 this month</span>
            </div>
            <p className="text-sm text-gray-600">Total Earned</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalEarned}</p>
          </div>
        </div>

        {/* Referral Code */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Referral Code</h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-50 p-4 rounded-lg">
              <code className="text-lg font-mono text-purple-600">{referralCode}</code>
            </div>
            <button
              onClick={copyReferralCode}
              className="p-4 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
            >
              {copied ? (
                <span className="text-green-600">Copied!</span>
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
            <button className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reward Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rewards.map((tier, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Award className={`w-6 h-6 ${
                    index === 0 ? 'text-amber-600' :
                    index === 1 ? 'text-gray-400' :
                    'text-yellow-400'
                  }`} />
                  <h3 className="text-xl font-semibold text-gray-900">{tier.level}</h3>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">{tier.requirement}</p>
                  <p className="text-purple-600 font-medium">{tier.reward}</p>
                  <p className="text-green-600">{tier.bonus}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${(stats.totalReferred / parseInt(tier.requirement.split(' ')[0])) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Share Your Code</h3>
              <p className="text-gray-600">Share your unique referral code with friends</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Friends Join</h3>
              <p className="text-gray-600">They sign up using your referral code</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Earn Rewards</h3>
              <p className="text-gray-600">Get rewarded for growing the community</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default ReferralProgram;