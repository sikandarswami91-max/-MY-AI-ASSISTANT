import React from 'react';
import { CharacterState } from '../../types/character';
import { Sparkles, Mic, Brain, Volume2, Smile, AlertCircle } from 'lucide-react';

export interface CharacterStatusProps {
  state: CharacterState;
  onStateChange?: (state: CharacterState) => void;
  interactive?: boolean;
}

export const CharacterStatus: React.FC<CharacterStatusProps> = ({
  state,
  onStateChange,
  interactive = true,
}) => {
  const stateMeta: Record<
    CharacterState,
    { label: string; icon: React.ReactNode; color: string; bg: string; border: string }
  > = {
    IDLE: {
      label: 'Idle / Ready',
      icon: <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />,
      color: 'text-cyan-700 dark:text-cyan-400',
      bg: 'bg-cyan-50 dark:bg-cyan-500/10',
      border: 'border-cyan-200 dark:border-cyan-500/30',
    },
    LISTENING: {
      label: 'Listening...',
      icon: <Mic className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 animate-pulse" />,
      color: 'text-emerald-700 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      border: 'border-emerald-200 dark:border-emerald-500/30',
    },
    THINKING: {
      label: 'Thinking...',
      icon: <Brain className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400 animate-spin" />,
      color: 'text-purple-700 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-500/10',
      border: 'border-purple-200 dark:border-purple-500/30',
    },
    SPEAKING: {
      label: 'Speaking...',
      icon: <Volume2 className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />,
      color: 'text-blue-700 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-500/10',
      border: 'border-blue-200 dark:border-blue-500/30',
    },
    HAPPY: {
      label: 'Delighted',
      icon: <Smile className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />,
      color: 'text-amber-700 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      border: 'border-amber-200 dark:border-amber-500/30',
    },
    ERROR: {
      label: 'System Attention',
      icon: <AlertCircle className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />,
      color: 'text-rose-700 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-500/10',
      border: 'border-rose-200 dark:border-rose-500/30',
    },
  };

  const current = stateMeta[state];
  const allStates: CharacterState[] = ['IDLE', 'LISTENING', 'THINKING', 'SPEAKING', 'HAPPY', 'ERROR'];

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Current State Badge */}
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${current.bg} ${current.border} ${current.color} border shadow-xs backdrop-blur-sm`}
      >
        {current.icon}
        <span className="font-semibold tracking-wide uppercase">{current.label}</span>
      </div>

      {/* Interactive state testing pills */}
      {interactive && onStateChange && (
        <div className="flex items-center flex-wrap justify-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mr-1 font-medium">Test State:</span>
          {allStates.map((s) => {
            const isSelected = s === state;
            return (
              <button
                key={s}
                onClick={() => onStateChange(s)}
                className={`text-[11px] px-2 py-0.5 rounded-md font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 text-white dark:bg-slate-700 shadow-xs border border-slate-700 dark:border-slate-600'
                    : 'bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800/80'
                }`}
              >
                {s.toLowerCase()}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
