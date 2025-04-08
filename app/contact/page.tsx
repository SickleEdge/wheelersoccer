"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-navy mb-2">Contact Us</h1>
        <p className="text-muted-foreground">Get in touch with the Wheeler Soccer program</p>
      </div>

      <div className="grid gap-6 max-w-2xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-navy/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-navy" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy">Head Coach</h3>
                <a
                  href="mailto:paul.chance@cobbk12.org"
                  className="text-gold hover:text-gold/80 transition-colors"
                >
                  paul.chance@cobbk12.org
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-navy/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-navy" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy">Location</h3>
                <p className="text-muted-foreground">
                  Wheeler High School
                  <br />
                  375 Holt Road
                  <br />
                  Marietta, GA 30068
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-navy/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-navy" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy">School Office</h3>
                <p className="text-muted-foreground">(770) 578-3266</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 