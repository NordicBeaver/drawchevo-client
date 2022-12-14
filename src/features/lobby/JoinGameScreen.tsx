import React, { useState } from 'react';
import Button from '../../ui/Button';
import Container from '../../ui/Container';
import TextInput from '../../ui/TextInput';
import { useGameContext } from '../game/GameContext';

interface JoinGameScreenProps {
  onBack: () => void;
}

export default function JoinGameScreen({ onBack }: JoinGameScreenProps) {
  const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');

  const gameContext = useGameContext();

  const handleJoinGame = async () => {
    if (username == '' || roomCode == '') {
      return;
    }

    gameContext.joinRoom({ roomCode: roomCode, username: username });
  };

  return (
    <div className="min-h-full w-full flex flex-col items-center pt-36 pb-12 px-6 justify-between">
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
  );
}
