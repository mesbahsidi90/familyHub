import React, { useEffect, useRef } from 'react';
import { suggestedTasks } from '../../data/suggestedTasks';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../hooks/useLanguage';

interface TaskSuggestionsProps {
  onSelect: (title: string) => void;
  filter: string;
  show: boolean;
  onClose: () => void;
}

export default function TaskSuggestions({ onSelect, filter, show, onClose }: TaskSuggestionsProps) {
  const { dir } = useTranslation();
  const { currentLanguage } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const filteredTasks = filter
    ? suggestedTasks.filter(task =>
        task.translations[currentLanguage as keyof typeof task.translations]
          .toLowerCase()
          .includes(filter.toLowerCase())
      )
    : suggestedTasks;

  if (!show) {
    return null;
  }

  return (
    <div 
      ref={ref}
      className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto"
      dir={dir}
    >
      <ul className="py-2">
        {filteredTasks.map(task => (
          <li key={task.id}>
            <button
              type="button"
              className="w-full text-left px-4 py-3 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onSelect(task.translations[currentLanguage as keyof typeof task.translations])}
            >
              {task.translations[currentLanguage as keyof typeof task.translations]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}