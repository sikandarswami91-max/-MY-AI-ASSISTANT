import React from 'react';
import { motion } from 'framer-motion';

export interface VoiceVisualizerProps {
  isActive: boolean;
  frequencies?: number[];
  color?: 'cyan' | 'emerald' | 'blue' | 'purple';
  height?: number;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({
  isActive,
  frequencies = [15, 30, 45, 60, 40, 25, 18, 12],
  color = 'cyan',
  height = 36,
}) => {
  const colorMap = {
    cyan: 'bg-cyan-400 shadow-cyan-500/50',
    emerald: 'bg-emerald-400 shadow-emerald-500/50',
    blue: 'bg-blue-400 shadow-blue-500/50',
    purple: 'bg-purple-400 shadow-purple-500/50',
  };

  return (
    <div
      className="flex items-center justify-center gap-1 px-3 py-1.5"
      style={{ height: `${height}px` }}
      aria-label="Voice frequency visualizer"
    >
      {frequencies.map((freq, idx) => (
        <motion.span
          key={idx}
          className={`w-1 sm:w-1.5 rounded-full ${colorMap[color]} shadow-xs`}
          animate={{
            height: isActive ? `${Math.max(6, (freq / 100) * height)}px` : '4px',
            opacity: isActive ? 0.9 : 0.3,
          }}
          transition={{
            duration: 0.15,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};
