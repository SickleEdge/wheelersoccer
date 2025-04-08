"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";

interface Game {
  date: string;
  opponent: string;
  location: "home" | "away";
  result?: string;
  time?: string;
  ticketLink?: string;
  isUpcoming?: boolean;
}

const jvGames: Game[] = [
  { date: "2/10", opponent: "Johns Creek", location: "home", result: "L 6-0" },
  { date: "2/25", opponent: "Pebblebrook", location: "away", result: "L 1-0" },
  { date: "3/3", opponent: "Campbell", location: "away", result: "L 5-2" },
  { date: "3/7", opponent: "Etowah*", location: "home", result: "W 3-1" },
  { date: "3/10", opponent: "North Cobb*", location: "home", result: "W 2-1" },
  { date: "3/13", opponent: "Marietta*", location: "away", result: "W 4-0" },
  { date: "3/17", opponent: "Kennesaw Mountain", location: "home", result: "W 1-0" },
  { date: "3/20", opponent: "Walton*", location: "home", result: "L 3-1" },
  { date: "3/24", opponent: "Lassiter", location: "away", result: "W 5-4" },
  { date: "3/26", opponent: "Cherokee*", location: "home", result: "T 0-0" },
  { date: "3/27", opponent: "North Paulding*", location: "away", result: "T 2-2" },
  { date: "3/31", opponent: "Sprayberry", location: "away", result: "L 3-2" },
  { date: "4/2", opponent: "Allatoona", location: "home", result: "W 2-0" },
];

const varsityGames: Game[] = [
  { date: "4/15", opponent: "Hillgrove", location: "away", time: "8:30pm", isUpcoming: true },
  { date: "4/17", opponent: "Roswell", location: "away", time: "8:00pm", isUpcoming: true, ticketLink: "https://gofan.co/event/3091381?schoolId=GA5387" },
  { date: "2/11", opponent: "Johns Creek", location: "away", result: "L 5-0" },
  { date: "2/14", opponent: "Lassiter", location: "home", result: "L 7-0" },
  { date: "2/25", opponent: "Pebblebrook", location: "away", result: "L 3-1" },
  { date: "2/28", opponent: "Cherokee*", location: "away", result: "L 3-2 (OT)" },
  { date: "3/4", opponent: "Campbell", location: "home", result: "L 2-1" },
  { date: "3/6", opponent: "Etowah*", location: "away", result: "L 5-1" },
  { date: "3/11", opponent: "North Cobb*", location: "away", result: "L 5-2" },
  { date: "3/14", opponent: "Marietta*", location: "home", result: "L 5-1" },
  { date: "3/18", opponent: "Sprayberry", location: "home", result: "L 5-1" },
  { date: "3/21", opponent: "Walton*", location: "away", result: "W 2-1" },
  { date: "3/28", opponent: "North Paulding*", location: "home", result: "L 3-1" },
  { date: "4/1", opponent: "Allatoona", location: "away", result: "L 3-1" },
];

export default function SchedulePage() {
  const [team, setTeam] = useState<"varsity" | "jv">("varsity");
  const games = team === "varsity" ? varsityGames : jvGames;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-navy mb-2">Game Schedule</h1>
        <p className="text-muted-foreground">Follow our teams throughout the season</p>
      </div>

      <div className="flex justify-center mb-8">
        <Tabs value={team} onValueChange={(value) => setTeam(value as "varsity" | "jv")} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="varsity" className="text-lg">Varsity</TabsTrigger>
            <TabsTrigger value="jv" className="text-lg">JV</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {team === "jv" && (
        <div className="bg-gold/10 p-4 rounded-lg mb-8 text-center">
          <p className="text-gold font-medium">JV Season has concluded. Thank you for your support!</p>
        </div>
      )}

      <div className="grid gap-6">
        {team === "varsity" && (
          <>
            <h2 className="text-2xl font-bold text-navy">Upcoming Games</h2>
            <div className="grid gap-4">
              {games
                .filter((game) => game.isUpcoming)
                .map((game, index) => (
                  <GameCard key={index} game={game} />
                ))}
            </div>
            <h2 className="text-2xl font-bold text-navy mt-8">Past Games</h2>
          </>
        )}

        <div className="grid gap-4">
          {games
            .filter((game) => !game.isUpcoming)
            .map((game, index) => (
              <GameCard key={index} game={game} />
            ))}
        </div>
      </div>
    </div>
  );
}

function GameCard({ game }: { game: Game }) {
  const getResultColor = (result: string) => {
    if (result?.startsWith("W")) return "text-green-600";
    if (result?.startsWith("L")) return "text-red-600";
    if (result?.startsWith("T")) return "text-yellow-600";
    return "text-gray-600";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-navy">{game.date}</div>
            <div className="flex flex-col">
              <span className="font-medium">{game.location === "home" ? "vs" : "@"}</span>
              <span className="text-lg font-semibold">{game.opponent}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {game.time && <div className="text-lg font-medium">{game.time}</div>}
            {game.result && (
              <div className={`text-lg font-bold ${getResultColor(game.result)}`}>
                {game.result}
              </div>
            )}
            {game.ticketLink ? (
              <a
                href={game.ticketLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            ) : game.isUpcoming ? (
              <div className="group relative">
                <ExternalLink className="h-5 w-5 text-gray-400 cursor-not-allowed" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Couldn't find ticket link
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 