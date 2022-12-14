export interface Player {
  id: string;
  name: string;
}

export type GameState = 'NotStarted' | 'EnteringPrompts' | 'Drawing' | 'Finished';

export interface Game {
  id: string;
  code: string;
  state: GameState;
  players: Player[];
  hostId: string;
}
