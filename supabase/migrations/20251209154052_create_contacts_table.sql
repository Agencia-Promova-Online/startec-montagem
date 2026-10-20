/*
  # Create contacts table for form submissions

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key) - Unique identifier for each contact
      - `name` (text) - Name of the person contacting
      - `email` (text) - Email address
      - `phone` (text) - Phone number
      - `company` (text, nullable) - Company name (optional)
      - `message` (text) - Message content
      - `created_at` (timestamptz) - Timestamp of submission

  2. Security
    - Enable RLS on `contacts` table
    - Add policy for service role to insert contacts (for webhook)
    - Add policy for authenticated users to view all contacts
*/

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role to insert contacts"
  ON contacts
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);