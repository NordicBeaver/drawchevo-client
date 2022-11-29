import { useState } from 'react';
import CreateGameScreen from './features/lobby/CreateGameScreen';
import WelcomeScreen from './features/lobby/WelcomeScreen';

function App() {
  // TODO: Think about using router instead.
  const [screen, setScreen] = useState<'welcome' | 'create-game'>('welcome');

  const handleWelcomeScreenCreateGame = () => {
    setScreen('create-game');
  };

  const handleGameScreenBack = () => {
    setScreen('welcome');
  };

  return (
    <div>
      {screen === 'welcome' ? (
        <WelcomeScreen onCreateGame={handleWelcomeScreenCreateGame}></WelcomeScreen>
      ) : (
        <CreateGameScreen onBack={handleGameScreenBack}></CreateGameScreen>
      )}
    </div>
  );
}

export default App;
