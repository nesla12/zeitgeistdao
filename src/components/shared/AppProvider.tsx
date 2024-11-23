import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import usePageTracking from '../../hooks/usePageTracking';
import useScrollRestoration from '../../hooks/useScrollRestoration';
import useOffline from '../../hooks/useOffline';

interface AppContextType {
  isOffline: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const isOffline = useOffline();
  
  // Initialize hooks
  usePageTracking();
  useScrollRestoration();

  // App-wide effects
  useEffect(() => {
    // Set theme based on user preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }

    // Clean up on unmount
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <AppContext.Provider value={{ isOffline }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppProvider;