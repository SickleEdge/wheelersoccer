-- Create the photographer_links table
CREATE TABLE IF NOT EXISTS photographer_links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  photographer_name TEXT NOT NULL,
  drive_link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE photographer_links ENABLE ROW LEVEL SECURITY;

-- Create policies to allow authenticated users to insert and read
CREATE POLICY IF NOT EXISTS "Allow authenticated users to insert photographer links"
  ON photographer_links
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow anyone to read photographer links"
  ON photographer_links
  FOR SELECT
  TO public
  USING (true);

-- Create a function to set up the table
CREATE OR REPLACE FUNCTION create_photographer_links_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create the table if it doesn't exist
  CREATE TABLE IF NOT EXISTS photographer_links (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    photographer_name TEXT NOT NULL,
    drive_link TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
  );

  -- Enable RLS
  ALTER TABLE photographer_links ENABLE ROW LEVEL SECURITY;

  -- Create policies
  CREATE POLICY IF NOT EXISTS "Allow authenticated users to insert photographer links"
    ON photographer_links
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

  CREATE POLICY IF NOT EXISTS "Allow anyone to read photographer links"
    ON photographer_links
    FOR SELECT
    TO public
    USING (true);
END;
$$; 