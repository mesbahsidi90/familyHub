import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users } from 'lucide-react';
import type { Event } from '../types';

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    participants: '',
  });

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      id: crypto.randomUUID(),
      ...newEvent,
      participants: newEvent.participants.split(',').map(p => p.trim()),
    };
    setEvents([...events, event]);
    setNewEvent({ title: '', date: '', time: '', description: '', participants: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Family Calendar</h2>

      <form onSubmit={addEvent} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Event title"
          value={newEvent.title}
          onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex gap-4">
          <input
            type="date"
            value={newEvent.date}
            onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
            className="flex-1 p-2 border rounded"
            required
          />
          <input
            type="time"
            value={newEvent.time}
            onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
            className="flex-1 p-2 border rounded"
            required
          />
        </div>
        <textarea
          placeholder="Event description"
          value={newEvent.description}
          onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
          className="w-full p-2 border rounded"
          rows={3}
        />
        <input
          type="text"
          placeholder="Participants (comma-separated)"
          value={newEvent.participants}
          onChange={e => setNewEvent({ ...newEvent, participants: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 flex items-center justify-center gap-2"
        >
          <CalendarIcon size={20} /> Add Event
        </button>
      </form>

      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="border rounded p-4 hover:bg-gray-50">
            <h3 className="font-medium text-lg">{event.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{event.description}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <CalendarIcon size={16} />
                {event.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                {event.time}
              </div>
              <div className="flex items-center gap-1">
                <Users size={16} />
                {event.participants.join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}