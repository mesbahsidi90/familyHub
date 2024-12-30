import React from 'react';
import Calendar from '../components/calendar/Calendar';
import { useTranslation } from '../hooks/useTranslation';

export default function CalendarPage() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{t('calendar')}</h1>
      <Calendar />
    </div>
  );
}