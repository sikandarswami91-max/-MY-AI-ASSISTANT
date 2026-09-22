import React from 'react';
import { useVoiceContext } from '../../context/VoiceContext';
import { VoiceGender, VoiceLanguage } from '../../types/voice';
import { Volume2, Check } from 'lucide-react';
import { Button } from '../Common/Button';

export const VoiceSelector: React.FC = () => {
  const {
    settings,
    availableVoices,
    updateSettings,
    isAudioTesting,
    testCurrentVoice,
  } = useVoiceContext();

  const languages: VoiceLanguage[] = ['English', 'Hindi', 'Hinglish'];
  const genders: { label: string; value: VoiceGender }[] = [
    { label: 'Female Voice', value: 'female' },
    { label: 'Male Voice', value: 'male' },
  ];

  return (
    <div className="space-y-5">
      {/* Voice Gender Choice */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          Voice Gender
        </label>
        <div className="grid grid-cols-2 gap-2">
          {genders.map((g) => {
            const isSelected = settings.gender === g.value;
            return (
              <button
                key={g.value}
                type="button"
                onClick={() => {
                  const matchingVoice = availableVoices.find(
                    (v) => v.gender === g.value && v.language === settings.language
                  ) || availableVoices.find((v) => v.gender === g.value);
                  updateSettings({
                    gender: g.value,
                    selectedVoiceId: matchingVoice ? matchingVoice.id : settings.selectedVoiceId,
                  });
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-500 text-cyan-700 dark:text-cyan-300 shadow-xs'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span>{g.label}</span>
                {isSelected && <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Language Choice */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          Language
        </label>
        <div className="grid grid-cols-3 gap-2">
          {languages.map((lang) => {
            const isSelected = settings.language === lang;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => {
                  const matchingVoice = availableVoices.find(
                    (v) => v.language === lang && v.gender === settings.gender
                  ) || availableVoices.find((v) => v.language === lang);
                  updateSettings({
                    language: lang,
                    selectedVoiceId: matchingVoice ? matchingVoice.id : settings.selectedVoiceId,
                  });
                }}
                className={`py-2 px-3 rounded-xl border text-center text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-500 text-cyan-700 dark:text-cyan-300'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </div>

      {/* Voice Model List */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          Active Voice Profile
        </label>
        <div className="space-y-2">
          {availableVoices.map((voice) => {
            const isSelected = voice.id === settings.selectedVoiceId;
            return (
              <div
                key={voice.id}
                onClick={() => updateSettings({ selectedVoiceId: voice.id })}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-50/60 dark:bg-slate-800/90 border-cyan-500 dark:border-cyan-500/60 shadow-xs'
                    : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-200">
                      {voice.name}
                    </span>
                    <span className="text-[11px] text-slate-500">· {voice.accent}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 italic line-clamp-1">
                    "{voice.sampleAudioText}"
                  </p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Test Sample Playback */}
      <div className="pt-2">
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          leftIcon={<Volume2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
          onClick={testCurrentVoice}
          disabled={isAudioTesting}
        >
          {isAudioTesting ? 'Playing Voice Sample...' : 'Test Voice Audio'}
        </Button>
      </div>
    </div>
  );
};
