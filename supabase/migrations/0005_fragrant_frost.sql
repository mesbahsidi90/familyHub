/*
  # Add event notifications support

  1. Changes
    - Add missing indexes for notifications and events
    - Add cascade delete for notifications when events are deleted
*/

-- Add cascade delete for notifications when events are deleted
ALTER TABLE notifications
DROP CONSTRAINT IF EXISTS notifications_event_id_fkey,
ADD CONSTRAINT notifications_event_id_fkey
  FOREIGN KEY (event_id)
  REFERENCES events(id)
  ON DELETE CASCADE;

-- Add index for event_id to speed up lookups
CREATE INDEX IF NOT EXISTS idx_notifications_event_id
  ON notifications(event_id);

-- Add index for unread notifications
CREATE INDEX IF NOT EXISTS idx_notifications_unread
  ON notifications(user_id, read)
  WHERE NOT read;