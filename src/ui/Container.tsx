import React, { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  return (
    <div className="h-screen overflow-auto">
      <div className="m-auto max-w-md min-h-full p-4 flex">{children}</div>
    </div>
  );
}
