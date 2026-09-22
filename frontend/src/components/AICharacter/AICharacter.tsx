import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCharacter } from '../../context/CharacterContext';
import { useVoiceContext } from '../../context/VoiceContext';
import { useVoice } from '../../hooks/useVoice';
import { FemaleAvatar } from './FemaleAvatar';
import { MaleAvatar } from './MaleAvatar';
import { CharacterStatus } from './CharacterStatus';
import { UserCheck, Mic, Volume2, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAssistantGreeting } from '../../utils/greeting';

export const AICharacter: React.FC = () => {
  const {
    currentCharacter,
    selectedGender,
    characterState,
    setCharacterState,
    setIsSelectorModalOpen,
  } = useCharacter();

  const { settings } = useVoiceContext();
  const { simulateSpeech } = useVoice();
  const navigate = useNavigate();

  const greetingText = getAssistantGreeting((settings.language as any) || 'English');

  // Animation variants mapped to characterState
  const avatarMotionVariants = {
    IDLE: {
      y: [0, -8, 0],
      transition: {
        duration: 4.5,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
    LISTENING: {
      scale: [1, 1.04, 1],
      y: [0, -4, 0],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
    THINKING: {
      rotate: [0, 1.5, -1.5, 0],
      scale: [1, 0.98, 1],
      transition: {
        duration: 2.2,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
    SPEAKING: {
      scale: [1, 1.05, 0.99, 1.03, 1],
      transition: {
        duration: 2.0,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
    HAPPY: {
      y: [0, -12, 0],
      scale: [1, 1.06, 1],
      transition: {
        duration: 2.0,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
    ERROR: {
      x: [-3, 3, -3, 3, 0],
      transition: {
        duration: 0.6,
        repeat: 3,
      },
    },
  };

  // Outer ambient ring color
  const getGlowStyles = () => {
    switch (characterState) {
      case 'LISTENING':
        return 'from-emerald-500/25 via-emerald-400/10 to-transparent shadow-emerald-500/20';
      case 'THINKING':
        return 'from-purple-500/25 via-indigo-400/10 to-transparent shadow-purple-500/20';
      case 'SPEAKING':
        return 'from-cyan-500/30 via-blue-500/15 to-transparent shadow-cyan-400/30';
      case 'HAPPY':
        return 'from-amber-400/25 via-yellow-300/10 to-transparent shadow-amber-400/20';
      case 'ERROR':
        return 'from-rose-500/25 via-rose-400/10 to-transparent shadow-rose-500/20';
      case 'IDLE':
      default:
        return selectedGender === 'female'
          ? 'from-cyan-500/20 via-blue-500/10 to-transparent shadow-cyan-500/10'
          : 'from-blue-500/20 via-indigo-500/10 to-transparent shadow-blue-500/10';
    }
  };

  const handleSpeakGreeting = (e: React.MouseEvent) => {
    e.stopPropagation();
    simulateSpeech(greetingText);
  };

  return (
    <div className="flex flex-col items-center justify-center relative py-4 sm:py-6">
      {/* Background Radial Glow */}
      <div
        className={`absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr ${getGlowStyles()} blur-3xl opacity-60 dark:opacity-70 -z-10 pointer-events-none transition-all duration-700`}
      />

      {/* Automatic Assistant Greeting Bubble */}
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-4 sm:mb-5 max-w-sm sm:max-w-md w-full px-3"
      >
        <div className="relative bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/90 rounded-2xl p-3.5 sm:p-4 shadow-lg shadow-slate-200/50 dark:shadow-black/30 backdrop-blur-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <div className="flex flex-col text-left truncate">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                {currentCharacter.name} · Assistant Greeting
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                "{greetingText}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleSpeakGreeting}
              className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Speak Greeting"
              aria-label="Speak Greeting"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/chat')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs shadow-xs transition-all cursor-pointer"
              title="Start Chat with Nova"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat</span>
            </button>
          </div>

          {/* Speech bubble pointer notch pointing down towards avatar */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-r border-b border-slate-200 dark:border-slate-800 rotate-45 pointer-events-none" />
        </div>
      </motion.div>

      {/* Main Interactive Avatar Frame */}
      <div className="relative group cursor-pointer" onClick={() => setIsSelectorModalOpen(true)}>
        {/* State Ring Animations */}
        {characterState === 'LISTENING' && (
          <motion.div
            animate={{ scale: [1, 1.25, 1.4], opacity: [0.8, 0.4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 -m-3 sm:-m-4 rounded-3xl border-2 border-emerald-400/60 pointer-events-none"
          />
        )}

        {characterState === 'SPEAKING' && (
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 -m-2 sm:-m-3 rounded-3xl border border-cyan-400/80 shadow-lg shadow-cyan-500/30 pointer-events-none"
          />
        )}

        {characterState === 'THINKING' && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 -m-3 sm:-m-4 rounded-full border border-dashed border-purple-400/60 pointer-events-none"
          />
        )}

        {/* Floating Avatar Motion Container */}
        <motion.div
          variants={avatarMotionVariants}
          animate={characterState}
          className="relative transition-shadow duration-300"
        >
          {selectedGender === 'female' ? (
            <FemaleAvatar size="hero" showBadge={false} />
          ) : (
            <MaleAvatar size="hero" showBadge={false} />
          )}

          {/* Hover Switch Indicator */}
          <div className="absolute inset-0 rounded-3xl bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 text-white border border-cyan-400/40">
            <UserCheck className="w-6 h-6 text-cyan-400" />
            <span className="text-xs font-semibold tracking-wide">Switch Character</span>
          </div>
        </motion.div>

        {/* Floating audio indicator icon during voice states */}
        <AnimatePresence>
          {(characterState === 'LISTENING' || characterState === 'SPEAKING') && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-3 -right-3 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-lg text-cyan-600 dark:text-cyan-400 z-20"
            >
              {characterState === 'LISTENING' ? (
                <Mic className="w-5 h-5 text-emerald-500 animate-pulse" />
              ) : (
                <Volume2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 animate-bounce" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Character Identity & Status */}
      <div className="mt-4 sm:mt-5 text-center flex flex-col items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {currentCharacter.name}
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 font-medium">
            {currentCharacter.personality}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mt-1 px-4">
          {currentCharacter.title}
        </p>

        {/* State Indicators & testing pills */}
        <div className="mt-3 sm:mt-4">
          <CharacterStatus state={characterState} onStateChange={setCharacterState} />
        </div>
      </div>
    </div>
  );
};
