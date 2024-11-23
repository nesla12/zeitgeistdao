import { useState, useEffect } from 'react';
import { Group, GroupMessage } from '../types/messaging';
import { groupService } from '../services/messaging/GroupService';

export function useGroup(groupId: string) {
  const [group, setGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGroup() {
      try {
        const [groupData, messageData] = await Promise.all([
          groupService.getGroup(groupId),
          groupService.getMessages(groupId)
        ]);
        setGroup(groupData);
        setMessages(messageData);
      } catch (error) {
        console.error('Failed to load group data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadGroup();
  }, [groupId]);

  const sendMessage = async (content: string, attachments?: GroupMessage['attachments']) => {
    if (!group) return;

    const message: Omit<GroupMessage, 'id'> = {
      sender: {
        id: 'current-user',
        name: 'Current User',
        avatar: 'https://example.com/avatar.jpg'
      },
      content,
      time: new Date().toLocaleTimeString(),
      attachments
    };

    try {
      const newMessage = await groupService.sendMessage(groupId, message);
      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  const updateMemberRole = async (memberId: string, role: Group['members'][0]['role']) => {
    try {
      await groupService.updateMemberRole(groupId, memberId, role);
      setGroup(prev => {
        if (!prev) return null;
        return {
          ...prev,
          members: prev.members.map(member =>
            member.id === memberId ? { ...member, role } : member
          )
        };
      });
    } catch (error) {
      console.error('Failed to update member role:', error);
      throw error;
    }
  };

  const removeMember = async (memberId: string) => {
    try {
      await groupService.removeMember(groupId, memberId);
      setGroup(prev => {
        if (!prev) return null;
        return {
          ...prev,
          members: prev.members.filter(member => member.id !== memberId)
        };
      });
    } catch (error) {
      console.error('Failed to remove member:', error);
      throw error;
    }
  };

  return {
    group,
    messages,
    loading,
    sendMessage,
    updateMemberRole,
    removeMember
  };
}

export default useGroup;