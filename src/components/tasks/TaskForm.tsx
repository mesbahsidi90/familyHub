import React from 'react';
import { PlusCircle } from 'lucide-react';

interface TaskFormProps {
  newTask: {
    title: string;
    description: string;
    assignedTo: string;
    dueDate: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string) => void;
}

export default function TaskForm({ newTask, onSubmit, onChange }: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-6 space-y-4">
      <input
        type="text"
        placeholder="Task title"
        value={newTask.title}
        onChange={e => onChange('title', e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={newTask.description}
        onChange={e => onChange('description', e.target.value)}
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Assign to"
          value={newTask.assignedTo}
          onChange={e => onChange('assignedTo', e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <input
          type="date"
          value={newTask.dueDate}
          onChange={e => onChange('dueDate', e.target.value)}
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
  );
}