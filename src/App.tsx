import { useState } from 'react';
import { PlayerDto, RoomDto } from './api/api';
import CreateGameScreen from './features/lobby/CreateGameScreen';
import RoomScreen from './features/lobby/RoomScreen';
import WelcomeScreen from './features/lobby/WelcomeScreen';

function App() {
  // TODO: Think about using router instead.
  const [screen, setScreen] = useState<'welcome' | 'create-game' | 'room'>('welcome');

  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);

  const handleWelcomeScreenCreateGame = () => {
    setScreen('create-game');
  };

  const handleGameScreenBack = () => {
    setScreen('welcome');
  };

  const handleGameScreenCreate = (room: RoomDto, player: PlayerDto) => {
    setRoomCode(room.code);
    setPlayerId(player.id);
    setScreen('room');
  };

  return (
    <div className="text-text">
      {screen === 'welcome' ? (
        <WelcomeScreen onCreateGame={handleWelcomeScreenCreateGame}></WelcomeScreen>
      ) : screen === 'create-game' ? (
        <CreateGameScreen onBack={handleGameScreenBack} onCreate={handleGameScreenCreate}></CreateGameScreen>
      ) : roomCode != null ? (
        <RoomScreen roomCode={roomCode}></RoomScreen>
      ) : (
        <div>Something is wrong...</div>
      )}
    </div>
  );
}

export default App;
