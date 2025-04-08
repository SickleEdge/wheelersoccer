"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Target, Crosshair, Shield, Award, Star, Medal, Zap } from "lucide-react"

interface Stat {
  title: string
  value: string
  icon: React.ReactNode
}

interface Leader {
  rank: number
  name: string
  position: string
  value: string
  stat: string
}

const teamStats: Stat[] = [
  { title: "Overall Record", value: "1-11", icon: <Trophy className="h-6 w-6 text-gold" /> },
  { title: "Region Record", value: "1-5 (7th)", icon: <Target className="h-6 w-6 text-gold" /> },
  { title: "NAT Rank", value: "1276", icon: <Star className="h-6 w-6 text-gold" /> },
  { title: "GA Rank", value: "283", icon: <Shield className="h-6 w-6 text-gold" /> },
]

const leaders: Record<string, Leader[]> = {
  "Goals Per Match": [
    { rank: 1, name: "Rafael Lima", position: "Sr. - STRK, MF", value: "0.7", stat: "G/G" },
    { rank: 2, name: "Vinicius Ribeiro", position: "Sr. - STRK", value: "0.5", stat: "G/G" },
    { rank: 3, name: "Pablo Anjos", position: "Jr. - MF, STRK", value: "0.5", stat: "G/G" },
  ],
  "Assists Per Match": [
    { rank: 1, name: "Vinicius Ribeiro", position: "Sr. - STRK", value: "0.5", stat: "A/G" },
    { rank: 2, name: "Rafael Lima", position: "Sr. - STRK, MF", value: "0.3", stat: "A/G" },
  ],
  "Shots": [
    { rank: 1, name: "Pablo Anjos", position: "Jr. - MF, STRK", value: "2", stat: "Shots" },
    { rank: 2, name: "Nathan Cheplak", position: "Jr. - MF", value: "1", stat: "Shots" },
    { rank: 3, name: "Michael Giwa", position: "Fr. - FB, STRK", value: "1", stat: "Shots" },
  ],
  "Goals Against Average": [
    { rank: 1, name: "Reggie Garcia", position: "So. - GK", value: "3.556", stat: "GAA" },
    { rank: 2, name: "George Campbell", position: "So. - GK", value: "5.333", stat: "GAA" },
  ],
  "Saves Per Match": [
    { rank: 1, name: "Marcus Dickherber", position: "Jr. - GK", value: "4.0", stat: "S/G" },
    { rank: 2, name: "George Campbell", position: "So. - GK", value: "3.0", stat: "S/G" },
  ],
  "Goals": [
    { rank: 1, name: "Rafael Lima", position: "Sr. - STRK, MF", value: "2", stat: "Goals" },
    { rank: 2, name: "Vinicius Ribeiro", position: "Sr. - STRK", value: "1", stat: "Goals" },
    { rank: 3, name: "Pablo Anjos", position: "Jr. - MF, STRK", value: "1", stat: "Goals" },
  ],
  "Assists": [
    { rank: 1, name: "Rafael Lima", position: "Sr. - STRK, MF", value: "1", stat: "Asst" },
    { rank: 2, name: "Vinicius Ribeiro", position: "Sr. - STRK", value: "1", stat: "Asst" },
  ],
  "Points": [
    { rank: 1, name: "Rafael Lima", position: "Sr. - STRK, MF", value: "5", stat: "Pts" },
    { rank: 2, name: "Vinicius Ribeiro", position: "Sr. - STRK", value: "3", stat: "Pts" },
    { rank: 3, name: "Pablo Anjos", position: "Jr. - MF, STRK", value: "2", stat: "Pts" },
  ],
  "Saves": [
    { rank: 1, name: "George Campbell", position: "So. - GK", value: "6", stat: "Saves" },
    { rank: 2, name: "Marcus Dickherber", position: "Jr. - GK", value: "4", stat: "Saves" },
  ],
}

export default function StatsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-navy mb-2">Team Statistics</h1>
        <p className="text-muted-foreground">2024-25 Season</p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {teamStats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                    <div>
                  <h3 className="text-lg font-semibold text-navy">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gold">{stat.value}</p>
                    </div>
                <div className="bg-navy/10 p-3 rounded-full">{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
        ))}
                    </div>

      <div className="grid gap-8">
        {Object.entries(leaders).map(([category, players]) => (
          <div key={category}>
            <h2 className="text-2xl font-bold text-navy mb-4">{category}</h2>
            <div className="grid gap-4">
              {players.map((player) => (
                <Card key={`${category}-${player.rank}`} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold text-navy">{player.rank}</div>
                    <div>
                          <h3 className="font-semibold">{player.name}</h3>
                          <p className="text-sm text-muted-foreground">{player.position}</p>
                    </div>
                  </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gold">{player.value}</p>
                        <p className="text-sm text-muted-foreground">{player.stat}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
            </div>
        ))}
      </div>
    </div>
  )
}

