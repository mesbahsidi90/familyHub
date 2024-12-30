import React from 'react';
import TaskItem from './TaskItem';
import { useTranslation } from '../../hooks/useTranslation';
import type { Task } from '../../types';

interface MemberColumnProps {
  member: string;
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

export default function MemberColumn({ member, tasks, onToggleTask }: MemberColumnProps) {
  const { t } = useTranslation();

  // Generate a pastel background color based on the member name
  const getBackgroundColor = (name: string) => {
    const colors = [
      'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-pink-50',
      'bg-purple-50', 'bg-indigo-50', 'bg-red-50', 'bg-orange-50'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className={`rounded-lg shadow-sm ${getBackgroundColor(member)} p-4`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-600 font-medium">
          {member[0].toUpperCase()}
        </div>
        <h3 className="font-medium text-gray-900">{member}</h3>
        <div className="text-sm text-gray-500 ml-auto">
          {tasks.filter(t => t.completed).length}/{tasks.length}
        </div>
      </div>
      
      <div className="space-y-2">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
          />
        ))}
        {tasks.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            {t('noTasks')}
          </p>
        )}
      </div>
    </div>
  );
}