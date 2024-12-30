import React from 'react';
import { CheckSquare, Calendar, UtensilsCrossed, Settings, Info } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface SidebarProps {
  currentPage: 'tasks' | 'calendar' | 'meals' | 'settings' | 'info';
  onPageChange: (page: 'tasks' | 'calendar' | 'meals' | 'settings' | 'info') => void;
  onOpenSettings: () => void;
}

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const { t, dir } = useTranslation();
  
  const navItems = [
    { id: 'tasks', icon: CheckSquare, label: t('tasks') },
    { id: 'calendar', icon: Calendar, label: t('calendar') },
    { id: 'meals', icon: UtensilsCrossed, label: t('mealPlanner') },
  ] as const;

  const sidePosition = dir === 'rtl' ? 'right-0' : 'left-0';

  return (
    <aside className={`fixed top-16 ${sidePosition} w-20 bg-white dark:bg-gray-800 shadow-lg h-[calc(100vh-4rem)] transition-colors`}>
      <nav className="flex flex-col items-center py-3 h-full">
        <div className="space-y-4">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onPageChange(id as any)}
              className={`p-3 rounded-lg transition-colors duration-200 group relative ${
                currentPage === id
                  ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="icon-md" />
              <span className={`absolute ${dir === 'rtl' ? 'right-full mr-2' : 'left-full ml-2'} px-3 py-2 bg-gray-800 text-white text-lg rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20`}>
                {label}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-auto space-y-4">
          <button
            onClick={() => onPageChange('settings')}
            className={`p-3 rounded-lg transition-colors duration-200 group relative ${
              currentPage === 'settings'
                ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Settings className="icon-md" />
            <span className={`absolute ${dir === 'rtl' ? 'right-full mr-2' : 'left-full ml-2'} px-3 py-2 bg-gray-800 text-white text-lg rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20`}>
              {t('settings')}
            </span>
          </button>

          <button
            onClick={() => onPageChange('info')}
            className={`p-3 rounded-lg transition-colors duration-200 group relative ${
              currentPage === 'info'
                ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Info className="icon-md" />
            <span className={`absolute ${dir === 'rtl' ? 'right-full mr-2' : 'left-full ml-2'} px-3 py-2 bg-gray-800 text-white text-lg rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20`}>
              {t('about')}
            </span>
          </button>
        </div>
      </nav>
    </aside>
  );
}