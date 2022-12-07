export interface Player {
  id: string;
  name: string;
}

export type GameState = 'notStarted' | 'enteringPrompts' | 'finished';

export interface Game {
  id: string;
  code: string;
  state: GameState;
  players: Player[];
  hostId: string;
}
