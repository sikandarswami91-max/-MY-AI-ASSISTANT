import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export interface FeatureCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  onClick: () => void;
  accent?: 'cyan' | 'blue' | 'purple' | 'emerald' | 'amber';
  badgeText?: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  onClick,
  accent = 'cyan',
  badgeText,
  className = '',
}) => {
  const accentGlow = {
    cyan: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10 group-hover:text-cyan-600 dark:group-hover:text-cyan-400',
    blue: 'hover:border-blue-500/50 hover:shadow-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-blue-400',
    purple: 'hover:border-purple-500/50 hover:shadow-purple-500/10 group-hover:text-purple-600 dark:group-hover:text-purple-400',
    emerald: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    amber: 'hover:border-amber-500/50 hover:shadow-amber-500/10 group-hover:text-amber-600 dark:group-hover:text-amber-400',
  };

  const iconBg = {
    cyan: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/20',
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200 dark:border-purple-500/20',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
  };

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 transition-all duration-200 cursor-pointer shadow-xs hover:bg-slate-50 dark:hover:bg-slate-900/90 ${accentGlow[accent]} ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2.5 rounded-xl border ${iconBg[accent]}`}>
            {icon}
          </div>
          {badgeText && (
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {badgeText}
            </span>
          )}
        </div>

        <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-white transition-colors">
          {title}
        </h3>

        {description && (
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs text-slate-500 dark:text-slate-400">
        <span className="font-medium text-slate-600 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          Launch
        </span>
        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-all" />
      </div>
    </motion.div>
  );
};
