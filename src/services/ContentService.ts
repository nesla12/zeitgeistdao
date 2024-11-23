export interface Post {
  author: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

export interface Member {
  name: string;
  status: 'online' | 'away';
}

export interface Topic {
  name: string;
  posts: number;
}

export class ContentService {
  async getFeedPosts(): Promise<Post[]> {
    return [
      {
        author: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        content: "Just completed my morning meditation session. The peace and clarity it brings is incredible!",
        likes: 24,
        comments: 8,
        timeAgo: "2h ago"
      },
      {
        author: "Michael Torres",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        content: "Excited to share my latest project on sustainable community gardens. Who's interested in collaborating?",
        likes: 45,
        comments: 12,
        timeAgo: "4h ago"
      }
    ];
  }

  async getActiveMembers(): Promise<Member[]> {
    return [
      { name: "Emma Wilson", status: "online" },
      { name: "James Lee", status: "online" },
      { name: "Maria Garcia", status: "away" }
    ];
  }

  async getTrendingTopics(): Promise<Topic[]> {
    return [
      { name: "Meditation", posts: 156 },
      { name: "Sustainability", posts: 89 },
      { name: "Personal Growth", posts: 234 }
    ];
  }
}

export const contentService = new ContentService();