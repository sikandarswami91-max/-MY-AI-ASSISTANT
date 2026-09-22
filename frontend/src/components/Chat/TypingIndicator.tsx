import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const TypingIndicator: React.FC<{ assistantName?: string }> = ({
  assistantName = 'NOVA',
}) => {
  return (
    <div className="flex items-center gap-3 py-2 px-1">
      <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
        <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
      </div>

      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/90 rounded-2xl px-4 py-2.5 shadow-xs">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400 mr-1">
          {assistantName} is thinking
        </span>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400"
              animate={{
                y: [0, -5, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.18,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
