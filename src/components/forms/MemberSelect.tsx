import React from 'react';
import { useFamilyMembers } from '../../hooks/useFamilyMembers';
import { useTranslation } from '../../hooks/useTranslation';

interface MemberSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MemberSelect({ value, onChange, placeholder }: MemberSelectProps) {
  const { members } = useFamilyMembers();
  const { t } = useTranslation();

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
      required
    >
      <option value="">{placeholder || t('assignTo')}</option>
      {members.map((member) => (
        <option key={member} value={member}>
          {member}
        </option>
      ))}
    </select>
  );
}