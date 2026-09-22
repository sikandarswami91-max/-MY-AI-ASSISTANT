import React from 'react';
import { Cpu, HardDrive, Zap, ShieldCheck } from 'lucide-react';

export const UsageCard: React.FC = () => {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">AI Resource Allocation</h3>
        </div>
        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          Pro Member
        </span>
      </div>

      <div className="space-y-4">
        {/* Token Usage */}
        <div>
          <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Monthly Context Tokens
            </span>
            <span className="font-mono tabular-nums text-slate-800 dark:text-slate-200">1.42M / 5.00M</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
              style={{ width: '28.4%' }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            <span>28.4% utilized</span>
            <span>Resets in 8 days</span>
          </div>
        </div>

        {/* Vector & File Storage */}
        <div>
          <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <HardDrive className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Vector Documents Storage
            </span>
            <span className="font-mono tabular-nums text-slate-800 dark:text-slate-200">412 MB / 5.0 GB</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
              style={{ width: '8.2%' }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            <span>8.2% utilized</span>
            <span>4.58 GB available</span>
          </div>
        </div>
      </div>
    </div>
  );
};
