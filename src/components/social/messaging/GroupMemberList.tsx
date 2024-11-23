import React, { useState } from 'react';
import { X, Crown, MoreVertical, UserPlus, Shield, Ban } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'member';
  status: 'online' | 'offline';
  joinedDate: string;
}

interface GroupMemberListProps {
  members: Member[];
  onClose: () => void;
  onAddMember: () => void;
  onUpdateMemberRole: (memberId: string, role: Member['role']) => void;
  onRemoveMember: (memberId: string) => void;
}

function GroupMemberList({ members, onClose, onAddMember, onUpdateMemberRole, onRemoveMember }: GroupMemberListProps) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const handleMemberAction = (memberId: string, action: 'promote' | 'demote' | 'remove') => {
    switch (action) {
      case 'promote':
        onUpdateMemberRole(memberId, 'moderator');
        break;
      case 'demote':
        onUpdateMemberRole(memberId, 'member');
        break;
      case 'remove':
        onRemoveMember(memberId);
        break;
    }
    setSelectedMember(null);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="w-80 bg-white border-l flex flex-col"
    >
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-900">Group Members</h3>
          <p className="text-sm text-gray-500">{members.length} members</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {members.map((member) => (
          <div
            key={member.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{member.name}</span>
                  {member.role === 'admin' && (
                    <Crown className="w-4 h-4 text-yellow-500" />
                  )}
                  {member.role === 'moderator' && (
                    <Shield className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <span className="text-sm text-gray-500 capitalize">{member.role}</span>
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {selectedMember === member.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10"
                  >
                    {member.role !== 'admin' && (
                      <>
                        {member.role === 'member' && (
                          <button
                            onClick={() => handleMemberAction(member.id, 'promote')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <Shield className="w-4 h-4" />
                            <span>Make Moderator</span>
                          </button>
                        )}
                        {member.role === 'moderator' && (
                          <button
                            onClick={() => handleMemberAction(member.id, 'demote')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <Shield className="w-4 h-4" />
                            <span>Remove Moderator</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleMemberAction(member.id, 'remove')}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Ban className="w-4 h-4" />
                          <span>Remove from Group</span>
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <button
          onClick={onAddMember}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add Member</span>
        </button>
      </div>
    </motion.div>
  );
}

export default GroupMemberList;