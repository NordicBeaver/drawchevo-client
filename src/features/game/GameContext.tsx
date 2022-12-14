import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { Game, GameState } from './Game';
import { io, Socket } from 'socket.io-client';
import { z } from 'zod';
import { useAppContext } from '../state/AppContext';

const playerDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type PlayerDto = z.infer<typeof playerDtoSchema>;

const GameStateSchema = z.enum(['NotStarted', 'EnteringPrompts', 'Drawing', 'Finished']);

const gameDtoSchema = z.object({
  id: z.string(),
  code: z.string(),
  state: GameStateSchema,
  players: z.array(playerDtoSchema),
  hostId: z.string(),
});

export type GameDto = z.infer<typeof gameDtoSchema>;

const gameUpdatePayloadSchema = z.object({
  game: gameDtoSchema,
});

type GameUpdateDto = z.infer<typeof gameUpdatePayloadSchema>;

const createGamePayloadSchema = z.object({
  username: z.string(),
});

type CreateGamePayload = z.infer<typeof createGamePayloadSchema>;

const gameCreatedPayloadSchema = z.object({
  game: gameDtoSchema,
  player: playerDtoSchema,
});

type GameCreatedPayload = z.infer<typeof gameCreatedPayloadSchema>;

const joinGamePayloadSchema = z.object({
  roomCode: z.string(),
  username: z.string(),
});

type JoinGamePayload = z.infer<typeof joinGamePayloadSchema>;

const gameJoinedPayloadSchema = z.object({
  game: gameDtoSchema,
  player: playerDtoSchema,
});

type GameJoinedPayload = z.infer<typeof gameCreatedPayloadSchema>;

interface StartGamePayload {
  playerId: string;
}

interface PromptDoneByPlayerPayload {
  promptText: string;
}

interface GameContextValue {
  game: Game | null;
  myPlayerId: string | null;
  createGame: (payload: CreateGamePayload) => void;
  joinRoom: (payload: JoinGamePayload) => void;
  startGame: (payload: StartGamePayload) => void;
  sendPrompt: (payload: PromptDoneByPlayerPayload) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameContextProvider({ children }: PropsWithChildren) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [myPlayerId, setMyPlayerId] = useState<string | null>(null);

  const appContext = useAppContext();

  useEffect(() => {
    const newSocket = io('ws://localhost:3001');
    setSocket(newSocket);
    return () => {
      socket?.disconnect();
      setSocket(null);
    };
  }, []);

  useEffect(() => {
    if (socket == null) {
      return;
    }

    const listener = (data: any) => {
      const payload = gameUpdatePayloadSchema.parse(data);
      const game = payload.game;
      setGame({
        id: game.id,
        players: game.players.map((p) => ({ id: p.id, name: p.name })),
        code: game.code,
        state: game.state,
        hostId: game.hostId,
      });
    };
    socket.on('gameUpdate', listener);
    return () => {
      socket.off('gameUpdate', listener);
    };
  }, [socket]);

  const createRoom = useCallback(
    (payload: CreateGamePayload) => {
      if (!socket) {
        return;
      }

      socket.emit('createGame', payload);

      socket.once('gameCreated', (data: any) => {
        const payload = gameCreatedPayloadSchema.parse(data);
        setGame({
          id: payload.game.id,
          hostId: payload.game.hostId,
          code: payload.game.code,
          state: payload.game.state,
          players: payload.game.players.map((p) => ({ id: p.id, name: p.name })),
        });
        setMyPlayerId(payload.player.id);
        appContext.setScreen('Game');
      });
    },
    [socket]
  );

  const joinGame = useCallback(
    (payload: JoinGamePayload) => {
      if (!socket) {
        return;
      }

      socket.emit('joinGame', payload);

      socket.once('gameJoined', (data: any) => {
        const payload = gameJoinedPayloadSchema.parse(data);
        setGame({
          id: payload.game.id,
          hostId: payload.game.hostId,
          code: payload.game.code,
          state: payload.game.state,
          players: payload.game.players.map((p) => ({ id: p.id, name: p.name })),
        });
        setMyPlayerId(payload.player.id);
        appContext.setScreen('Game');
      });
    },
    [socket]
  );

  const startGame = useCallback(
    (payload: StartGamePayload) => {
      if (!socket) {
        return;
      }

      socket.emit('startGame', payload);
    },
    [socket]
  );

  const sendPrompt = useCallback(
    (payload: PromptDoneByPlayerPayload) => {
      if (!socket) {
        return;
      }

      socket.emit('promptDoneByPlayer', payload);
    },

    [socket]
  );

  const contextValue: GameContextValue = {
    game: game,
    myPlayerId: myPlayerId,
    createGame: createRoom,
    joinRoom: joinGame,
    startGame: startGame,
    sendPrompt: sendPrompt,
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context == null) {
    throw new Error('Trying to use GameContext outside of the provider.');
  }
  return context;
}
