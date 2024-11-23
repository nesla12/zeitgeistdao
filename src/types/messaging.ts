import { ReactNode } from 'react';

export interface Group {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  members: GroupMember[];
  settings: {
    notifications: boolean;
    privacy: 'public' | 'private';
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'member';
  status: 'online' | 'offline';
  joinedDate: string;
}

export interface GroupMessage {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  reactions?: {
    type: string;
    users: string[];
  }[];
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name?: string;
  }[];
}