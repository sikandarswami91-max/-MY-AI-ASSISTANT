import React from 'react';

export interface LoadingProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  label = 'Loading NOVA assistant...',
  size = 'md',
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3 text-center p-6">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} rounded-full border-cyan-500/20 border-t-cyan-400 animate-spin`}
        />
        <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-sm -z-10" />
      </div>
      {label && <p className="text-xs sm:text-sm text-slate-400 animate-pulse">{label}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};
