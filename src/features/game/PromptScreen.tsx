import React, { useState } from 'react';
import Button from '../../ui/Button';
import Container from '../../ui/Container';
import TextInput from '../../ui/TextInput';
import { useGameContext } from './GameContext';

export default function PromptScreen() {
  const [prompt, setPrompt] = useState('');

  const gameContext = useGameContext();

  const handleDone = () => {
    if (prompt.length === 0) {
      return;
    }

    gameContext.sendPrompt({ promptText: prompt });
  };

  return (
    <Container>
      <div className="h-full flex flex-col justify-between pb-12 ">
        <div>
          <span className="text-brand text-lg">DrawChevo</span>
        </div>
        <div>{gameContext.game?.state}</div>
        <div>
          <TextInput label="Enter something" value={prompt} onChange={setPrompt}></TextInput>
        </div>
        <div>
          <Button label="Done" variant="primary" onClick={handleDone}></Button>
        </div>
      </div>
    </Container>
  );
}
