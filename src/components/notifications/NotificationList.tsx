import React from 'react';
import { X, Calendar, CheckSquare } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import { useTranslation } from '../../hooks/useTranslation';

interface NotificationListProps {
  onClose: () => void;
}

export default function NotificationList({ onClose }: NotificationListProps) {
  const { notifications, markAsRead, clearNotification } = useNotifications();
  const { t } = useTranslation();

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    // Handle navigation based on notification type
    if (notification.type === 'event' && notification.eventId) {
      // Navigate to event details
    }
  };

  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="p-3 border-b flex items-center justify-between">
        <h3 className="font-medium">{t('notifications')}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          {t('noNotifications')}
        </div>
      ) : (
        <div>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {notification.type === 'event' ? (
                    <Calendar size={20} className="text-purple-500" />
                  ) : (
                    <CheckSquare size={20} className="text-blue-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearNotification(notification.id);
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}