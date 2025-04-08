import { Player } from '@/lib/types';
import { Card, CardContent } from "@/components/ui/card";

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-navy">#{player.number}</span>
          <span className="text-sm text-muted-foreground">{player.year}</span>
        </div>
        <h3 className="text-xl font-semibold text-navy mb-2">{player.name}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {player.positions.map((position) => (
            <span
              key={position}
              className="px-2 py-1 text-xs font-medium bg-gold/10 text-navy rounded-full"
            >
              {position}
            </span>
          ))}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{player.height}</span>
          <span>{player.weight}</span>
        </div>
      </CardContent>
    </Card>
  );
} 