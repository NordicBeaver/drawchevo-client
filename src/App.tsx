import Drawchevo from './Drawchevo';
import { GameContextProvider } from './features/game/GameContext';

function App() {
  return (
    <GameContextProvider>
      <Drawchevo></Drawchevo>
    </GameContextProvider>
  );
}

export default App;
