"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Film, Camera, Calendar } from "lucide-react";

interface PhotographerLink {
  id: string;
  photographer_id: string;
  photographer_name: string;
  drive_link: string;
  drive_name: string;
  tip_link: string;
  created_at: string;
}

const supabase = createClient(
  'https://fvqacfldicptrcmiqonm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2cWFjZmxkaWNwdHJjbWlxb25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODY2ODUsImV4cCI6MjA2MDc2MjY4NX0.TmsK6gaY6bUE4RVOpe4EPhz4YYFjwWRc_tCZCQp0WG0'
);

export default function LinksPage() {
  const [links, setLinks] = useState<PhotographerLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const { data, error } = await supabase
      .from('photographer_links')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);
    
    if (!error && data) {
      setLinks(data as PhotographerLink[]);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-white to-navy/5">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-navy mb-4 bg-clip-text text-transparent bg-gradient-to-r from-navy to-navy/70">
          Additional Links
        </h1>
        <p className="text-muted-foreground text-lg">Access game film and team pictures</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Link 
          href="https://drive.google.com/drive/folders/1rd4KgFa4O4_Mdk_uaLOnOUXzuMxotlmy?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Card className="h-[400px] flex flex-col items-center justify-center p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-navy relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Film className="h-24 w-24 text-white group-hover:text-gold transition-colors duration-300" />
            <h2 className="text-3xl font-bold text-white group-hover:text-gold transition-colors duration-300">Game Film</h2>
            <p className="text-white/80 text-center text-lg group-hover:text-gold/80 transition-colors duration-300">Access all game recordings</p>
          </Card>
        </Link>

        <div className="space-y-6">
          <Card className="p-6 bg-black shadow-lg border border-red-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <Image 
                  src="drops.png" 
                  alt="Photographer Drops" 
                  width={300}
                  height={72}
                  priority
                  className="h-[72px] w-auto object-contain"
                />
              </div>
              <Link href="/drops">
                <Button className="bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 whitespace-nowrap">
                  View all DROPS
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {links.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No photo drops available yet.</p>
                </div>
              ) : (
                links.map((link) => (
                  <div 
                    key={link.id} 
                    className="group bg-black/50 hover:bg-black/80 transition-colors duration-200 rounded-lg p-4 border border-red-500/20"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-white/80 transition-colors duration-200">
                          {link.drive_name || 'Untitled Drop'}
                        </h3>
                        <p className="text-sm text-gray-400">
                          by {link.photographer_name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {new Date(link.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                      <Link 
                        href={`/drops/${link.id}`}
                        className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        <span>View Drop</span>
                        <svg 
                          className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="h-6 w-6 text-navy" />
              <h2 className="text-2xl font-semibold text-navy">Are you a photographer?</h2>
            </div>
            <p className="text-gray-600 mb-4">Upload your photos to share with the team!</p>
            <Link href="/photographers">
              <Button className="w-full bg-navy text-white hover:bg-navy/90 transition-colors duration-200">
                Go to Photographer Hub
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
} 