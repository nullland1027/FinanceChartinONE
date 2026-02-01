import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type ThemeName = 'purple' | 'orange' | 'red' | 'black';

interface ThemeClasses {
  name: ThemeName;
  primary: string;      // Main brand color (e.g. for buttons, active states)
  primaryBg: string;    // Background version of primary
  text: string;         // Text color for branding
  border: string;       // Border color for branding
  light: string;        // Light background (e.g. for timeline bars)
  hover: string;        // Hover state
}

const THEME_MAP: Record<ThemeName, ThemeClasses> = {
  purple: {
    name: 'purple',
    primary: 'bg-indigo-600',
    primaryBg: 'bg-indigo-500', // Used in timeline
    text: 'text-indigo-500',
    border: 'border-indigo-500',
    light: 'bg-indigo-200',
    hover: 'hover:bg-indigo-50',
  },
  orange: {
    name: 'orange',
    primary: 'bg-orange-600',
    primaryBg: 'bg-orange-500',
    text: 'text-orange-500',
    border: 'border-orange-500',
    light: 'bg-orange-200',
    hover: 'hover:bg-orange-50',
  },
  red: {
    name: 'red',
    primary: 'bg-red-600',
    primaryBg: 'bg-red-500',
    text: 'text-red-500',
    border: 'border-red-500',
    light: 'bg-red-200',
    hover: 'hover:bg-red-50',
  },
  black: {
    name: 'black',
    primary: 'bg-gray-900',
    primaryBg: 'bg-gray-800',
    text: 'text-gray-900',
    border: 'border-gray-900',
    light: 'bg-gray-300',
    hover: 'hover:bg-gray-100',
  }
};

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  classes: ThemeClasses;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    return (localStorage.getItem('app-theme') as ThemeName) || 'purple';
  });

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  const classes = THEME_MAP[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, classes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
