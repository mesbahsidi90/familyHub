import React, { useState } from 'react';
import TaskItem from './TaskItem';
import type { Task } from '../../types';

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-2">
        {tasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            onToggle={toggleTask}
          />
        ))}
        {tasks.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No tasks yet. Click the + button to add one!
          </p>
        )}
      </div>
    </div>
  );
}