import { Player } from '@/lib/types';
import { Card, CardContent } from "@/components/ui/card";

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Card className="overflow-hidden hover-scale">
      <CardContent className="p-4">
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-navy">{player.name}</h3>
              <div className="flex items-center mt-1">
                <div className="bg-gold/10 px-2 py-0.5 rounded text-xs font-medium text-gold">
                  {player.positions.join(", ")}
                </div>
                {player.year && (
                  <span className="ml-2 text-xs text-muted-foreground">{player.year}</span>
                )}
              </div>
            </div>
            <div className="text-2xl font-bold text-navy animate-pulse">#{player.number}</div>
          </div>
          <div className="text-sm text-muted-foreground mt-2 animate-fadeIn">
            <span>{player.height}</span>
            {player.weight && (
              <span className="ml-2">• {player.weight}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 