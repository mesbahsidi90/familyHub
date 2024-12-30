import React from 'react';
import { CheckCircle, Circle, RepeatIcon } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import type { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 p-2 bg-white/80 rounded hover:bg-white transition-colors">
      <button
        onClick={() => onToggle(task.id)}
        className="text-gray-400 hover:text-purple-500 transition-colors"
      >
        {task.completed ? (
          <CheckCircle className="text-green-500" size={20} />
        ) : (
          <Circle size={20} />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {task.title}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <RepeatIcon size={12} />
          <span>{t(task.frequency)}</span>
        </div>
      </div>
    </div>
  );
}