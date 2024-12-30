import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';
import EventList from './EventList';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../utils/supabase';
import type { Event } from '../../types';

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const { t } = useTranslation();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadEvents();
    }
  }, [user]);

  const loadEvents = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (!error && data) {
      setEvents(data);
    }
  };

  const addEvent = async (event: Omit<Event, 'id'>) => {
    if (!user) return;

    const { error } = await supabase
      .from('events')
      .insert({
        ...event,
        user_id: user.id
      });

    if (!error) {
      loadEvents();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">{t('familyCalendar')}</h2>
      <EventForm onSubmit={addEvent} />
      <EventList events={events} />
    </div>
  );
}