import React from 'react';
import Modal from '../common/Modal';
import type { Event } from '../../types';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Omit<Event, 'id'>) => void;
}

export default function EventForm({ isOpen, onClose, onSubmit }: EventFormProps) {
  const [formData, setFormData] = React.useState({
    title: '',
    date: '',
    time: '',
    description: '',
    participants: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      participants: formData.participants.split(',').map(p => p.trim()),
    });
    setFormData({ title: '', date: '', time: '', description: '', participants: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Event">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event title"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex gap-4">
          <input
            type="date"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
            className="flex-1 p-2 border rounded"
            required
          />
          <input
            type="time"
            value={formData.time}
            onChange={e => setFormData({ ...formData, time: e.target.value })}
            className="flex-1 p-2 border rounded"
            required
          />
        </div>
        <textarea
          placeholder="Event description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded"
          rows={3}
        />
        <input
          type="text"
          placeholder="Participants (comma-separated)"
          value={formData.participants}
          onChange={e => setFormData({ ...formData, participants: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
        >
          Add Event
        </button>
      </form>
    </Modal>
  );
}