import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader, Maximize2, Minimize2, Brain, Sparkles, Bot, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIMetrics {
  conversations: number;
  questionsAnswered: number;
  insightsShared: number;
}

function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { 
      type: 'ai', 
      content: 'Hello! I am your AI Guide on the path of consciousness evolution. How can I assist you today?',
      timestamp: new Date()
    }
  ]);

  const metrics: AIMetrics = {
    conversations: 1234,
    questionsAnswered: 5678,
    insightsShared: 890
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { type: 'user' as const, content: message, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const aiResponse = { 
        type: 'ai' as const, 
        content: generateAIResponse(message),
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "I understand your interest in consciousness evolution. Let me guide you through that...",
      "That's a fascinating question about personal growth. Here's what I think...",
      "Based on our platform's collective wisdom, I can suggest...",
      "Let me share some insights about that from our community's experience..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button - Always visible */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50 flex items-center space-x-2"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden md:inline">Ask AI Guide</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bg-white rounded-lg shadow-xl z-50 transition-all duration-300 ${
              isExpanded 
                ? 'top-6 left-6 right-6 bottom-6' 
                : 'bottom-24 right-6 w-96'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">AI Guide</h3>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowMetrics(!showMetrics)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <Sparkles className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  {isExpanded ? (
                    <Minimize2 className="w-5 h-5" />
                  ) : (
                    <Maximize2 className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Metrics Panel */}
            <AnimatePresence>
              {showMetrics && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-b"
                >
                  <div className="grid grid-cols-3 gap-4 p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{metrics.conversations}</div>
                      <div className="text-xs text-gray-500">Conversations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{metrics.questionsAnswered}</div>
                      <div className="text-xs text-gray-500">Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{metrics.insightsShared}</div>
                      <div className="text-xs text-gray-500">Insights</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Messages */}
            <div className={`${isExpanded ? 'h-[calc(100%-8rem)]' : 'h-96'} overflow-y-auto p-4 space-y-4`}>
              {chatHistory.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="break-words">{msg.content}</span>
                      <span className="text-xs mt-1 opacity-75">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-500">AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything about consciousness evolution..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-purple-600"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping || !message.trim()}
                  className={`p-2 rounded-lg ${
                    isTyping || !message.trim()
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChat;