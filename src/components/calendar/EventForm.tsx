import React, { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import type { Event } from '../../types';

interface EventFormProps {
  onSubmit: (event: Omit<Event, 'id'>) => void;
}

export default function EventForm({ onSubmit }: EventFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    participants: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      participants: formData.participants.length > 0 
        ? formData.participants 
        : []
    });
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      participants: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <input
        type="text"
        placeholder={t('eventTitle')}
        value={formData.title}
        onChange={e => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-2 border rounded-lg"
        required
      />
      <div className="flex gap-4">
        <input
          type="date"
          value={formData.date}
          onChange={e => setFormData({ ...formData, date: e.target.value })}
          className="flex-1 p-2 border rounded-lg"
          required
        />
        <input
          type="time"
          value={formData.time}
          onChange={e => setFormData({ ...formData, time: e.target.value })}
          className="flex-1 p-2 border rounded-lg"
          required
        />
      </div>
      <textarea
        placeholder={t('eventDescription')}
        value={formData.description}
        onChange={e => setFormData({ ...formData, description: e.target.value })}
        className="w-full p-2 border rounded-lg"
        rows={3}
      />
      <input
        type="text"
        placeholder={t('participants')}
        value={formData.participants.join(', ')}
        onChange={e => setFormData({ 
          ...formData, 
          participants: e.target.value.split(',').map(p => p.trim()).filter(Boolean)
        })}
        className="w-full p-2 border rounded-lg"
      />
      <button
        type="submit"
        className="w-full bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 flex items-center justify-center gap-2"
      >
        <CalendarIcon size={20} /> {t('addEvent')}
      </button>
    </form>
  );
}