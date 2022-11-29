import React from 'react';
import Button from '../../ui/Button';
import Container from '../../ui/Container';

export default function WelcomeScreen() {
  return (
    <Container>
      <div className="h-full flex flex-col items-center pt-36 pb-12 px-6 justify-between">
        <h1 className="text-6xl text-brand">DrawChevo</h1>
        <div className="flex flex-col gap-4 items-stretch w-full">
          <Button label="Create Game" variant="primary"></Button>
          <Button label="Join Game" variant="primary"></Button>
        </div>
      </div>
    </Container>
  );
}
