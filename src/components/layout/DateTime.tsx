import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

export default function DateTime() {
  const [dateTime, setDateTime] = useState(new Date());
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(currentLanguage, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat(currentLanguage, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: currentLanguage === 'en',
    }).format(date);
  };

  return (
    <div className="text-gray-600">
      <div className="text-lg font-medium">{formatDate(dateTime)}</div>
      <div className="text-2xl font-bold">{formatTime(dateTime)}</div>
    </div>
  );
}