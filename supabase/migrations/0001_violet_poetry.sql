/*
  # Create family members table

  1. New Tables
    - `family_members`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `family_members` table
    - Add policy for authenticated users to manage their own family members
*/

CREATE TABLE IF NOT EXISTS family_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own family members"
  ON family_members
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);