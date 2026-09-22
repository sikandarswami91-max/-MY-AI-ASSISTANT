export type VoiceGender = 'male' | 'female';
export type VoiceLanguage = 'English' | 'Hindi' | 'Hinglish';

export interface VoiceProfile {
  id: string;
  name: string;
  gender: VoiceGender;
  language: VoiceLanguage;
  accent: string;
  sampleAudioText: string;
}

export interface VoiceSettingsState {
  selectedVoiceId: string;
  gender: VoiceGender;
  language: VoiceLanguage;
  speed: number; // 0.5 to 2.0
  pitch: number; // 0.5 to 1.5
  autoSpeak: boolean;
}
