import '../../../css/index.css';
import Container from '../../ui/Container';
import DrawingScreen from './DrawingScreen';
import { GameContext, GameContextValue } from './GameContext';

export const DrawingScreenStory = () => {
  const gameContextValue: GameContextValue = {
    game: {
      id: 'game_id',
      state: 'Drawing',
      stage: 1,
      players: [
        { id: 'player_1', name: 'Player 1' },
        { id: 'player_2', name: 'Player 2' },
      ],
      playersOrder: ['player_1', 'player_2'],
      prompts: [
        { id: 'prompt_1', playerId: 'player_1', text: 'Prompt 1' },
        { id: 'prompt_2', playerId: 'player_2', text: 'Prompt 2' },
      ],
      chains: [
        { initialPlayerId: 'player_1', entries: ['prompt_1'] },
        { initialPlayerId: 'player_2', entries: ['prompt_2'] },
      ],
      hostId: 'player_1',
    },
    myPlayerId: 'player_1',
    sendDrawing: (payload) => console.log('Send drawing', payload),
  } as GameContextValue;

  return (
    <GameContext.Provider value={gameContextValue}>
      <div className="text-text bg-background ">
        <Container>
          <DrawingScreen></DrawingScreen>
        </Container>
      </div>
    </GameContext.Provider>
  );
};
