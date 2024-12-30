import React, { useState } from 'react';
import Modal from '../common/Modal';
import MemberSelect from './MemberSelect';
import TaskSuggestions from '../tasks/TaskSuggestions';
import { useTranslation } from '../../hooks/useTranslation';
import type { Task, TaskFrequency } from '../../types';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'completed'>) => void;
}

export default function TaskForm({ isOpen, onClose, onSubmit }: TaskFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    frequency: 'daily' as TaskFrequency,
  });
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', description: '', assignedTo: '', frequency: 'daily' });
    onClose();
  };

  const handleSuggestionSelect = (title: string) => {
    setFormData(prev => ({ ...prev, title }));
    setShowSuggestions(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('addTask')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t('taskTitle')}
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            onFocus={() => setShowSuggestions(true)}
            className="w-full p-3 text-lg border rounded-lg focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <div className="relative">
            <TaskSuggestions
              onSelect={handleSuggestionSelect}
              filter={formData.title}
              show={showSuggestions}
              onClose={() => setShowSuggestions(false)}
            />
          </div>
        </div>
        
        <input
          type="text"
          placeholder={t('taskDescription')}
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-3 text-lg border rounded-lg focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        
        <div className="flex gap-4">
          <div className="flex-1">
            <MemberSelect
              value={formData.assignedTo}
              onChange={(value) => setFormData({ ...formData, assignedTo: value })}
              placeholder={t('assignTo')}
            />
          </div>
          <select
            value={formData.frequency}
            onChange={e => setFormData({ ...formData, frequency: e.target.value as TaskFrequency })}
            className="flex-1 p-3 text-lg border rounded-lg focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="daily">{t('daily')}</option>
            <option value="weekly">{t('weekly')}</option>
            <option value="monthly">{t('monthly')}</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full p-3 text-lg font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {t('addTask')}
        </button>
      </form>
    </Modal>
  );
}