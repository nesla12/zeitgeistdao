import { EventEmitter } from 'events';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name?: string;
  }[];
}

export interface Chat {
  id: string;
  type: 'direct' | 'group';
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

class MessagingService extends EventEmitter {
  private chats: Map<string, Chat> = new Map();
  private messages: Map<string, Message[]> = new Map();

  constructor() {
    super();
    // Initialize with mock data
    this.loadMockData();
  }

  private loadMockData() {
    // Add mock chats and messages here
    const mockChat: Chat = {
      id: '1',
      type: 'direct',
      participants: ['current-user', 'user-1'],
      unreadCount: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const mockMessages: Message[] = [
      {
        id: '1',
        chatId: '1',
        senderId: 'user-1',
        content: 'Hello! How are you?',
        timestamp: new Date(),
        read: false
      }
    ];

    this.chats.set(mockChat.id, mockChat);
    this.messages.set(mockChat.id, mockMessages);
  }

  async getChats(): Promise<Chat[]> {
    return Array.from(this.chats.values());
  }

  async getMessages(chatId: string): Promise<Message[]> {
    return this.messages.get(chatId) || [];
  }

  async sendMessage(chatId: string, content: string, attachments?: Message['attachments']): Promise<Message> {
    const message: Message = {
      id: Date.now().toString(),
      chatId,
      senderId: 'current-user',
      content,
      timestamp: new Date(),
      read: false,
      attachments
    };

    const chatMessages = this.messages.get(chatId) || [];
    chatMessages.push(message);
    this.messages.set(chatId, chatMessages);

    const chat = this.chats.get(chatId);
    if (chat) {
      chat.lastMessage = message;
      chat.updatedAt = new Date();
      this.chats.set(chatId, chat);
    }

    // Emit event for real-time updates
    this.emit('newMessage', message);
    return message;
  }

  async markAsRead(chatId: string, messageIds: string[]): Promise<void> {
    const chatMessages = this.messages.get(chatId);
    if (chatMessages) {
      chatMessages.forEach(message => {
        if (messageIds.includes(message.id)) {
          message.read = true;
        }
      });
      this.messages.set(chatId, chatMessages);

      const chat = this.chats.get(chatId);
      if (chat) {
        chat.unreadCount = chatMessages.filter(m => !m.read).length;
        this.chats.set(chatId, chat);
      }

      this.emit('messagesRead', { chatId, messageIds });
    }
  }

  onNewMessage(callback: (message: Message) => void) {
    this.on('newMessage', callback);
    return () => this.off('newMessage', callback);
  }

  onMessagesRead(callback: (data: { chatId: string; messageIds: string[] }) => void) {
    this.on('messagesRead', callback);
    return () => this.off('messagesRead', callback);
  }
}

export const messagingService = new MessagingService();