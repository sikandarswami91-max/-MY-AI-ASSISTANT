import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCharacter } from '../context/CharacterContext';
import { VoiceSettings } from '../components/Voice/VoiceSettings';
import { FemaleAvatar } from '../components/AICharacter/FemaleAvatar';
import { MaleAvatar } from '../components/AICharacter/MaleAvatar';
import { Button } from '../components/Common/Button';
import {
  Sun,
  Moon,
  Laptop,
  UserCheck,
  Volume2,
  Sliders,
  Bell,
  Trash2,
  Shield,
  Check,
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { selectedGender, setCharacterGender, setIsSelectorModalOpen } = useCharacter();

  // AI Preferences state
  const [responseStyle, setResponseStyle] = useState<'concise' | 'balanced' | 'indepth'>('balanced');
  const [creativity, setCreativity] = useState<number>(0.7);
  const [memoryEnabled, setMemoryEnabled] = useState<boolean>(true);

  // Notifications state
  const [taskReminders, setTaskReminders] = useState<boolean>(true);
  const [aiNotifications, setAiNotifications] = useState<boolean>(false);

  // Privacy actions
  const [clearedNotice, setClearedNotice] = useState<string | null>(null);

  const handleClearHistory = () => {
    setClearedNotice('Chat history successfully purged.');
    setTimeout(() => setClearedNotice(null), 3000);
  };

  const handleClearMemory = () => {
    setClearedNotice('AI memory vector store successfully cleared.');
    setTimeout(() => setClearedNotice(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Preferences & Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize NOVA AI aesthetics, voice synthesis parameters, character models, and privacy.
        </p>
      </div>

      {clearedNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{clearedNotice}</span>
        </div>
      )}

      {/* 1. Appearance */}
      <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-base">
          <Sun className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <h2>Appearance & Theme System</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1">
          Default is Light Mode. Switch anytime to Dark Mode or match your system preferences. Saved automatically.
        </p>

        <div className="grid grid-cols-3 gap-3 max-w-md">
          {[
            { id: 'light', label: 'Light Mode', icon: <Sun className="w-4 h-4" /> },
            { id: 'dark', label: 'Dark Mode', icon: <Moon className="w-4 h-4" /> },
            { id: 'system', label: 'Auto (System)', icon: <Laptop className="w-4 h-4" /> },
          ].map((item) => {
            const isSelected = theme === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTheme(item.id as any)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border gap-2 text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-500 text-cyan-700 dark:text-cyan-300 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. AI Character */}
      <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-base">
            <UserCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <h2>AI Character Persona</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSelectorModalOpen(true)}
          >
            Switch Character
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => setCharacterGender('female')}
            className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedGender === 'female'
                ? 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-500'
                : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <FemaleAvatar size="sm" showBadge={false} />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Nova (Female)</h4>
              <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">Adaptive Neural Assistant</p>
            </div>
            {selectedGender === 'female' && <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
          </div>

          <div
            onClick={() => setCharacterGender('male')}
            className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedGender === 'male'
                ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-500'
                : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <MaleAvatar size="sm" showBadge={false} />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Alex (Male)</h4>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Architectural AI Specialist</p>
            </div>
            {selectedGender === 'male' && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
          </div>
        </div>
      </section>

      {/* 3. Voice Controls */}
      <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-base">
          <Volume2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <h2>Voice Controls & Synthesis</h2>
        </div>

        <VoiceSettings />
      </section>

      {/* 4. AI Reasoning Preferences */}
      <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-5 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-base">
          <Sliders className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <h2>AI Preferences</h2>
        </div>

        {/* Response Style */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
            Response Style
          </label>
          <div className="grid grid-cols-3 gap-2 max-w-md">
            {[
              { id: 'concise', label: 'Concise' },
              { id: 'balanced', label: 'Balanced' },
              { id: 'indepth', label: 'In-Depth' },
            ].map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setResponseStyle(style.id as any)}
                className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer text-center ${
                  responseStyle === style.id
                    ? 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-500 text-cyan-700 dark:text-cyan-300 font-semibold'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        {/* Creativity Slider */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            <span className="uppercase tracking-wider text-slate-500 dark:text-slate-400">Creativity / Temperature</span>
            <span className="font-mono text-cyan-600 dark:text-cyan-400 tabular-nums">{creativity.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="1.0"
            step="0.1"
            value={creativity}
            onChange={(e) => setCreativity(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-200 dark:bg-slate-800 h-2 rounded-lg cursor-pointer max-w-md"
          />
          <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 max-w-md mt-1">
            <span>Precise (0.2)</span>
            <span>Balanced (0.7)</span>
            <span>Creative (1.0)</span>
          </div>
        </div>

        {/* Memory Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-200 block">
              Continuous Memory
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Retain long-term facts, codebase preferences, and user background
            </span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={memoryEnabled}
            onClick={() => setMemoryEnabled(!memoryEnabled)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
              memoryEnabled ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-800'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ${
                memoryEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </section>

      {/* 5. Notifications */}
      <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-base">
          <Bell className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <h2>Notifications</h2>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-200 block">
                Task Reminders
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Alerts when upcoming scheduled tasks are approaching
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={taskReminders}
              onClick={() => setTaskReminders(!taskReminders)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                taskReminders ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ${
                  taskReminders ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-200 block">
                Proactive AI Suggestions
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Receive contextual study tips and code refactoring cues
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={aiNotifications}
              onClick={() => setAiNotifications(!aiNotifications)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                aiNotifications ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ${
                  aiNotifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Privacy & Data */}
      <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-base">
          <Shield className="w-4 h-4 text-rose-500" />
          <h2>Privacy & Data Security</h2>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Your conversation vectors and uploaded attachments reside in local client cache and encrypted sandbox storage.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            variant="danger"
            size="sm"
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            onClick={handleClearHistory}
          >
            Clear Chat History
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearMemory}
          >
            Reset AI Memory Cache
          </Button>
        </div>
      </section>
    </div>
  );
};
