import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { Game } from './Game';
import { io, Socket } from 'socket.io-client';

export interface PlayerDto {
  id: string;
  name: string;
}

export interface RoomDto {
  id: string;
  code: string;
  players: PlayerDto[];
  hostId: string;
}

interface CreateRoomPayload {
  username: string;
}

interface RoomCreatedPayload {
  room: RoomDto;
  player: PlayerDto;
}

interface JoinRoomPayload {
  roomCode: string;
  username: string;
}

interface RoomJoinedPayload {
  room: RoomDto;
  player: PlayerDto;
}

type Screen = 'welcome' | 'create-game' | 'join-game' | 'room';

interface GameContextValue {
  screen: Screen;
  game: Game | null;
  myPlayerId: string | null;
  setScreen: (screen: Screen) => void;
  createRoom: (payload: CreateRoomPayload) => void;
  joinRoom: (payload: JoinRoomPayload) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameContextProvider({ children }: PropsWithChildren) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [myPlayerId, setMyPlayerId] = useState<string | null>(null);

  // TODO: Think about using router instead.
  const [screen, setScreen] = useState<Screen>('welcome');

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

    const listener = ({ room }: { room: RoomDto }) => {
      setGame({
        id: room.id,
        players: room.players.map((p) => ({ id: p.id, name: p.name })),
        code: room.code,
        hostId: room.hostId,
      });
    };
    socket.on('gameUpdate', listener);
    return () => {
      socket.off('gameUpdate', listener);
    };
  }, [socket]);

  const createRoom = useCallback(
    (payload: CreateRoomPayload) => {
      if (!socket) {
        return;
      }

      socket.emit('createRoom', payload);

      socket.once('roomCreated', (payload: RoomCreatedPayload) => {
        setGame({
          id: payload.room.id,
          hostId: payload.room.hostId,
          code: payload.room.code,
          players: payload.room.players.map((p) => ({ id: p.id, name: p.name })),
        });
        setMyPlayerId(payload.player.id);
        setScreen('room');
      });
    },
    [socket]
  );

  const joinRoom = useCallback(
    (payload: JoinRoomPayload) => {
      if (!socket) {
        return;
      }

      socket.emit('joinRoom', payload);

      socket.once('roomJoined', (payload: RoomJoinedPayload) => {
        setGame({
          id: payload.room.id,
          hostId: payload.room.hostId,
          code: payload.room.code,
          players: payload.room.players.map((p) => ({ id: p.id, name: p.name })),
        });
        setMyPlayerId(payload.player.id);
        setScreen('room');
      });
    },
    [socket]
  );

  const contextValue: GameContextValue = {
    screen: screen,
    game: game,
    myPlayerId: myPlayerId,
    setScreen: setScreen,
    createRoom: createRoom,
    joinRoom: joinRoom,
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
