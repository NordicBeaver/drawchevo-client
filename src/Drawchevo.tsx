import { useGameContext } from './features/game/GameContext';
import PromptScreen from './features/game/PromptScreen';
import CreateGameScreen from './features/lobby/CreateGameScreen';
import JoinGameScreen from './features/lobby/JoinGameScreen';
import RoomScreen from './features/lobby/RoomScreen';
import WelcomeScreen from './features/lobby/WelcomeScreen';

export default function Drawchevo() {
  const gameContext = useGameContext();

  const handleWelcomeScreenCreateGame = () => {
    gameContext.setScreen('create-game');
  };

  const handleWelcomeScreenJoinGame = () => {
    gameContext.setScreen('join-game');
  };

  const handleGameScreenBack = () => {
    gameContext.setScreen('welcome');
  };

  return (
    <div className="text-text">
      {gameContext.screen === 'welcome' ? (
        <WelcomeScreen
          onCreateGame={handleWelcomeScreenCreateGame}
          onJoinGame={handleWelcomeScreenJoinGame}
        ></WelcomeScreen>
      ) : gameContext.screen === 'create-game' ? (
        <CreateGameScreen onBack={handleGameScreenBack}></CreateGameScreen>
      ) : gameContext.screen === 'join-game' ? (
        <JoinGameScreen onBack={handleGameScreenBack}></JoinGameScreen>
      ) : gameContext.screen === 'room' ? (
        gameContext.game?.state === 'notStarted' ? (
          <RoomScreen></RoomScreen>
        ) : gameContext.game?.state === 'enteringPrompts' ? (
          <PromptScreen></PromptScreen>
        ) : gameContext.game?.state === 'finished' ? (
          <div>Finished!</div>
        ) : null
      ) : null}
    </div>
  );
}
