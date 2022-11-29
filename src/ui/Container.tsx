import React, { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  return (
    <div className="bg-background h-screen">
      <div className="m-auto max-w-md h-full">{children}</div>
    </div>
  );
}
