import React, { useState } from 'react';
import { joinRoom, PlayerDto, RoomDto } from '../../api/api';
import Button from '../../ui/Button';
import Container from '../../ui/Container';
import TextInput from '../../ui/TextInput';

interface JoinGameScreenProps {
  onJoin: (room: RoomDto, player: PlayerDto) => void;
  onBack: () => void;
}

export default function JoinGameScreen({ onJoin, onBack }: JoinGameScreenProps) {
  const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');

  const handleJoinGame = async () => {
    if (username == '' || roomCode == '') {
      return;
    }

    const { room, player } = await joinRoom({ roomCode: roomCode, username: username });
    onJoin?.(room, player);
  };

  return (
    <Container>
      <div className="h-full flex flex-col items-center pt-36 pb-12 px-6 justify-between">
        <h1 className="text-6xl text-brand">DrawChevo</h1>
        <div className="flex flex-col w-full gap-36">
          <div className="w-full">
            <TextInput label="Enter room code" value={roomCode} onChange={setRoomCode}></TextInput>
            <TextInput label="Enter your name" value={username} onChange={setUsername}></TextInput>
          </div>
          <div className="flex flex-col gap-4 items-stretch w-full">
            <Button label="Join Game" variant="primary" onClick={handleJoinGame}></Button>
            <Button label="Back" variant="default" onClick={onBack}></Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
