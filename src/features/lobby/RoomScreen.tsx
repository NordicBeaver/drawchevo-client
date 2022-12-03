import React, { useEffect, useState } from 'react';
import { getRoom, RoomDto } from '../../api/api';
import Button from '../../ui/Button';
import Container from '../../ui/Container';

export interface RoomScreenProps {
  playerId: string;
  roomCode: string;
  onStartGame?: () => void;
  onQuit?: () => void;
}

export default function RoomScreen({ playerId, roomCode, onStartGame, onQuit }: RoomScreenProps) {
  const [room, setRoom] = useState<RoomDto | null>(null);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const room = await getRoom(roomCode);
      setRoom(room);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [roomCode]);

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="h-full flex flex-col justify-between">
        <div>
          <span className="text-brand text-lg">DrawChevo</span>
        </div>
        <div className="flex flex-col items-center">
          <span>Room code</span>
          <span className="text-brand text-4xl">{roomCode}</span>
        </div>
        <div>
          <h2 className="text-xl">Players:</h2>
          <ul>
            {room.players.map((player) => (
              <li className={`${player.id === playerId ? 'font-bold' : ''}`}>{player.name}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 items-stretch w-full">
          {room.hostId === playerId ? (
            <Button label="Start Game" variant="primary" onClick={onStartGame}></Button>
          ) : (
            <p>Waiting for the host to start</p>
          )}
          <Button label="Quit" variant="default" onClick={onQuit}></Button>
        </div>
      </div>
    </Container>
  );
}
