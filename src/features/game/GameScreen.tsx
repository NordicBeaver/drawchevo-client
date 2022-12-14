import React from 'react';
import { useGameContext } from './GameContext';
import PregameScreen from './PregameScreen';
import PromptScreen from './PromptScreen';
import DrawingScreen from './DrawingScreen';
import ResultsScreen from './ResultsScreen';

export default function Game() {
  const gameContext = useGameContext();

  return (
    <>
      {gameContext.game?.state === 'NotStarted' ? (
        <PregameScreen></PregameScreen>
      ) : gameContext.game?.state === 'EnteringPrompts' ? (
        <PromptScreen></PromptScreen>
      ) : gameContext.game?.state === 'Drawing' ? (
        <DrawingScreen></DrawingScreen>
      ) : gameContext.game?.state === 'Results' ? (
        <ResultsScreen></ResultsScreen>
      ) : (
        <div>Game state not defined...</div>
      )}
    </>
  );
}
