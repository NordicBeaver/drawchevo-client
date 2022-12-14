import React, { useState } from 'react';
import { SketchBoard } from 'react-sketchboard';
import { SketchBoardControls } from 'react-sketchboard/dist/components/SketchBoard';
import Button from '../../ui/Button';
import Container from '../../ui/Container';
import { useGameContext } from './GameContext';

export default function DrawingScreen() {
  const [sketchBoardControls, setSketchBoardControls] = useState<SketchBoardControls | null>(null);

  const gameContext = useGameContext();

  const game = gameContext.game;
  if (!game) {
    return <div>Something went wrong lol</div>;
  }

  // Get the prompt that a player needs to draw.
  const myId = gameContext.myPlayerId;
  const myIndex = game.playersOrder.findIndex((p) => p === myId);
  const prevPlayerIndex = (game.playersOrder.length + myIndex - 1) % game.playersOrder.length;
  const prevPlayerId = game.playersOrder[prevPlayerIndex];
  const lastStagePromptIds = game.chains.map((chain) => chain.entries[game.stage - 1]);
  const lastStagePrompts = game.prompts.filter((prompt) => lastStagePromptIds.includes(prompt.id));
  const prompt = lastStagePrompts.find((prompt) => prompt.playerId === prevPlayerId);

  if (!prompt) {
    return <div>Something went wrong lol</div>;
  }

  const handleDone = () => {
    if (sketchBoardControls == null) {
      return;
    }

    const drawingData = sketchBoardControls.getImageDataUrl();
    gameContext.sendDrawing({ promptId: prompt.id, drawingData: drawingData });
  };

  return (
    <div className="min-h-full w-full flex flex-col justify-between pb-12">
      <div>
        <span className="text-brand text-lg">DrawChevo</span>
      </div>
      <div>
        <p>Please draw this:</p>
        <p className="text-lg font-bold">{prompt.text}</p>
      </div>
      <div>
        <SketchBoard color="000000" weight={2} onControlsChange={setSketchBoardControls}></SketchBoard>
      </div>
      <div>
        <Button label="Done" variant="primary" onClick={handleDone}></Button>
      </div>
    </div>
  );
}
