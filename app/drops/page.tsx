"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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

export default function DropsPage() {
  const [drops, setDrops] = useState<PhotographerLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrops = async () => {
      const { data, error } = await supabase
        .from('photographer_links')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (!error && data) {
        setDrops(data as PhotographerLink[]);
      }
      setLoading(false);
    };

    fetchDrops();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: -100,
      opacity: 0,
      scale: 0.8
    },
    show: { 
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="flex flex-col items-center">
          <div className="animate-bounce mb-4">
            <Camera className="h-12 w-12 text-red-400" />
          </div>
          <p className="text-white animate-pulse">Loading drops...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
          className="flex items-center gap-3 mb-12"
        >
          <Image 
            src="drops.png" 
            alt="Photographer Drops" 
            width={750}
            height={180}
            priority
            className="h-[180px] w-auto object-contain"
          />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {drops.map((drop: PhotographerLink, index) => (
            <motion.div
              key={drop.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 } 
              }}
            >
              <Link 
                href={`/drops/${drop.id}`}
                className="group block h-full"
              >
                <Card className="bg-black/50 backdrop-blur-lg border border-red-500/20 p-6 h-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <motion.h2 
                        variants={titleVariants}
                        className="text-xl font-semibold text-white mb-4 group-hover:text-red-400 transition-colors duration-200"
                      >
                        {drop.drive_name}
                      </motion.h2>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        className="text-gray-400 mb-4 line-clamp-2"
                      >
                        {drop.description || `Photos captured by ${drop.photographer_name}`}
                      </motion.p>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="flex items-center justify-between mt-4"
                    >
                      <div className="flex items-center gap-2">
                        <div className="bg-red-500/20 p-2 rounded-full">
                          <Camera className="h-4 w-4 text-red-400" />
                        </div>
                        <span className="text-sm text-gray-400">{drop.photographer_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-red-400 group-hover:text-red-300 transition-colors duration-200">
                        <span className="text-sm">View Drop</span>
                        <motion.div 
                          animate={{ x: [0, 5, 0] }} 
                          transition={{ 
                            repeat: Infinity, 
                            repeatType: "loop", 
                            duration: 1.5,
                            repeatDelay: 0.5
                          }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {drops.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="bg-black/50 backdrop-blur-lg border border-red-500/20 p-8 rounded-lg">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2
                }}
              >
                <Camera className="h-12 w-12 text-red-400 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-semibold text-white mb-2">No Drops Available</h2>
              <p className="text-gray-400">Check back later for new photo drops!</p>
            </div>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <Link href="/photographers">
            <button className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-200">
              For Photographers
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 