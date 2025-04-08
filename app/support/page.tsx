import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Trophy, Users, Star } from "lucide-react";

const sponsorshipLevels = [
  {
    name: "Gold Sponsor",
    amount: "$1000+",
    benefits: [
      "Logo on team website",
      "Social media recognition",
      "Field banner placement",
      "Game program recognition",
    ],
  },
  {
    name: "Silver Sponsor",
    amount: "$500+",
    benefits: [
      "Social media recognition",
      "Field banner placement",
      "Game program recognition",
    ],
  },
  {
    name: "Bronze Sponsor",
    amount: "$250+",
    benefits: ["Game program recognition", "Social media shoutout"],
  },
];

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-navy mb-8">Support the Team</h1>

      {/* Donation Section */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy">Make a Donation</h2>
            <p className="text-muted-foreground">
              Your support helps us provide the best possible experience for our student-athletes. 
              Donations go towards equipment, travel expenses, and team development.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="https://gofan.co/app/school/GA5387">
                <Button size="lg" className="bg-gold text-navy hover:bg-gold/90">
                  Donate Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold/20">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-navy/10 p-4 rounded-lg text-center">
                  <Heart className="h-8 w-8 text-navy mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Donors</p>
                  <p className="text-2xl font-bold">150+</p>
                </div>
                <div className="bg-gold/10 p-4 rounded-lg text-center">
                  <Trophy className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Raised</p>
                  <p className="text-2xl font-bold">$25,000+</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section>
        <h2 className="text-2xl font-bold text-navy mb-8">Become a Sponsor</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {sponsorshipLevels.map((level) => (
            <Card key={level.name} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-navy">{level.name}</h3>
                    <p className="text-gold font-semibold">{level.amount}</p>
                  </div>
                  <ul className="space-y-2">
                    {level.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-gold" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button className="w-full bg-navy hover:bg-navy/90">
                      Become a {level.name}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="mt-16">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-navy mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-6">
                Interested in supporting the team? We'd love to hear from you!
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-gold text-navy hover:bg-gold/90">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 