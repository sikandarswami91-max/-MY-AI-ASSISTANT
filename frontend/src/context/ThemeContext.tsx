import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../services/api';

export type ThemeMode = 'dark' | 'light' | 'system';

export interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Requirement: Default theme must always be Light Mode for a new user
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('nova_theme') as ThemeMode;
      if (saved === 'dark' || saved === 'light' || saved === 'system') {
        return saved;
      }
      return 'light';
    } catch {
      return 'light';
    }
  });

  const [isDark, setIsDark] = useState<boolean>(false);

  // Apply theme class to document root
  const applyTheme = useCallback((mode: ThemeMode) => {
    const root = document.documentElement;
    let darkActive = false;

    if (mode === 'system') {
      darkActive = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      darkActive = mode === 'dark';
    }

    setIsDark(darkActive);
    if (darkActive) {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.colorScheme = 'light';
    }
  }, []);

  // Listen to system changes if theme is 'system'
  useEffect(() => {
    applyTheme(theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, applyTheme]);

  // Sync with backend user settings on initial mount
  useEffect(() => {
    const syncBackendSettings = async () => {
      try {
        const settings = await api.settings.get();
        if (settings?.appearance?.theme) {
          const backendTheme = settings.appearance.theme as ThemeMode;
          if (['light', 'dark', 'system'].includes(backendTheme)) {
            setThemeState(backendTheme);
            try {
              localStorage.setItem('nova_theme', backendTheme);
            } catch (e) {
              console.warn(e);
            }
          }
        }
      } catch (err) {
        // Backend not reached or guest session; local storage preference persists
      }
    };

    syncBackendSettings();
  }, []);

  // Public setter that updates state, localStorage, and database
  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('nova_theme', newTheme);
    } catch (e) {
      console.warn(e);
    }

    // Attempt persistent backend database update
    api.settings.update({ appearance: { theme: newTheme } }).catch(() => {
      // Ignored if unauthenticated or offline
    });
  };

  const toggleTheme = () => {
    const nextTheme: ThemeMode = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
