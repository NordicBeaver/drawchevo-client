import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { z } from 'zod';
import {
  createGamePayloadSchema,
  drawingDataPayloadSchema,
  drawingDataSchema,
  drawingDonePayloadSchema,
  gameCreatedPayloadSchema,
  gameJoinedPayloadSchema,
  gameResultPayloadSchema,
  gameResultSchema,
  gameUpdatePayloadSchema,
  joinGamePayloadSchema,
  promptDonePayloadSchema,
  requestDrawingDataPayloadSchema,
  startGamePayloadSchema,
} from '../../api/schemas';
import { useAppContext } from '../state/AppContext';
import { Game } from './Game';

export type DrawingData = z.infer<typeof drawingDataSchema>;
export type GameResult = z.infer<typeof gameResultSchema>;

type CreateGamePayload = z.infer<typeof createGamePayloadSchema>;
type JoinGamePayload = z.infer<typeof joinGamePayloadSchema>;
type StartGamePayload = z.infer<typeof startGamePayloadSchema>;
type PromptDoneByPlayerPayload = z.infer<typeof promptDonePayloadSchema>;
type DrawingDoneByPlayerPayload = z.infer<typeof drawingDonePayloadSchema>;
type RequestDrawingDataPayload = z.infer<typeof requestDrawingDataPayloadSchema>;

export interface GameContextValue {
  game: Game | null;
  myPlayerId: string | null;
  createGame: (payload: CreateGamePayload) => void;
  joinRoom: (payload: JoinGamePayload) => void;
  startGame: (payload: StartGamePayload) => void;
  sendPrompt: (payload: PromptDoneByPlayerPayload) => void;
  sendDrawing: (payload: DrawingDoneByPlayerPayload) => void;
  getDrawing: (paylaod: RequestDrawingDataPayload) => Promise<DrawingData | null>;
  getGameResult: () => Promise<GameResult | null>;
}

export const GameContext = createContext<GameContextValue | null>(null);

export function GameContextProvider({ children }: PropsWithChildren) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [myPlayerId, setMyPlayerId] = useState<string | null>(null);

  const appContext = useAppContext();

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SERVER_URL);
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
      if (!socket) {
        return;
      }

      socket.emit('drawingDoneByPlayer', payload);
    },
    [socket]
  );

  const getDrawing = useCallback(
    (payload: RequestDrawingDataPayload) => {
      return new Promise<DrawingData | null>((resolve, reject) => {
        if (!socket) {
          return resolve(null);
        }

        socket.emit('requestDrawingData', payload);

        socket.once('drawingData', (data: any) => {
          const payload = drawingDataPayloadSchema.parse(data);
          return resolve(payload.drawing);
        });
      });
    },
    [socket]
  );

  const getGameResult = useCallback(() => {
    return new Promise<GameResult | null>((resolve, reject) => {
      if (!socket) {
        return resolve(null);
      }

      socket.emit('requestGameResult');

      socket.once('gameResult', (data: any) => {
        const payload = gameResultPayloadSchema.parse(data);
        return resolve(payload.gameResult);
      });
    });
  }, [socket]);

  const contextValue: GameContextValue = {
    game: game,
    myPlayerId: myPlayerId,
    createGame: createRoom,
    joinRoom: joinGame,
    startGame: startGame,
    sendPrompt: sendPrompt,
    sendDrawing: sendDrawing,
    getDrawing: getDrawing,
    getGameResult: getGameResult,
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
