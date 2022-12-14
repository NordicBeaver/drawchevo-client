import Button from '../../ui/Button';
import Container from '../../ui/Container';
import { useGameContext } from './GameContext';

export interface RoomScreenProps {
  onQuit?: () => void;
}

export default function RoomScreen({ onQuit }: RoomScreenProps) {
  const gameContext = useGameContext();

  const handleStartGame = () => {
    if (!gameContext.myPlayerId) {
      return;
    }
    gameContext.startGame({ playerId: gameContext.myPlayerId });
  };

  if (!gameContext.game) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="h-full flex flex-col justify-between">
        <div>
          <span className="text-brand text-lg">DrawChevo</span>
        </div>
        <div className="flex flex-col items-center">
          <span>Room code</span>
          <span className="text-brand text-4xl">{gameContext.game.code}</span>
        </div>
        <div>
          <h2 className="text-xl">Players:</h2>
          <ul>
            {gameContext.game.players.map((player) => (
              <li className={`${player.id === gameContext.myPlayerId ? 'font-bold' : ''}`}>{player.name}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 items-stretch w-full">
          {gameContext.game.hostId === gameContext.myPlayerId ? (
            <Button label="Start Game" variant="primary" onClick={handleStartGame}></Button>
          ) : (
            <p>Waiting for the host to start</p>
          )}
          <Button label="Quit" variant="default" onClick={onQuit}></Button>
        </div>
      </div>
    </Container>
  );
}
