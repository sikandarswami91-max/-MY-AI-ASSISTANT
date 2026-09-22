import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  MessageSquare,
  History,
  FileText,
  CheckSquare,
  FolderOpen,
  Code2,
  GraduationCap,
  Settings,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Bot,
} from 'lucide-react';
import { mockChats } from '../../services/mockData';
import { useCharacter } from '../../context/CharacterContext';

export interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
  onNavigateMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  className = '',
  onNavigateMobile,
}) => {
  const navigate = useNavigate();
  const { currentCharacter, setIsSelectorModalOpen } = useCharacter();

  const mainNavItems = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4 shrink-0" /> },
    { name: 'Chat', path: '/chat', icon: <MessageSquare className="w-4 h-4 shrink-0" /> },
    { name: 'History', path: '/history', icon: <History className="w-4 h-4 shrink-0" /> },
    { name: 'Notes', path: '/notes', icon: <FileText className="w-4 h-4 shrink-0" /> },
    { name: 'Tasks', path: '/tasks', icon: <CheckSquare className="w-4 h-4 shrink-0" /> },
    { name: 'Files', path: '/files', icon: <FolderOpen className="w-4 h-4 shrink-0" /> },
    { name: 'Developer Mode', path: '/developer', icon: <Code2 className="w-4 h-4 shrink-0" /> },
    { name: 'Study Mode', path: '/study', icon: <GraduationCap className="w-4 h-4 shrink-0" /> },
  ];

  const bottomNavItems = [
    { name: 'Settings', path: '/settings', icon: <Settings className="w-4 h-4 shrink-0" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-4 h-4 shrink-0" /> },
  ];

  const handleNewChat = () => {
    navigate('/chat');
    if (onNavigateMobile) onNavigateMobile();
  };

  return (
    <aside
      className={`h-full flex flex-col justify-between bg-white/95 dark:bg-slate-950/95 border-r border-slate-200 dark:border-slate-800/90 transition-all duration-300 select-none z-30 ${
        isCollapsed ? 'w-[72px]' : 'w-64'
      } ${className}`}
    >
      {/* Top Brand & New Chat */}
      <div className="p-3.5 sm:p-4">
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-4">
          <NavLink
            to="/"
            onClick={onNavigateMobile}
            className="flex items-center gap-2.5 overflow-hidden group focus-visible:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-cyan-500/20 shrink-0">
              <Sparkles className="w-4 h-4 text-slate-950" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  NOVA AI
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5 tracking-wider font-mono">
                  ASSISTANT
                </span>
              </div>
            )}
          </NavLink>

          {/* Desktop collapse button */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800/80 transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={handleNewChat}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm shadow-sm shadow-cyan-500/20 transition-all cursor-pointer ${
            isCollapsed ? 'px-0' : ''
          }`}
          title="Start New Chat"
        >
          <Plus className="w-4 h-4 shrink-0 stroke-[2.5]" />
          {!isCollapsed && <span>New Chat</span>}
        </button>

        {/* Current Character Active Pill */}
        {!isCollapsed && (
          <button
            type="button"
            onClick={() => setIsSelectorModalOpen(true)}
            className="w-full mt-3 flex items-center justify-between p-2 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-all cursor-pointer group text-left"
          >
            <div className="flex items-center gap-2 truncate">
              <Bot className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <div className="flex flex-col truncate">
                <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {currentCharacter.name}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {currentCharacter.title}
                </span>
              </div>
            </div>
            <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium shrink-0 ml-1">Change</span>
          </button>
        )}
      </div>

      {/* Main Navigation links */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-3 py-1 space-y-1 scrollbar-thin">
        <div className="space-y-0.5">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigateMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-50 dark:bg-slate-800/90 text-cyan-700 dark:text-cyan-400 border border-cyan-200/80 dark:border-slate-700/80 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60 border border-transparent'
                } ${isCollapsed ? 'justify-center px-0' : ''}`
              }
              title={isCollapsed ? item.name : undefined}
            >
              {item.icon}
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </NavLink>
          ))}
        </div>

        {/* Recent Chats Section in sidebar */}
        {!isCollapsed && (
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800/80">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Recent Chats
              </span>
            </div>
            <div className="space-y-0.5">
              {mockChats.slice(0, 4).map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    navigate('/chat');
                    if (onNavigateMobile) onNavigateMobile();
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60 truncate transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 shrink-0" />
                  <span className="truncate">{chat.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 space-y-1">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigateMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-cyan-50 dark:bg-slate-800/90 text-cyan-700 dark:text-cyan-400 border border-cyan-200/80 dark:border-slate-700/80'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60 border border-transparent'
              } ${isCollapsed ? 'justify-center px-0' : ''}`
            }
            title={isCollapsed ? item.name : undefined}
          >
            {item.icon}
            {!isCollapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};
