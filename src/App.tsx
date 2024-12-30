import React, { useState, Suspense } from 'react';
import { useAuth } from './hooks/useAuth';
import { useLanguage } from './hooks/useLanguage';
import { useTranslation } from './hooks/useTranslation';
import { useTheme } from './hooks/useTheme';
import LoadingSpinner from './components/common/LoadingSpinner';
import AuthPage from './pages/AuthPage';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import TasksPage from './pages/TasksPage';
import CalendarPage from './pages/CalendarPage';
import MealsPage from './pages/MealsPage';
import SettingsPage from './pages/SettingsPage';
import InfoPage from './pages/InfoPage';
import FloatingButton from './components/common/FloatingButton';
import TaskForm from './components/forms/TaskForm';
import type { Task } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'tasks' | 'calendar' | 'meals' | 'settings' | 'info'>('tasks');
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const { dir } = useTranslation();
  const { isDark } = useTheme();
  const { user, loading: authLoading } = useAuth();
  const { loading: langLoading } = useLanguage();

  if (authLoading || langLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <AuthPage />;
  }

  const handleAddTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData,
      completed: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsTaskFormOpen(false);
  };

  const toggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'tasks':
        return <TasksPage tasks={tasks} onToggleTask={toggleTask} />;
      case 'calendar':
        return <CalendarPage />;
      case 'meals':
        return <MealsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'info':
        return <InfoPage />;
    }
  };

  const mainMargin = dir === 'rtl' ? 'mr-16' : 'ml-16';
  const floatingButtonPosition = dir === 'rtl' ? 'left-4' : 'right-4';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Header />
      <div className="flex pt-14">
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          onOpenSettings={() => setCurrentPage('settings')}
        />
        <main className={`flex-1 p-4 lg:p-6 ${mainMargin}`}>
          <div className="max-w-3xl mx-auto compact-spacing">
            {renderPage()}
          </div>
        </main>
      </div>
      {currentPage === 'tasks' && (
        <FloatingButton 
          onClick={() => setIsTaskFormOpen(true)} 
          className={`fixed bottom-4 ${floatingButtonPosition}`}
        />
      )}
      <TaskForm 
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSubmit={handleAddTask}
      />
    </div>
  );
}