import React from 'react';
import FamilyTaskList from '../components/tasks/FamilyTaskList';
import { useTranslation } from '../hooks/useTranslation';
import type { Task } from '../types';

interface TasksPageProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

export default function TasksPage({ tasks, onToggleTask }: TasksPageProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{t('tasks')}</h1>
        <div className="text-sm text-gray-500">
          {tasks.filter(t => t.completed).length}/{tasks.length} {t('completed')}
        </div>
      </div>
      <FamilyTaskList tasks={tasks} onToggleTask={onToggleTask} />
    </div>
  );
}