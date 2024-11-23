import React, { useState, useEffect } from 'react';
import { Bell, X, Check, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'achievement' | 'system' | 'social' | 'learning';
  read?: boolean;
}

function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Achievement Unlocked!",
      description: "You've reached Level 10 in Mindfulness",
      time: "2h ago",
      type: "achievement",
      read: false
    },
    {
      id: 2,
      title: "New Course Available",
      description: "Explore our latest mindfulness course",
      time: "5h ago",
      type: "learning",
      read: false
    },
    {
      id: 3,
      title: "Community Milestone",
      description: "We've collectively planted 1000+ trees!",
      time: "1d ago",
      type: "social",
      read: true
    }
  ]);

  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const unreadCount = notifications.filter(n => !n.read).length;
    setShowBadge(unreadCount > 0);
  }, [notifications]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <div className="w-2 h-2 bg-yellow-400 rounded-full" />;
      case 'learning':
        return <div className="w-2 h-2 bg-blue-500 rounded-full" />;
      case 'social':
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-purple-500 rounded-full" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-purple-600 rounded-full hover:bg-purple-50"
      >
        <Bell className="w-5 h-5" />
        <AnimatePresence>
          {showBadge && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"
            />
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-purple-600 hover:text-purple-700 flex items-center"
                >
                  <CheckCheck className="w-4 h-4 mr-1" />
                  Mark all as read
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="divide-y max-h-[calc(100vh-200px)] overflow-y-auto">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    notification.read ? 'opacity-75' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium text-gray-900">{notification.title}</p>
                        <span className="text-sm text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.description}
                      </p>
                    </div>
                    {notification.read ? (
                      <Check className="w-4 h-4 text-gray-400" />
                    ) : (
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                    )}
                  </div>
                </motion.div>
              ))}

              {notifications.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No new notifications
                </div>
              )}
            </div>

            <div className="p-3 bg-gray-50 border-t text-center">
              <button
                className="text-sm text-purple-600 hover:text-purple-700"
                onClick={() => {/* Handle view all */}}
              >
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NotificationCenter;