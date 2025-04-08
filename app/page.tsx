import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Trophy, Users, Star } from "lucide-react"
import { jvRoster, varsityRoster } from '@/lib/data';
import { PlayerCard } from '@/components/PlayerCard';
import { StaffCard } from '@/components/StaffCard';

export default function Home() {
  // Calculate total team members
  const totalPlayers = varsityRoster.players.length + jvRoster.players.length;
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-navy py-16 md:py-24 overflow-hidden">
        <div className="hero-pattern absolute inset-0 animate-fadeIn"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-slideInLeft">
                Wheeler High School <span className="text-gold animate-pulse">Soccer</span>
              </h1>
              <p className="text-lg text-white/80 max-w-md animate-slideInLeft animate-delay-200">
                Home of the Wildcats. Building champions on and off the field through dedication, teamwork, and
                excellence.
              </p>
              <div className="flex flex-wrap gap-4 animate-slideInLeft animate-delay-300">
                <Link href="/schedule">
                  <Button size="lg" className="custom-button hover-scale">
                    View Schedule
                  </Button>
                </Link>
                <Link href="/roster">
                  <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold/20 hover-scale">
                    Meet the Team
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative w-full h-[350px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl shadow-xl animate-slideInRight">
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent z-10 pointer-events-none"></div>
              <Image 
                src="/wheelersoccer/wheelersoccer.jpg" 
                alt="Wheeler High School Soccer Team"
                fill
                className="object-cover object-center zoom-out-effect"
                priority
              />
              <div className="absolute bottom-4 right-4 bg-navy/80 text-white text-xs px-2 py-1 rounded-md z-20">
                Wildcats Team Photo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-12 md:py-16 section-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Card className="stats-card hover-glow animate-slideUp animate-delay-100">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-navy/10 p-3 rounded-full animate-float">
                    <Trophy className="h-8 w-8 text-navy" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Season Record</p>
                    <h3 className="text-2xl font-bold gradient-text">1-11</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stats-card hover-glow animate-slideUp animate-delay-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gold/10 p-3 rounded-full animate-float">
                    <Users className="h-8 w-8 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                    <h3 className="text-2xl font-bold gradient-text">48</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stats-card hover-glow animate-slideUp animate-delay-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-navy/10 p-3 rounded-full animate-float">
                    <Calendar className="h-8 w-8 text-navy" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Next Game</p>
                    <h3 className="text-xl font-bold gradient-text">Apr 15</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stats-card hover-glow animate-slideUp animate-delay-400">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gold/10 p-3 rounded-full animate-float">
                    <Star className="h-8 w-8 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">State Rank</p>
                    <h3 className="text-2xl font-bold gradient-text">#283</h3>
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
          <div className="text-center mb-10 animate-slideDown">
            <h2 className="text-3xl font-bold text-navy">Team Rosters</h2>
            <p className="text-muted-foreground mt-2">Meet the Wheeler Wildcats</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Varsity Roster */}
            <div className="space-y-6 animate-slideInLeft">
              <h3 className="text-2xl font-bold text-navy">Varsity Roster</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {varsityRoster.players.map((player, index) => (
                  <div key={player.number} className={`animate-slideUp animate-delay-${(index % 5) * 100}`}>
                    <PlayerCard player={player} />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-navy mb-3">Staff</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {varsityRoster.staff.map((staff, index) => (
                    <div key={index} className={`animate-slideUp animate-delay-${(index % 5) * 100}`}>
                      <StaffCard staff={staff} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* JV Roster */}
            <div className="space-y-6 animate-slideInRight">
              <h3 className="text-2xl font-bold text-navy">JV Roster</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {jvRoster.players.map((player, index) => (
                  <div key={player.number} className={`animate-slideUp animate-delay-${(index % 5) * 100}`}>
                    <PlayerCard player={player} />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-navy mb-3">Staff</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {jvRoster.staff.map((staff, index) => (
                    <div key={index} className={`animate-slideUp animate-delay-${(index % 5) * 100}`}>
                      <StaffCard staff={staff} />
                    </div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text animate-slideUp">Support the Wheeler Wildcats</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 animate-slideUp animate-delay-200">
            Join us for our upcoming games and help cheer on the team. Your support makes a difference!
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-slideUp animate-delay-300">
            <Link href="/schedule">
              <Button size="lg" className="custom-button animate-pulse hover-scale">
                Buy Tickets
              </Button>
            </Link>
            <Link href="/support">
              <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold/20 hover-scale">
                Donate
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

