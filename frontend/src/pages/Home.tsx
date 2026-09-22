import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTime } from '../hooks/useTime';
import { useCharacter } from '../context/CharacterContext';
import { AICharacter } from '../components/AICharacter/AICharacter';
import { QuickActions } from '../components/Dashboard/QuickActions';
import { RecentChats } from '../components/Dashboard/RecentChats';
import { UsageCard } from '../components/Dashboard/UsageCard';
import { Sparkles } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { greeting, greetingEmoji, dateString, timeString } = useTime();
  const { currentCharacter } = useCharacter();

  const suggestedPrompts = [
    'Analyze our distributed database replication architecture',
    'Write a TypeScript function to debounce async API calls',
    'Summarize current technical notes on neural transformers',
    'Create an interactive study guide for React 19 concurrent features',
  ];

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center pt-2 pb-4 sm:pb-6">
        {/* Subtle Date & Time Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 mb-4 sm:mb-6 font-mono shadow-xs">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
          <span>{dateString}</span>
          <span>·</span>
          <span className="text-cyan-600 dark:text-cyan-400 tabular-nums font-semibold">{timeString}</span>
        </div>

        {/* Dynamic Time-Based Greeting */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 max-w-3xl text-balance">
          {greeting}{' '}
          <span className="inline-block transform hover:rotate-12 transition-transform cursor-default">
            {greetingEmoji}
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-medium mt-3">
          I'm <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{currentCharacter.name}</span>, your{' '}
          <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent font-bold">
            NOVA AI
          </span>{' '}
          assistant.{' '}
          <span className="font-semibold text-cyan-600 dark:text-cyan-400">
            Created by Sikandar
          </span>
        </p>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl leading-relaxed">
          How can I help you today? Choose a workflow below or start a fluid conversation.
        </p>

        {/* Large AI Character Visual Presence with Assistant Greeting Bubble */}
        <div className="w-full my-2 sm:my-4">
          <AICharacter />
        </div>

        {/* Action Prompt Chips */}
        <div className="w-full max-w-2xl mt-3 sm:mt-4">
          <div className="flex items-center justify-center gap-2 mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Suggested Inquiries</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => navigate('/chat')}
                className="text-xs px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all cursor-pointer text-left truncate max-w-xs sm:max-w-md shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section>
        <QuickActions />
      </section>

      {/* Secondary Dashboard Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pt-2">
        <RecentChats />
        <UsageCard />
      </section>
    </div>
  );
};
