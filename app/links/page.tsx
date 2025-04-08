"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Film, Image } from "lucide-react";
import Link from "next/link";

export default function LinksPage() {
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

        <Link 
          href="https://drive.google.com/drive/folders/1CdzRux_6uQ8tcgQQEW9HEeJaqk4pJL66?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Card className="h-[400px] flex flex-col items-center justify-center p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-navy relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Image className="h-24 w-24 text-white group-hover:text-gold transition-colors duration-300" />
            <h2 className="text-3xl font-bold text-white group-hover:text-gold transition-colors duration-300">Team Pictures</h2>
            <p className="text-white/80 text-center text-lg group-hover:text-gold/80 transition-colors duration-300">View and download team photos</p>
          </Card>
        </Link>
      </div>
    </div>
  );
} 