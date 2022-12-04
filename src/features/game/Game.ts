export interface Player {
  id: string;
  name: string;
}

export interface Game {
  id: string;
  code: string;
  players: Player[];
  hostId: string;
}
