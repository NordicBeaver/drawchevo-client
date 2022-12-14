import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

type Screen = 'Welcome' | 'CreateGame' | 'JoinGame' | 'Game';

interface AppContextValue {
  screen: Screen;
  setScreen: (screen: Screen) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: PropsWithChildren) {
  const [screen, setScreen] = useState<Screen>('Welcome');

  const contextValue: AppContextValue = {
    screen: screen,
    setScreen: setScreen,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context == null) {
    throw new Error('Trying to use AppContext outside of the provider.');
  }
  return context;
}
