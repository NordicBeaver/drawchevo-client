import React, { useEffect, useState } from 'react';
import Container from '../../ui/Container';
import { GameResult, useGameContext } from './GameContext';

export default function ResultsScreen() {
  const [result, setResult] = useState<GameResult | null>(null);

  const gameContext = useGameContext();

  const getGameResult = gameContext.getGameResult;
  useEffect(() => {
    const fetchGameResult = async () => {
      const result = await getGameResult();
      setResult(result);
    };
    fetchGameResult();
  }, [getGameResult]);

  return (
    <div className="min-h-full flex flex-col justify-between pb-12 ">
      <div>
        <span className="text-brand text-lg">DrawChevo</span>
      </div>
      <div>
        {result != null ? (
          <div>
            {result.chains.map((chain) => (
              <div className="mb-8">
                <h2 className="text-2xl">{chain.initialPlayerName}</h2>
                <div>
                  {chain.entries.map((entry) => (
                    <div>
                      {entry.type === 'prompt' ? (
                        <div>
                          <p>{entry.playerName} wrote:</p>
                          <p className="text-lg">{entry.text}</p>
                        </div>
                      ) : (
                        <div>
                          {entry.playerName} drew:
                          <img src={entry.drawingData}></img>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
