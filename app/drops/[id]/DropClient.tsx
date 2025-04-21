'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Camera, ArrowLeft } from "lucide-react";

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

export default function DropClient({ id }: { id: string }) {
  const [drop, setDrop] = useState<PhotographerLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTipModal, setShowTipModal] = useState(false);

  useEffect(() => {
    const fetchDrop = async () => {
      try {
        const { data, error } = await supabase
          .from('photographer_links')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setDrop(data);
      } catch (err) {
        setError('Failed to load drop');
        console.error('Error fetching drop:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrop();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !drop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Drop Not Found</h1>
          <Link href="/drops" className="text-red-400 hover:text-red-300">
            Return to Drops
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/drops" className="text-white hover:text-red-400 transition-colors duration-200">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="bg-red-500 p-3 rounded-lg">
            <Camera className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold">
            <span className="text-white">{drop.drive_name}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-black/50 backdrop-blur-lg border border-red-500/20 p-6">
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <div className="w-full h-[500px] rounded-lg bg-black/20 flex flex-col items-center justify-center gap-4">
                  <Camera className="h-16 w-16 text-red-400" />
                  <h3 className="text-xl font-semibold text-white">Photo Gallery</h3>
                  <p className="text-gray-400 text-center max-w-md">
                    Click the button below to view the full photo gallery in Google Drive
                  </p>
                  <a
                    href={drop.drive_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    View Gallery
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-red-500/20 p-3 rounded-full">
                    <Camera className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{drop.photographer_name}</p>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        {new Date(drop.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                {drop.tip_link && (
                  <Button
                    onClick={() => setShowTipModal(true)}
                    className="bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                  >
                    Tip Photographer
                  </Button>
                )}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            {drop.description && (
              <Card className="bg-black/50 backdrop-blur-lg border border-red-500/20 p-6">
                <h2 className="text-2xl font-semibold text-white mb-6">About This Drop</h2>
                <p className="text-gray-400 mb-6">
                  {drop.description}
                </p>
                <a
                  href={drop.drive_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 text-center block"
                >
                  View Full Gallery
                </a>
              </Card>
            )}
          </div>
        </div>
      </div>

      {showTipModal && drop.tip_link && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="bg-black/90 border border-red-500/20 p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-semibold text-white mb-4">Tip {drop.photographer_name}</h3>
            <p className="text-gray-400 mb-6">
              Support the photographer by sending them a tip through their preferred platform.
            </p>
            <div className="flex gap-4">
              <a
                href={drop.tip_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 text-center"
              >
                Send Tip
              </a>
              <Button
                onClick={() => setShowTipModal(false)}
                className="flex-1 bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
} 