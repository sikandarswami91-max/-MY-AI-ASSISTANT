export type CharacterGender = 'male' | 'female';

export type CharacterState = 
  | 'IDLE' 
  | 'LISTENING' 
  | 'THINKING' 
  | 'SPEAKING' 
  | 'HAPPY' 
  | 'ERROR';

export interface AICharacterProfile {
  id: string;
  name: string;
  gender: CharacterGender;
  title: string;
  description: string;
  avatarUrl: string;
  voiceId: string;
  personality: string;
  accentColor: string;
  glowColor: string;
}
