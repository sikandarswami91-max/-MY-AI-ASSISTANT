import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTime } from '../../hooks/useTime';
import { useCharacter } from '../../context/CharacterContext';
import { useVoice } from '../../hooks/useVoice';
import { FemaleAvatar } from '../AICharacter/FemaleAvatar';
import { MaleAvatar } from '../AICharacter/MaleAvatar';
import { VoiceButton } from '../Voice/VoiceButton';
import { ThemeToggle } from '../Common/ThemeToggle';
import { Clock, Menu, Sparkles } from 'lucide-react';
import userAvatarImg from '../../assets/images/avatar_user_profile_1790105043411.jpg';

export interface NavbarProps {
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu }) => {
  const { timeString, greeting, greetingEmoji } = useTime();
  const { currentCharacter, selectedGender, setIsSelectorModalOpen } = useCharacter();
  const { isListening, startListening, stopListening } = useVoice();
  const navigate = useNavigate();

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      navigate('/chat');
    }
  };

  return (
    <header className="sticky top-0 z-20 w-full h-16 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-3 sm:px-6 flex items-center justify-between transition-colors duration-300">
      {/* Zone 1: Mobile Hamburger & Time/Greeting Context */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden min-w-[44px] min-h-[44px] p-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand identity icon on small screens */}
        <div className="md:hidden flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
          </div>
          <span className="text-xs font-black tracking-tight text-slate-900 dark:text-white">NOVA</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
            <span role="img" aria-label="greeting emoji">{greetingEmoji}</span>
            <span>{greeting}</span>
          </span>
          <span>·</span>
          <span className="font-mono tabular-nums text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
            {timeString}
          </span>
        </div>
      </div>

      {/* Zone 2: Character Status Center Pill */}
      <button
        type="button"
        onClick={() => setIsSelectorModalOpen(true)}
        className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer shadow-xs group"
        title="Click to switch AI Character persona"
      >
        <div className="shrink-0">
          {selectedGender === 'female' ? (
            <FemaleAvatar size="sm" showBadge={false} />
          ) : (
            <MaleAvatar size="sm" showBadge={false} />
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {currentCharacter.name}
          </span>
          <span className="hidden md:inline text-slate-400 dark:text-slate-500">·</span>
          <span className="hidden md:inline text-[11px] text-slate-500 dark:text-slate-400">
            {currentCharacter.personality}
          </span>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
      </button>

      {/* Zone 3: Theme Toggle, Quick Voice Action & Profile Avatar */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* Quick Voice Assistant button */}
        <VoiceButton
          isListening={isListening}
          onClick={handleVoiceToggle}
          size="sm"
        />

        {/* User Profile Avatar Link */}
        <NavLink
          to="/profile"
          className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer group min-w-[40px] min-h-[40px] justify-center"
          title="My Profile"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 group-hover:border-cyan-500 transition-colors shadow-xs">
            <img
              src={userAvatarImg}
              alt="Alex Vance"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </NavLink>
      </div>
    </header>
  );
};
