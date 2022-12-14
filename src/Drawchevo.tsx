import GameScreen from './features/game/GameScreen';
import CreateGameScreen from './features/lobby/CreateGameScreen';
import JoinGameScreen from './features/lobby/JoinGameScreen';
import WelcomeScreen from './features/lobby/WelcomeScreen';
import { useAppContext } from './features/state/AppContext';

export default function Drawchevo() {
  const appContext = useAppContext();

  const handleWelcomeScreenCreateGame = () => {
    appContext.setScreen('CreateGame');
  };

  const handleWelcomeScreenJoinGame = () => {
    appContext.setScreen('JoinGame');
  };

  const handleGameScreenBack = () => {
    appContext.setScreen('Welcome');
  };

  return (
    <div className="text-text">
      {appContext.screen === 'Welcome' ? (
        <WelcomeScreen
          onCreateGame={handleWelcomeScreenCreateGame}
          onJoinGame={handleWelcomeScreenJoinGame}
        ></WelcomeScreen>
      ) : appContext.screen === 'CreateGame' ? (
        <CreateGameScreen onBack={handleGameScreenBack}></CreateGameScreen>
      ) : appContext.screen === 'JoinGame' ? (
        <JoinGameScreen onBack={handleGameScreenBack}></JoinGameScreen>
      ) : appContext.screen === 'Game' ? (
        <GameScreen></GameScreen>
      ) : (
        <div>Unknown screen...</div>
      )}
    </div>
  );
}
