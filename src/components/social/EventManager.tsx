import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Plus, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../shared/PageTransition';

function EventManager() {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [filter, setFilter] = useState('all');

  const events = [
    {
      id: '1',
      title: 'Mindfulness Meditation Workshop',
      description: 'Join us for a guided meditation session focused on mindfulness and presence.',
      date: '2024-03-25',
      time: '14:00',
      location: 'Portland Community Center',
      organizer: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
      },
      attendees: 45,
      maxAttendees: 50,
      category: 'workshop',
      image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=500&q=80'
    },
    {
      id: '2',
      title: 'Conscious Living Meetup',
      description: 'Monthly gathering to discuss sustainable living practices and share experiences.',
      date: '2024-03-28',
      time: '18:30',
      location: 'Green Space Garden',
      organizer: {
        name: 'David Kumar',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      },
      attendees: 28,
      maxAttendees: 30,
      category: 'meetup',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80'
    }
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
            <p className="text-gray-600">Discover and join conscious gatherings</p>
          </div>
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Create Event</span>
          </button>
        </div>

        {/* View Toggle and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-lg ${
                  view === 'list'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`px-4 py-2 rounded-lg ${
                  view === 'calendar'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Calendar View
              </button>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Events</option>
              <option value="workshop">Workshops</option>
              <option value="meetup">Meetups</option>
              <option value="ceremony">Ceremonies</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="aspect-video relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{event.attendees}/{event.maxAttendees} attending</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={event.organizer.avatar}
                      alt={event.organizer.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-600">
                      Organized by {event.organizer.name}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Join Event
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

export default EventManager;