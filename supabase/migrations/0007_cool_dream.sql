/*
  # Create meals table

  1. New Tables
    - `meals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `day` (text)
      - `type` (text, enum: breakfast, lunch, dinner, snack)
      - `recipe` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `meals` table
    - Add policy for authenticated users to manage their own meals
*/

CREATE TABLE IF NOT EXISTS meals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  day text NOT NULL,
  type text NOT NULL CHECK (type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  recipe text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE meals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own meals"
  ON meals
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Add index for efficient querying
CREATE INDEX IF NOT EXISTS idx_meals_user_day ON meals(user_id, day);