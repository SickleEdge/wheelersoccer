import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TeamPage() {
  // Coach data from the provided information
  const coaches = [
    {
      id: 1,
      name: "Paul Chance",
      role: "Head Coach",
      team: "Varsity",
      bio: "Coach Chance has been leading the Wheeler Wildcats soccer program for several years, focusing on player development and team building.",
    },
    {
      id: 2,
      name: "Matt Pearson",
      role: "Assistant Coach",
      team: "Varsity",
      bio: "Coach Pearson specializes in defensive strategies and works closely with the backline to improve the team's defensive capabilities.",
    },
    {
      id: 3,
      name: "Drew Skinner",
      role: "Assistant Coach",
      team: "Varsity",
      bio: "Coach Skinner focuses on offensive tactics and player conditioning, helping the team maintain peak performance throughout the season.",
    },
    {
      id: 4,
      name: "M. Rogers",
      role: "Head Coach",
      team: "JV",
      bio: "Coach Rogers leads the Junior Varsity program, developing young talent and preparing players for the varsity level.",
    },
    {
      id: 5,
      name: "A. Medrano",
      role: "Statistician",
      team: "JV",
      bio: "Medrano tracks all player and team statistics, providing valuable insights to the coaching staff for game planning and player development.",
    },
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-navy mb-2">Meet Our Team</h1>
          <p className="text-lg text-muted-foreground">The coaches and staff behind Wheeler Soccer</p>
        </div>

        <div className="mb-16">
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl mb-8 animate-fade-in">
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="Wheeler Soccer Team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h2 className="text-2xl md:text-3xl font-bold">Wheeler Wildcats Soccer</h2>
                <p className="text-white/80">Building champions on and off the field</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none animate-slide-up">
            <h2 className="text-2xl font-bold text-navy mb-4">About Our Program</h2>
            <p className="text-muted-foreground mb-4">
              The Wheeler High School Soccer program is dedicated to developing student-athletes who excel both on the
              field and in the classroom. Our coaching staff focuses on building technical skills, tactical
              understanding, physical fitness, and mental toughness.
            </p>
            <p className="text-muted-foreground mb-4">
              Located in Marietta, Georgia, the Wheeler Wildcats compete in one of the most competitive high school
              soccer regions in the state. Our program consists of both Varsity and Junior Varsity teams, providing
              opportunities for players at different skill levels to develop and compete.
            </p>
            <p className="text-muted-foreground">
              We pride ourselves on our commitment to sportsmanship, teamwork, and continuous improvement. Our goal is
              not only to win games but to help our players develop character traits that will serve them well beyond
              their high school soccer careers.
            </p>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-navy mb-8 text-center">Coaching Staff</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach) => (
              <Card
                key={coach.id}
                className="overflow-hidden hover:shadow-lg transition-shadow animate-slide-up"
                style={{ animationDelay: `${coach.id * 0.1}s` }}
              >
                <div className="aspect-square relative bg-gray-100">
                  <Image src="/placeholder.svg?height=400&width=400" alt={coach.name} fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-navy/80 text-white p-4">
                    <h3 className="font-bold text-xl">{coach.name}</h3>
                    <p>{coach.role}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">{coach.team} Team</p>
                  <p>{coach.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-navy mb-8 text-center">School Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-slide-up">
              <h3 className="text-xl font-bold text-navy mb-4">Wheeler High School</h3>
              <p className="text-muted-foreground mb-4">
                375 Holt Rd NE
                <br />
                Marietta, GA 30068-3568
              </p>
              <h4 className="font-bold mb-2">School Colors</h4>
              <div className="flex space-x-2 mb-4">
                <div className="w-12 h-12 rounded-full bg-navy"></div>
                <div className="w-12 h-12 rounded-full bg-gold"></div>
              </div>
              <h4 className="font-bold mb-2">Mascot</h4>
              <p className="text-muted-foreground">Wildcats</p>
            </div>
            <div
              className="relative h-64 rounded-lg overflow-hidden shadow-xl animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Wheeler High School"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-2xl font-bold text-navy mb-4">Join Our Team</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Interested in joining the Wheeler Soccer program? Tryouts are held before each season. Contact our coaching
            staff for more information about requirements and dates.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="mailto:coach@wheelersoccer.com"
              className="inline-flex h-10 items-center justify-center rounded-md bg-navy px-8 text-sm font-medium text-white shadow transition-colors hover:bg-navy/90"
            >
              Contact Coaches
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

