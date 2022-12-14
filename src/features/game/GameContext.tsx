import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { z } from 'zod';
import {
  createGamePayloadSchema,
  drawingDonePayloadSchema,
  gameCreatedPayloadSchema,
  gameJoinedPayloadSchema,
  gameUpdatePayloadSchema,
  joinGamePayloadSchema,
  promptDonePayloadSchema,
  startGamePayloadSchema,
} from '../../api/schemas';
import { useAppContext } from '../state/AppContext';
import { Game } from './Game';

type CreateGamePayload = z.infer<typeof createGamePayloadSchema>;
type JoinGamePayload = z.infer<typeof joinGamePayloadSchema>;
type StartGamePayload = z.infer<typeof startGamePayloadSchema>;
type PromptDoneByPlayerPayload = z.infer<typeof promptDonePayloadSchema>;
type DrawingDoneByPlayerPayload = z.infer<typeof drawingDonePayloadSchema>;

interface GameContextValue {
  game: Game | null;
  myPlayerId: string | null;
  createGame: (payload: CreateGamePayload) => void;
  joinRoom: (payload: JoinGamePayload) => void;
  startGame: (payload: StartGamePayload) => void;
  sendPrompt: (payload: PromptDoneByPlayerPayload) => void;
  sendDrawing: (payload: DrawingDoneByPlayerPayload) => void;
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
      setGame(payload.game);
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
        setGame(payload.game);
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
        setGame(payload.game);
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

  const sendDrawing = useCallback(
    (payload: DrawingDoneByPlayerPayload) => {
      console.log({ payload });
      if (!socket) {
        return;
      }

      socket.emit('drawingDoneByPlayer', payload);
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
    sendDrawing: sendDrawing,
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
