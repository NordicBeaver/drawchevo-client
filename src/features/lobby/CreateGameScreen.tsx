import { useState } from 'react';
import Button from '../../ui/Button';
import Container from '../../ui/Container';
import TextInput from '../../ui/TextInput';
import { useGameContext } from '../game/GameContext';

export interface CreateGameScreenProps {
  onBack?: () => void;
}
export default function CreateGameScreen({ onBack }: CreateGameScreenProps) {
  const [username, setUsername] = useState('');

  const gameContext = useGameContext();

  const handleCreateGame = async () => {
    if (username == '') {
      return;
    }

    gameContext.createRoom({ username: username });
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
