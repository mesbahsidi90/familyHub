import React, { useState } from 'react';
import { PlusCircle, CheckCircle, Circle } from 'lucide-react';
import type { Task } from '../types';

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
  });

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      id: crypto.randomUUID(),
      ...newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', assignedTo: '', dueDate: '' });
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Family Tasks</h2>
      
      <form onSubmit={addTask} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Assign to"
            value={newTask.assignedTo}
            onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })}
            className="flex-1 p-2 border rounded"
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
            className="flex-1 p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
        >
          <PlusCircle size={20} /> Add Task
        </button>
      </form>

      <div className="space-y-2">
        {tasks.map(task => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50"
          >
            <button
              onClick={() => toggleTask(task.id)}
              className="text-gray-500 hover:text-blue-500"
            >
              {task.completed ? <CheckCircle className="text-green-500" /> : <Circle />}
            </button>
            <div className="flex-1">
              <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                {task.title}
              </h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <div className="text-xs text-gray-500 mt-1">
                Assigned to: {task.assignedTo} • Due: {task.dueDate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}