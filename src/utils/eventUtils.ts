import type { Event } from '../types';

const NOTIFICATION_THRESHOLD = 4; // hours before event to notify

export function checkEventTiming(event: Event) {
  const eventDate = new Date(`${event.date}T${event.time}`);
  const now = new Date();
  const timeDiff = eventDate.getTime() - now.getTime();
  const hoursDiff = timeDiff / (1000 * 60 * 60);

  return {
    shouldNotify: hoursDiff > 0 && hoursDiff <= NOTIFICATION_THRESHOLD,
    timeRemaining: hoursDiff
  };
}