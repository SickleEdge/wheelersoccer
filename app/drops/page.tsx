import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, ArrowRight } from "lucide-react";

interface PhotographerLink {
  id: string;
  photographer_id: string;
  photographer_name: string;
  drive_link: string;
  drive_name: string;
  tip_link?: string;
  description?: string;
  created_at: string;
}

const supabase = createClient(
  'https://fvqacfldicptrcmiqonm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2cWFjZmxkaWNwdHJjbWlxb25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODY2ODUsImV4cCI6MjA2MDc2MjY4NX0.TmsK6gaY6bUE4RVOpe4EPhz4YYFjwWRc_tCZCQp0WG0'
);

async function getDrops() {
  const { data, error } = await supabase
    .from('photographer_links')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching drops:', error);
    return [];
  }

  return data || [];
}

export default async function DropsPage() {
  const drops = await getDrops();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Image 
            src="drops.png" 
            alt="Photographer Drops" 
            width={750}
            height={180}
            priority
            className="h-[180px] w-auto object-contain"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drops.map((drop: PhotographerLink) => (
            <Link 
              href={`/drops/${drop.id}`} 
              key={drop.id}
              className="group"
            >
              <Card className="bg-black/50 backdrop-blur-lg border border-red-500/20 p-6 h-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-4 group-hover:text-red-400 transition-colors duration-200">
                      {drop.drive_name}
                    </h2>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {drop.description || `Photos captured by ${drop.photographer_name}`}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-red-500/20 p-2 rounded-full">
                        <Camera className="h-4 w-4 text-red-400" />
                      </div>
                      <span className="text-sm text-gray-400">{drop.photographer_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-400 group-hover:text-red-300 transition-colors duration-200">
                      <span className="text-sm">View Drop</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {drops.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-black/50 backdrop-blur-lg border border-red-500/20 p-8 rounded-lg">
              <Camera className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">No Drops Available</h2>
              <p className="text-gray-400">Check back later for new photo drops!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 