'use client';

import { useTheme } from '@/app/providers/ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-1.5 rounded-md bg-muted hover:bg-muted/80 transition-colors border border-border"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <div className="relative w-3.5 h-3.5">
        <Sun className={`w-3.5 h-3.5 text-amber-500 transition-all duration-300 ${
          theme === 'light' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'
        }`} />
        <Moon className={`absolute top-0 left-0 w-3.5 h-3.5 text-slate-400 transition-all duration-300 ${
          theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 rotate-90'
        }`} />
      </div>
    </button>
  );
}