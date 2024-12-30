import React, { useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import { useFamilyMembers } from '../../hooks/useFamilyMembers';

export default function FamilyMembers() {
  const { members, addMember, removeMember } = useFamilyMembers();
  const [newMember, setNewMember] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMember.trim()) {
      addMember(newMember.trim());
      setNewMember('');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Family Members</h3>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="Add family member"
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          <UserPlus size={20} />
        </button>
      </form>
      <div className="space-y-2">
        {members.map((member) => (
          <div
            key={member}
            className="flex items-center justify-between p-2 rounded bg-gray-50"
          >
            <span>{member}</span>
            <button
              onClick={() => removeMember(member)}
              className="text-gray-500 hover:text-red-500"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}