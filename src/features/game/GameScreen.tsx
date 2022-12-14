import React from 'react';
import { useGameContext } from './GameContext';
import PregameScreen from './PregameScreen';
import PromptScreen from './PromptScreen';
import DrawingScreen from './DrawingScreen';

export default function Game() {
  const gameContext = useGameContext();

  return (
    <div>
      {gameContext.game?.state === 'NotStarted' ? (
        <PregameScreen></PregameScreen>
      ) : gameContext.game?.state === 'EnteringPrompts' ? (
        <PromptScreen></PromptScreen>
      ) : gameContext.game?.state === 'Drawing' ? (
        <DrawingScreen></DrawingScreen>
      ) : gameContext.game?.state === 'Finished' ? (
        <div>Finished!</div>
      ) : (
        <div>Game state not defined...</div>
      )}
    </div>
  );
}
