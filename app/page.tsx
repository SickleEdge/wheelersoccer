import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Trophy, Users, Star } from "lucide-react"
import { jvRoster, varsityRoster } from '@/lib/data';
import { PlayerCard } from '@/components/PlayerCard';
import { StaffCard } from '@/components/StaffCard';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-navy py-16 md:py-24 overflow-hidden">
        <div className="hero-pattern absolute inset-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Wheeler High School <span className="text-gold">Soccer</span>
              </h1>
              <p className="text-lg text-white/80 max-w-md">
                Home of the Wildcats. Building champions on and off the field through dedication, teamwork, and
                excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/schedule">
                  <Button size="lg" className="custom-button">
                    View Schedule
                  </Button>
                </Link>
                <Link href="/roster">
                  <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold/20">
                    Meet the Team
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-xl">
              <Image 
                src="/wheelersoccer/wheelersoccer.jpg" 
                alt="Wheeler High School Soccer Team"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-12 md:py-16 section-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Card className="stats-card hover-glow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-navy/10 p-3 rounded-full">
                    <Trophy className="h-8 w-8 text-navy" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Season Record</p>
                    <h3 className="text-2xl font-bold gradient-text">12-2</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stats-card hover-glow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gold/10 p-3 rounded-full">
                    <Users className="h-8 w-8 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                    <h3 className="text-2xl font-bold gradient-text">24</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stats-card hover-glow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-navy/10 p-3 rounded-full">
                    <Calendar className="h-8 w-8 text-navy" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Next Game</p>
                    <h3 className="text-xl font-bold gradient-text">Apr 15</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stats-card hover-glow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gold/10 p-3 rounded-full">
                    <Star className="h-8 w-8 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">State Rank</p>
                    <h3 className="text-2xl font-bold gradient-text">#3</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Rosters Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-navy">Team Rosters</h2>
            <p className="text-muted-foreground mt-2">Meet the Wheeler Wildcats</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Varsity Roster */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-navy">Varsity Roster</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {varsityRoster.players.map((player) => (
                  <PlayerCard key={player.number} player={player} />
                ))}
              </div>
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-navy mb-3">Staff</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {varsityRoster.staff.map((staff, index) => (
                    <StaffCard key={index} staff={staff} />
                  ))}
                </div>
              </div>
            </div>

            {/* JV Roster */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-navy">JV Roster</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {jvRoster.players.map((player) => (
                  <PlayerCard key={player.number} player={player} />
                ))}
              </div>
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-navy mb-3">Staff</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {jvRoster.staff.map((staff, index) => (
                    <StaffCard key={index} staff={staff} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Support the Wheeler Wildcats</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Join us for our upcoming games and help cheer on the team. Your support makes a difference!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/schedule">
              <Button size="lg" className="custom-button">
                Buy Tickets
              </Button>
            </Link>
            <Link href="/support">
              <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold/20">
                Donate
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

