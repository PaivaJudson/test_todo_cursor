import { useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';
import type { ThemeMode } from '../types/theme';
import './ThemeToggle.css';

const THEME_OPTIONS: { value: ThemeMode; label: string; ariaLabel: string }[] = [
  { value: 'light', label: 'Claro', ariaLabel: 'Usar tema claro' },
  { value: 'dark', label: 'Escuro', ariaLabel: 'Usar tema escuro' },
  { value: 'system', label: 'Sistema', ariaLabel: 'Seguir preferência do sistema' },
];

export function ThemeToggle() {
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);

  useEffect(() => {
    setMode(useThemeStore.getState().mode);
  }, [setMode]);

  useEffect(() => {
    if (mode !== 'system') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const root = document.documentElement;
      const resolved = mediaQuery.matches ? 'dark' : 'light';
      root.setAttribute('data-theme', resolved);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [mode]);

  return (
    <div
      className="theme-toggle"
      role="group"
      aria-label="Escolher tema de cores"
    >
      {THEME_OPTIONS.map(({ value, label, ariaLabel }) => (
        <button
          key={value}
          type="button"
          className={`theme-option ${mode === value ? 'theme-option--active' : ''}`}
          onClick={() => setMode(value)}
          aria-pressed={mode === value}
          aria-label={ariaLabel}
          title={label}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
