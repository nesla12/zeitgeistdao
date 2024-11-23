import { Group, GroupMember, GroupMessage } from '../../types/messaging';

class GroupService {
  private groups: Map<string, Group> = new Map();
  private messages: Map<string, GroupMessage[]> = new Map();

  constructor() {
    // Initialize with mock data
    this.loadMockData();
  }

  private loadMockData() {
    const mockGroup: Group = {
      id: '1',
      name: 'Mindfulness Circle',
      description: 'A group for mindfulness practitioners',
      members: [
        {
          id: '1',
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          role: 'admin',
          status: 'online',
          joinedDate: '2024-03-01'
        },
        {
          id: '2',
          name: 'David Kumar',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          role: 'moderator',
          status: 'offline',
          joinedDate: '2024-03-05'
        }
      ],
      settings: {
        notifications: true,
        privacy: 'public'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const mockMessages: GroupMessage[] = [
      {
        id: '1',
        sender: {
          id: '1',
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
        },
        content: 'Welcome to the Mindfulness Circle! 🧘‍♀️',
        time: '2:30 PM'
      }
    ];

    this.groups.set(mockGroup.id, mockGroup);
    this.messages.set(mockGroup.id, mockMessages);
  }

  async getGroup(groupId: string): Promise<Group | null> {
    return this.groups.get(groupId) || null;
  }

  async getMessages(groupId: string): Promise<GroupMessage[]> {
    return this.messages.get(groupId) || [];
  }

  async sendMessage(groupId: string, message: Omit<GroupMessage, 'id'>): Promise<GroupMessage> {
    const newMessage = {
      id: Date.now().toString(),
      ...message
    };

    const groupMessages = this.messages.get(groupId) || [];
    groupMessages.push(newMessage);
    this.messages.set(groupId, groupMessages);

    return newMessage;
  }

  async updateMemberRole(groupId: string, memberId: string, newRole: GroupMember['role']): Promise<void> {
    const group = this.groups.get(groupId);
    if (group) {
      group.members = group.members.map(member =>
        member.id === memberId ? { ...member, role: newRole } : member
      );
      this.groups.set(groupId, group);
    }
  }

  async removeMember(groupId: string, memberId: string): Promise<void> {
    const group = this.groups.get(groupId);
    if (group) {
      group.members = group.members.filter(member => member.id !== memberId);
      this.groups.set(groupId, group);
    }
  }

  async updateGroupSettings(groupId: string, settings: Group['settings']): Promise<void> {
    const group = this.groups.get(groupId);
    if (group) {
      group.settings = settings;
      group.updatedAt = new Date();
      this.groups.set(groupId, group);
    }
  }
}

export const groupService = new GroupService();