import React from 'react';
import { CalendarIcon, Clock, Users } from 'lucide-react';
import type { Event } from '../../types';

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  return (
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
  );
}