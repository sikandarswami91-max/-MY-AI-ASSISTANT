import React from 'react';
import { useTheme, ThemeMode } from '../../context/ThemeContext';
import { Sun, Moon, Laptop } from 'lucide-react';

export interface ThemeToggleProps {
  variant?: 'button' | 'segmented';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'button', className = '' }) => {
  const { theme, setTheme, toggleTheme, isDark } = useTheme();

  if (variant === 'segmented') {
    const options: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
      { mode: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5" /> },
      { mode: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5" /> },
      { mode: 'system', label: 'Auto', icon: <Laptop className="w-3.5 h-3.5" /> },
    ];

    return (
      <div
        className={`inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors ${className}`}
        role="group"
        aria-label="Theme mode selection"
      >
        {options.map((opt) => {
          const active = theme === opt.mode;
          return (
            <button
              key={opt.mode}
              onClick={() => setTheme(opt.mode)}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                active
                  ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              aria-pressed={active}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Quick button toggle
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer shadow-xs ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Moon className="w-4 h-4 text-cyan-600 transition-transform duration-300 rotate-0 scale-100" />
        )}
      </div>
    </button>
  );
};
