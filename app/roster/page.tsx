import { varsityRoster, jvRoster } from "@/lib/data";
import { PlayerCard } from "@/components/PlayerCard";
import { StaffCard } from "@/components/StaffCard";

export default function RosterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-navy mb-8">Team Rosters</h1>
      
      {/* Varsity Team */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-navy mb-6">Varsity Team</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-navy mb-4">Players</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {varsityRoster.players.map((player) => (
              <PlayerCard key={player.number} player={player} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-navy mb-4">Coaching Staff</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {varsityRoster.staff.map((staff, index) => (
              <StaffCard key={index} staff={staff} />
            ))}
          </div>
        </div>
      </section>

      {/* JV Team */}
      <section>
        <h2 className="text-2xl font-bold text-navy mb-6">Junior Varsity Team</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-navy mb-4">Players</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jvRoster.players.map((player) => (
              <PlayerCard key={player.number} player={player} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-navy mb-4">Coaching Staff</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jvRoster.staff.map((staff, index) => (
              <StaffCard key={index} staff={staff} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

