import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

export interface VoiceButtonProps {
  isListening: boolean;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  isListening,
  onClick,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Animated pulse rings when listening */}
      {isListening && (
        <>
          <motion.div
            animate={{ scale: [1, 1.4, 1.8], opacity: [0.6, 0.3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-emerald-500/30 pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.25, 1.5], opacity: [0.8, 0.4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
            className="absolute inset-0 rounded-full bg-cyan-500/30 pointer-events-none"
          />
        </>
      )}

      <button
        type="button"
        onClick={onClick}
        aria-label={isListening ? 'Stop voice recording' : 'Start voice input'}
        className={`${sizeClasses[size]} rounded-full transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-95 ${
          isListening
            ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/40 border border-emerald-400'
            : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 shadow-sm'
        }`}
      >
        {isListening ? (
          <Mic className={`${iconSizes[size]} animate-pulse`} />
        ) : (
          <Mic className={`${iconSizes[size]}`} />
        )}
      </button>
    </div>
  );
};
