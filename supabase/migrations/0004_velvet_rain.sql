/*
  # Add indexes for notifications and events

  1. Changes
    - Add index on notifications timestamp for faster sorting
    - Add index on events date for faster upcoming event queries
    - Add index on user_id columns for faster filtering
*/

CREATE INDEX IF NOT EXISTS idx_notifications_timestamp 
  ON notifications(timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id 
  ON notifications(user_id);

CREATE INDEX IF NOT EXISTS idx_events_date 
  ON events(date);

CREATE INDEX IF NOT EXISTS idx_events_user_id 
  ON events(user_id);