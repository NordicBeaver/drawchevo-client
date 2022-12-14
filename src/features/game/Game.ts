export interface Player {
  id: string;
  name: string;
}

export interface Prompt {
  id: string;
  text: string;
  playerId: string;
}

export interface Drawing {
  id: string;
  playerId: string;
}

export interface Chain {
  initialPlayerId: string;
  entries: string[];
}

export type GameState = 'NotStarted' | 'EnteringPrompts' | 'Drawing' | 'Finished';

export interface Game {
  id: string;
  code: string;
  state: GameState;
  stage: number;
  players: Player[];
  playersOrder: string[];
  prompts: Prompt[];
  drawings: Drawing[];
  chains: Chain[];
  hostId: string;
}
