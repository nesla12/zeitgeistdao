import React from 'react';
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function EventsSection() {
  const events = [
    {
      id: 1,
      title: "Mindfulness Meditation Workshop",
      date: "March 25, 2024",
      time: "2:00 PM",
      location: "Portland Community Center",
      attendees: 45,
      maxAttendees: 50,
      image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=500&q=80"
    },
    {
      id: 2,
      title: "Conscious Living Meetup",
      date: "March 28, 2024",
      time: "6:30 PM",
      location: "Green Space Garden",
      attendees: 28,
      maxAttendees: 30,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
        <button className="text-purple-600 hover:text-purple-700 flex items-center space-x-1">
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        {events.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.02 }}
            className="flex space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-2">{event.title}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{event.attendees}/{event.maxAttendees} attending</span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 h-fit">
              Join
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default EventsSection;