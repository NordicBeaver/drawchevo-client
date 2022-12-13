import React from 'react';
import { SketchBoard } from 'react-sketchboard';
import Container from '../../ui/Container';
import { useGameContext } from './GameContext';

export default function DrawingScreen() {
  const gameContext = useGameContext();

  gameContext;

  return (
    <Container>
      <div className="h-full flex flex-col justify-between pb-12">
        <div>
          <span className="text-brand text-lg">DrawChevo</span>
        </div>
        <div>
          <SketchBoard color="000000" weight={2}></SketchBoard>
        </div>
      </div>
    </Container>
  );
}
