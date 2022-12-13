import Button from '../../ui/Button';
import Container from '../../ui/Container';

export interface WelcomeScreenProps {
  onCreateGame?: () => void;
  onJoinGame?: () => void;
}

export default function WelcomeScreen({ onCreateGame, onJoinGame }: WelcomeScreenProps) {
  return (
    <Container>
      <div className="h-full flex flex-col items-center pt-36 pb-12 px-6 justify-between">
        <h1 className="text-6xl text-brand">DrawChevo</h1>
        <div className="flex flex-col gap-4 items-stretch w-full">
          <Button label="Create Game" variant="primary" onClick={onCreateGame}></Button>
          <Button label="Join Game" variant="primary" onClick={onJoinGame}></Button>
        </div>
      </div>
    </Container>
  );
}
