import { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import TextInput from '../../ui/TextInput';
import { Game } from './Game';
import { DrawingData, useGameContext } from './GameContext';

/** Get the drawing that a player needs to draw. */
function getDrawingToName(game: Game, myId: string) {
  const myIndex = game.playersOrder.findIndex((p) => p === myId);
  const prevPlayerIndex = (game.playersOrder.length + myIndex - 1) % game.playersOrder.length;
  const prevPlayerId = game.playersOrder[prevPlayerIndex];
  const lastStageDrawingIds = game.chains.map((chain) => chain.entries[game.stage - 1]);
  const lastStageDrawings = game.drawings.filter((drawing) => lastStageDrawingIds.includes(drawing.id));
  const drawing = lastStageDrawings.find((drawing) => drawing.playerId === prevPlayerId);
  return drawing ?? null;
}

export default function PromptScreen() {
  const [prompt, setPrompt] = useState('');
  const [drawingData, setDrawingData] = useState<DrawingData | null>(null);
  const [promptSent, setPromptSent] = useState(false);

  const gameContext = useGameContext();
  const game = gameContext.game;
  const drawing = game && gameContext.myPlayerId ? getDrawingToName(game, gameContext.myPlayerId) : null;

  useEffect(() => {
    const getDrawing = gameContext.getDrawing;
    const fetchDrawing = async () => {
      if (!drawing) {
        return null;
      }
      const data = await getDrawing({ drawingId: drawing.id });
      setDrawingData(data);
    };
    fetchDrawing();
  }, [drawing, gameContext.getDrawing]);

  const handleDone = () => {
    if (prompt.length === 0) {
      return;
    }

    if (drawing != null) {
      gameContext.sendPrompt({ promptText: prompt, drawingId: drawing.id });
    } else {
      gameContext.sendPrompt({ promptText: prompt });
    }

    setPromptSent(true);
  };

  return (
    <div className="min-h-full w-full flex flex-col justify-between pb-12 ">
      <div>
        <span className="text-brand text-lg">DrawChevo</span>
      </div>
      {!promptSent ? (
        <>
          <div>{drawingData ? <img src={drawingData.data}></img> : null}</div>
          <div>
            <TextInput label="Enter something" value={prompt} onChange={setPrompt}></TextInput>
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
