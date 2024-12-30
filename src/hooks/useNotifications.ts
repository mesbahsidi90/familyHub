import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from './useAuth';
import { useTranslation } from './useTranslation';
import { checkEventTiming } from '../utils/eventUtils';
import type { Event, Notification } from '../types';

const NOTIFICATION_CHECK_INTERVAL = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      loadNotifications();
      const subscription = subscribeToNotifications();
      const interval = setInterval(checkUpcomingEvents, NOTIFICATION_CHECK_INTERVAL);
      
      // Initial check
      checkUpcomingEvents();
      
      return () => {
        subscription?.unsubscribe();
        clearInterval(interval);
      };
    }
  }, [user]);

  const loadNotifications = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('timestamp', { ascending: false });

    if (!error && data) {
      setNotifications(data);
    }
  };

  const subscribeToNotifications = () => {
    if (!user) return;

    return supabase
      .channel('notifications')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'notifications',
        filter: `user_id=eq.${user.id}`
      }, () => {
        loadNotifications();
      })
      .subscribe();
  };

  const checkUpcomingEvents = async () => {
    if (!user) return;

    const { data: events } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', new Date().toISOString().split('T')[0]);

    if (events) {
      events.forEach((event: Event) => {
        const { shouldNotify, timeRemaining } = checkEventTiming(event);
        
        if (shouldNotify) {
          const existingNotification = notifications.find(
            n => n.event_id === event.id && !n.read
          );

          if (!existingNotification) {
            createNotification({
              title: t('upcomingEvent'),
              message: `${event.title} - ${formatTimeRemaining(timeRemaining)}`,
              type: 'event',
              event_id: event.id,
              user_id: user.id
            });
          }
        }
      });
    }
  };

  const formatTimeRemaining = (hours: number): string => {
    if (hours < 1) {
      const minutes = Math.round(hours * 60);
      return t('minutesUntilEvent', { minutes });
    }
    return t('hoursUntilEvent', { hours: Math.round(hours) });
  };

  const createNotification = async (notification: Omit<Notification, 'id' | 'timestamp' | 'read'> & { user_id: string }) => {
    const { error } = await supabase
      .from('notifications')
      .insert({
        ...notification,
        timestamp: new Date().toISOString(),
        read: false
      });

    if (!error) {
      loadNotifications();
    }
  };

  const markAsRead = async (notificationId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .eq('user_id', user.id);

    if (!error) {
      loadNotifications();
    }
  };

  const clearNotification = async (notificationId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId)
      .eq('user_id', user.id);

    if (!error) {
      loadNotifications();
    }
  };

  return {
    notifications,
    markAsRead,
    clearNotification
  };
}