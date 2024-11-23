import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ThumbsUp, Star, Smile, Coffee, Zap } from 'lucide-react';

interface MessageReactionsProps {
  onReact: (reaction: string) => void;
}

function MessageReactions({ onReact }: MessageReactionsProps) {
  const reactions = [
    { emoji: '👍', icon: ThumbsUp },
    { emoji: '❤️', icon: Heart },
    { emoji: '⭐', icon: Star },
    { emoji: '😊', icon: Smile },
    { emoji: '☕', icon: Coffee },
    { emoji: '⚡', icon: Zap }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute -top-10 right-0 bg-white rounded-full shadow-lg p-2 flex items-center space-x-2"
    >
      {reactions.map((reaction, index) => {
        const Icon = reaction.icon;
        return (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onReact(reaction.emoji)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Icon className="w-4 h-4 text-gray-600" />
          </motion.button>
        );
      })}
    </motion.div>
  );
}

export default MessageReactions;