import { useState, useEffect } from 'react';
import { messagingService, Message, Chat } from '../services/messaging/MessagingService';

export function useMessaging() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChats() {
      try {
        const chatData = await messagingService.getChats();
        setChats(chatData);
      } catch (error) {
        console.error('Failed to load chats:', error);
      } finally {
        setLoading(false);
      }
    }

    loadChats();

    // Subscribe to real-time updates
    const unsubscribeNewMessage = messagingService.onNewMessage((message) => {
      setMessages(prev => [...prev, message]);
      setChats(prev => prev.map(chat => 
        chat.id === message.chatId 
          ? { ...chat, lastMessage: message, updatedAt: new Date() }
          : chat
      ));
    });

    const unsubscribeMessagesRead = messagingService.onMessagesRead(({ chatId, messageIds }) => {
      setMessages(prev => prev.map(message => 
        messageIds.includes(message.id) ? { ...message, read: true } : message
      ));
      setChats(prev => prev.map(chat =>
        chat.id === chatId
          ? { ...chat, unreadCount: Math.max(0, chat.unreadCount - messageIds.length) }
          : chat
      ));
    });

    return () => {
      unsubscribeNewMessage();
      unsubscribeMessagesRead();
    };
  }, []);

  useEffect(() => {
    if (activeChat) {
      async function loadMessages() {
        try {
          const messageData = await messagingService.getMessages(activeChat);
          setMessages(messageData);
        } catch (error) {
          console.error('Failed to load messages:', error);
        }
      }

      loadMessages();
    } else {
      setMessages([]);
    }
  }, [activeChat]);

  const sendMessage = async (content: string, attachments?: Message['attachments']) => {
    if (!activeChat) return;
    try {
      await messagingService.sendMessage(activeChat, content, attachments);
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  const markMessagesAsRead = async (messageIds: string[]) => {
    if (!activeChat) return;
    try {
      await messagingService.markAsRead(activeChat, messageIds);
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
      throw error;
    }
  };

  return {
    chats,
    messages,
    loading,
    activeChat,
    setActiveChat,
    sendMessage,
    markMessagesAsRead
  };
}

export default useMessaging;