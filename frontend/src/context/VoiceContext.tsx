import React, { createContext, useContext, useState, useEffect } from 'react';
import { VoiceGender, VoiceLanguage, VoiceProfile, VoiceSettingsState } from '../types/voice';

export const AVAILABLE_VOICES: VoiceProfile[] = [
  {
    id: 'voice-nova-warm',
    name: 'Nova Warm (Female)',
    gender: 'female',
    language: 'English',
    accent: 'Neutral Global',
    sampleAudioText: 'Hello! I am Nova, ready to assist your workflows.',
  },
  {
    id: 'voice-alex-deep',
    name: 'Alex Pro (Male)',
    gender: 'male',
    language: 'English',
    accent: 'North American',
    sampleAudioText: 'Greetings. Alex here, ready to run your system pipelines.',
  },
  {
    id: 'voice-ananya-hindi',
    name: 'Ananya (Female)',
    gender: 'female',
    language: 'Hindi',
    accent: 'Standard Hindi',
    sampleAudioText: 'नमस्ते! मैं नोवा हूँ, आपकी किस प्रकार सहायता कर सकती हूँ?',
  },
  {
    id: 'voice-rohan-hinglish',
    name: 'Rohan (Male)',
    gender: 'male',
    language: 'Hinglish',
    accent: 'Bilingual Urban',
    sampleAudioText: 'Hey! Kya plan hai aaj ka? Let us get things done.',
  },
];

interface VoiceContextType {
  settings: VoiceSettingsState;
  availableVoices: VoiceProfile[];
  updateSettings: (partial: Partial<VoiceSettingsState>) => void;
  resetSettings: () => void;
  currentVoice: VoiceProfile;
  isAudioTesting: boolean;
  testCurrentVoice: () => void;
}

const DEFAULT_SETTINGS: VoiceSettingsState = {
  selectedVoiceId: 'voice-nova-warm',
  gender: 'female',
  language: 'English',
  speed: 1.0,
  pitch: 1.0,
  autoSpeak: true,
};

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<VoiceSettingsState>(() => {
    try {
      const saved = localStorage.getItem('nova_voice_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [isAudioTesting, setIsAudioTesting] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('nova_voice_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn(e);
    }
  }, [settings]);

  const updateSettings = (partial: Partial<VoiceSettingsState>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...partial };
      // Sync gender if voice changes
      if (partial.selectedVoiceId) {
        const found = AVAILABLE_VOICES.find((v) => v.id === partial.selectedVoiceId);
        if (found) {
          updated.gender = found.gender;
          updated.language = found.language;
        }
      }
      return updated;
    });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const currentVoice = AVAILABLE_VOICES.find((v) => v.id === settings.selectedVoiceId) || AVAILABLE_VOICES[0];

  const testCurrentVoice = () => {
    setIsAudioTesting(true);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentVoice.sampleAudioText);
        utterance.rate = settings.speed;
        utterance.pitch = settings.pitch;
        utterance.onend = () => setIsAudioTesting(false);
        utterance.onerror = () => setIsAudioTesting(false);
        window.speechSynthesis.speak(utterance);
        return;
      } catch (e) {
        console.warn('Speech synthesis restricted in sandbox', e);
      }
    }

    // Fallback simulation timer
    setTimeout(() => {
      setIsAudioTesting(false);
    }, 2200);
  };

  return (
    <VoiceContext.Provider
      value={{
        settings,
        availableVoices: AVAILABLE_VOICES,
        updateSettings,
        resetSettings,
        currentVoice,
        isAudioTesting,
        testCurrentVoice,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoiceContext = (): VoiceContextType => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoiceContext must be used within a VoiceProvider');
  }
  return context;
};
