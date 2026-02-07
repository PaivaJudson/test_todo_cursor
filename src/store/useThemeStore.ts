import { create } from 'zustand';
import type { ThemeMode } from '../types/theme';

const STORAGE_KEY = 'todo-theme';

const getStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  return 'system';
};

const applyTheme = (mode: ThemeMode) => {
  const root = document.documentElement;
  let resolved: 'light' | 'dark' = 'light';

  if (mode === 'system') {
    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } else {
    resolved = mode;
  }

  root.setAttribute('data-theme', resolved);
  root.setAttribute('data-theme-preference', mode);
};

type ThemeState = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  mode: getStoredTheme(),

  setMode: (mode: ThemeMode) => {
    localStorage.setItem(STORAGE_KEY, mode);
    applyTheme(mode);
    set({ mode });
  },
}));
