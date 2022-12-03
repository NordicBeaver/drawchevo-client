import { useState } from 'react';
import { PlayerDto, RoomDto } from './api/api';
import CreateGameScreen from './features/lobby/CreateGameScreen';
import JoinGameScreen from './features/lobby/JoinGameScreen';
import RoomScreen from './features/lobby/RoomScreen';
import WelcomeScreen from './features/lobby/WelcomeScreen';

function App() {
  // TODO: Think about using router instead.
  const [screen, setScreen] = useState<'welcome' | 'create-game' | 'join-game' | 'room'>('welcome');

  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);

  const handleWelcomeScreenCreateGame = () => {
    setScreen('create-game');
  };

  const handleWelcomeScreenJoinGame = () => {
    setScreen('join-game');
  };

  const handleGameScreenBack = () => {
    setScreen('welcome');
  };

  const handleCreateGame = (room: RoomDto, player: PlayerDto) => {
    setRoomCode(room.code);
    setPlayerId(player.id);
    setScreen('room');
  };

  const handleJoinGame = (room: RoomDto, player: PlayerDto) => {
    setRoomCode(room.code);
    setPlayerId(player.id);
    setScreen('room');
  };

  return (
    <div className="text-text">
      {screen === 'welcome' ? (
        <WelcomeScreen
          onCreateGame={handleWelcomeScreenCreateGame}
          onJoinGame={handleWelcomeScreenJoinGame}
        ></WelcomeScreen>
      ) : screen === 'create-game' ? (
        <CreateGameScreen onBack={handleGameScreenBack} onCreate={handleCreateGame}></CreateGameScreen>
      ) : screen === 'join-game' ? (
        <JoinGameScreen onBack={handleGameScreenBack} onJoin={handleJoinGame}></JoinGameScreen>
      ) : roomCode != null && playerId != null ? (
        <RoomScreen playerId={playerId} roomCode={roomCode}></RoomScreen>
      ) : (
        <div>Something is wrong...</div>
      )}
    </div>
  );
}

export default App;
