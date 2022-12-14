import Drawchevo from './Drawchevo';
import { GameContextProvider } from './features/game/GameContext';
import { AppContextProvider } from './features/state/AppContext';

function App() {
  return (
    <AppContextProvider>
      <GameContextProvider>
        <Drawchevo></Drawchevo>
      </GameContextProvider>
    </AppContextProvider>
  );
}

export default App;
