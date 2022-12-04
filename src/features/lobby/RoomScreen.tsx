import Button from '../../ui/Button';
import Container from '../../ui/Container';
import { useGameContext } from '../game/GameContext';

export interface RoomScreenProps {
  onStartGame?: () => void;
  onQuit?: () => void;
}

export default function RoomScreen({ onStartGame, onQuit }: RoomScreenProps) {
  const { game, myPlayerId } = useGameContext();

  if (!game) {
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
          <span className="text-brand text-4xl">{game.code}</span>
        </div>
        <div>
          <h2 className="text-xl">Players:</h2>
          <ul>
            {game.players.map((player) => (
              <li className={`${player.id === myPlayerId ? 'font-bold' : ''}`}>{player.name}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 items-stretch w-full">
          {game.hostId === myPlayerId ? (
            <Button label="Start Game" variant="primary" onClick={onStartGame}></Button>
          ) : (
            <p>Waiting for the host to start</p>
          )}
          <Button label="Quit" variant="default" onClick={onQuit}></Button>
        </div>
      </div>
    </Container>
  );
}
