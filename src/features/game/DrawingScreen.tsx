import { useState } from 'react';
import { SketchBoard } from 'react-sketchboard';
import { SketchBoardControls } from 'react-sketchboard/dist/components/SketchBoard';
import Button from '../../ui/Button';
import ColorPicker from './ColorPicker';
import { useGameContext } from './GameContext';

export default function DrawingScreen() {
  const [sketchBoardControls, setSketchBoardControls] = useState<SketchBoardControls | null>(null);
  const [drawingSent, setDrawingSent] = useState(false);
  const [color, setColor] = useState('#000000');

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
    console.error('Drawing Screen: prompt not found');
    return <div>Something went wrong lol</div>;
  }

  const handleDone = () => {
    if (sketchBoardControls == null) {
      return;
    }

    const drawingData = sketchBoardControls.getImageDataUrl();
    gameContext.sendDrawing({ promptId: prompt.id, drawingData: drawingData });

    setDrawingSent(true);
  };

  return (
    <div className="min-h-full w-full flex flex-col justify-between pb-12">
      <div>
        <span className="text-brand text-lg">DrawChevo</span>
      </div>
      {!drawingSent ? (
        <>
          <div>
            <p>Please draw this:</p>
            <p className="text-lg font-bold">{prompt.text}</p>
          </div>
          <div className="flex flex-col gap-2">
            <ColorPicker
              options={['#000000', '#ff0000', '#00ff00', '#0000ff']}
              value={color}
              onChange={setColor}
            ></ColorPicker>
            {/* Fix the need to strip '#' from color */}
            <SketchBoard color={color.slice(1)} weight={2} onControlsChange={setSketchBoardControls}></SketchBoard>
          </div>
          <div>
            <Button label="Done" variant="primary" onClick={handleDone}></Button>
          </div>
        </>
      ) : (
        <div>
          <p>Waiting for other players...</p>
        </div>
      )}
    </div>
  );
}
