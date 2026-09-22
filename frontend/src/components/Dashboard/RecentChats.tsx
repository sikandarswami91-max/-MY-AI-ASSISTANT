import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockChats } from '../../services/mockData';
import { MessageSquare, ArrowRight, Clock } from 'lucide-react';

export const RecentChats: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">Recent Conversations</h3>
        </div>
        <button
          onClick={() => navigate('/history')}
          className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1 font-medium cursor-pointer transition-colors"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-2.5">
        {mockChats.slice(0, 3).map((chat) => (
          <div
            key={chat.id}
            onClick={() => navigate('/chat')}
            className="group flex items-start justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer"
          >
            <div className="space-y-1 pr-2">
              <h4 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-1">
                {chat.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{chat.preview}</p>
            </div>

            <div className="flex flex-col items-end shrink-0 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {chat.date}
              </span>
              <span className="text-slate-500 dark:text-slate-400 mt-1">{chat.messagesCount} msgs</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
