import React, { useState } from 'react';
import { User, Settings, LogOut, Bell, ChevronDown, Wallet, BookOpen, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import NotificationCenter from './NotificationCenter';

function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [userStats] = useState({
    level: 12,
    experience: 1250,
    nextLevel: 1500,
    achievements: 8
  });

  return (
    <div className="relative">
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <NotificationCenter />

        {/* Profile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600"
        >
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <User className="w-5 h-5 text-purple-600" />
          </div>
          <span className="font-medium hidden md:block">Profile</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Enhanced Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500">john@example.com</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Level {userStats.level}</span>
                <span className="text-gray-600">{userStats.experience}/{userStats.nextLevel} XP</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${(userStats.experience / userStats.nextLevel) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="px-4 py-2 border-b">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-600">{userStats.achievements} Achievements</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-600">Level {userStats.level}</span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
            >
              <User className="w-4 h-4 mr-3" />
              Your Profile
            </Link>
            <Link
              to="/wallet"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
            >
              <Wallet className="w-4 h-4 mr-3" />
              Wallet & Rewards
            </Link>
            <Link
              to="/learn"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
            >
              <BookOpen className="w-4 h-4 mr-3" />
              Learning Progress
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Link>
          </div>

          {/* Footer Actions */}
          <div className="border-t py-2">
            <button
              className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              onClick={() => {
                // Handle logout
                setIsOpen(false);
              }}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;