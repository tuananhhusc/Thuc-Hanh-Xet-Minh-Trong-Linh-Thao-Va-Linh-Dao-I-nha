'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'parchment' | 'dark' | 'white';
type FontSize = 'base' | 'large' | 'xl';
type FontFamily = 'serif' | 'sans';

interface ReadingContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  fontFamily: FontFamily;
  setFontFamily: (font: FontFamily) => void;
}

const ReadingContext = createContext<ReadingContextType | undefined>(undefined);

export function ReadingProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('parchment');
  const [fontSize, setFontSize] = useState<FontSize>('base');
  const [fontFamily, setFontFamily] = useState<FontFamily>('serif');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const savedTheme = localStorage.getItem('reading-theme') as Theme;
    const savedFontSize = localStorage.getItem('reading-fontsize') as FontSize;
    const savedFontFamily = localStorage.getItem('reading-fontfamily') as FontFamily;

    if (savedTheme) setTheme(savedTheme);
    if (savedFontSize) setFontSize(savedFontSize);
    if (savedFontFamily) setFontFamily(savedFontFamily);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('reading-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('reading-fontsize', fontSize);
      document.documentElement.setAttribute('data-font-size', fontSize);
    }
  }, [fontSize, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('reading-fontfamily', fontFamily);
      document.documentElement.setAttribute('data-font-family', fontFamily);
    }
  }, [fontFamily, mounted]);

  return (
    <ReadingContext.Provider
      value={{
        theme,
        setTheme,
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
}

export function useReadingSettings() {
  const context = useContext(ReadingContext);
  if (context === undefined) {
    throw new Error('useReadingSettings must be used within a ReadingProvider');
  }
  return context;
}
