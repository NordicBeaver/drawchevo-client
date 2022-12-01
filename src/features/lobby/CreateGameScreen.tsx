import React, { useState } from 'react';
import { createRoom, joinRoom, PlayerDto, RoomDto } from '../../api/api';
import Button from '../../ui/Button';
import Container from '../../ui/Container';
import TextInput from '../../ui/TextInput';

export interface CreateGameScreenProps {
  onCreate?: (room: RoomDto, player: PlayerDto) => void;
  onBack?: () => void;
}
export default function CreateGameScreen({ onCreate, onBack }: CreateGameScreenProps) {
  const [username, setUsername] = useState('');

  const handleCreateGame = async () => {
    if (username == '') {
      return;
    }

    const room = await createRoom();
    const player = await joinRoom({ roomCode: room.code, username: username });
    onCreate?.(room, player);
  };

  return (
    <Container>
      <div className="h-full flex flex-col items-center pt-36 pb-12 px-6 justify-between">
        <h1 className="text-6xl text-brand">DrawChevo</h1>
        <div className="flex flex-col w-full gap-36">
          <div className="w-full">
            <TextInput label="Enter your name" value={username} onChange={setUsername}></TextInput>
          </div>
          <div className="flex flex-col gap-4 items-stretch w-full">
            <Button label="Create Game" variant="primary" onClick={handleCreateGame}></Button>
            <Button label="Back" variant="default" onClick={onBack}></Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
