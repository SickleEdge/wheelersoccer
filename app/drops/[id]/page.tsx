import { createClient } from '@supabase/supabase-js';
import DropClient from './DropClient';

const supabase = createClient(
  'https://fvqacfldicptrcmiqonm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2cWFjZmxkaWNwdHJjbWlxb25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODY2ODUsImV4cCI6MjA2MDc2MjY4NX0.TmsK6gaY6bUE4RVOpe4EPhz4YYFjwWRc_tCZCQp0WG0'
);

export async function generateStaticParams() {
  const { data: drops } = await supabase
    .from('photographer_links')
    .select('id');

  return drops?.map((drop: { id: string }) => ({
    id: drop.id,
  })) || [];
}

export default function DropPage({ params }: { params: { id: string } }) {
  return <DropClient id={params.id} />;
} 