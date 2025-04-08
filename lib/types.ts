export type Position = 'GK' | 'D' | 'MF' | 'FB' | 'FORW' | 'STRK';

export interface Player {
  number: string;
  name: string;
  year: string;
  positions: Position[];
  height: string;
  weight: string;
}

export interface StaffMember {
  name: string;
  position: string;
}

export interface TeamRoster {
  players: Player[];
  staff: StaffMember[];
} 