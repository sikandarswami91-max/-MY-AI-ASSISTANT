import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/30 max-w-lg mx-auto shadow-xs ${className}`}
    >
      <div className="p-3.5 rounded-2xl bg-cyan-50 dark:bg-slate-800/80 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-slate-700/60 mb-4 shadow-xs">
        {icon}
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mb-5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
