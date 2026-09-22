import React from 'react';
import { useVoiceContext } from '../../context/VoiceContext';
import { VoiceSelector } from './VoiceSelector';
import { RotateCcw } from 'lucide-react';
import { Button } from '../Common/Button';

export const VoiceSettings: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useVoiceContext();

  return (
    <div className="space-y-6">
      {/* Voice Profiles & Selector */}
      <VoiceSelector />

      {/* Sliders: Speed and Pitch */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            <span className="uppercase tracking-wider text-slate-500 dark:text-slate-400">Speech Rate (Speed)</span>
            <span className="font-mono text-cyan-600 dark:text-cyan-400 tabular-nums">{settings.speed.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={settings.speed}
            onChange={(e) => updateSettings({ speed: parseFloat(e.target.value) })}
            className="w-full accent-cyan-500 bg-slate-200 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            <span>0.5x Slow</span>
            <span>1.0x Normal</span>
            <span>2.0x Fast</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            <span className="uppercase tracking-wider text-slate-500 dark:text-slate-400">Voice Pitch</span>
            <span className="font-mono text-cyan-600 dark:text-cyan-400 tabular-nums">{settings.pitch.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={settings.pitch}
            onChange={(e) => updateSettings({ pitch: parseFloat(e.target.value) })}
            className="w-full accent-cyan-500 bg-slate-200 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            <span>Low</span>
            <span>Standard</span>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Auto Speak Toggle */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-200 block">
            Auto Speak
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Automatically speak assistant text replies out loud
          </span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={settings.autoSpeak}
          onClick={() => updateSettings({ autoSpeak: !settings.autoSpeak })}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            settings.autoSpeak ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-800'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
              settings.autoSpeak ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Reset */}
      <div className="flex justify-end pt-2">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<RotateCcw className="w-3.5 h-3.5 text-slate-400" />}
          onClick={resetSettings}
        >
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};
