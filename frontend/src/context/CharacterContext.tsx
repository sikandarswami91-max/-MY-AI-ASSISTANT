import React, { createContext, useContext, useState, useEffect } from 'react';
import { AICharacterProfile, CharacterGender, CharacterState } from '../types/character';

// Image assets generated for Nova and Alex
import novaAvatarImg from '../assets/images/avatar_female_nova_1790105019441.jpg';
import alexAvatarImg from '../assets/images/avatar_male_alex_1790105030896.jpg';

export const CHARACTER_PROFILES: Record<CharacterGender, AICharacterProfile> = {
  female: {
    id: 'nova-female',
    name: 'Nova',
    gender: 'female',
    title: 'Adaptive Neural Assistant',
    description: 'Empathetic, analytical, and fast. Specializes in multi-modal synthesis, task orchestration, and creative problem solving.',
    avatarUrl: novaAvatarImg,
    voiceId: 'voice-nova-warm',
    personality: 'Intuitive & Precise',
    accentColor: '#06b6d4', // Cyan
    glowColor: 'rgba(6, 182, 212, 0.4)',
  },
  male: {
    id: 'alex-male',
    name: 'Alex',
    gender: 'male',
    title: 'Architectural AI Specialist',
    description: 'Methodical, pragmatic, and insightful. Specializes in systems architecture, algorithmic debugging, and structured analysis.',
    avatarUrl: alexAvatarImg,
    voiceId: 'voice-alex-deep',
    personality: 'Focused & Analytical',
    accentColor: '#3b82f6', // Blue
    glowColor: 'rgba(59, 130, 246, 0.4)',
  },
};

interface CharacterContextType {
  currentCharacter: AICharacterProfile;
  selectedGender: CharacterGender;
  characterState: CharacterState;
  setCharacterGender: (gender: CharacterGender) => void;
  setCharacterState: (state: CharacterState) => void;
  isSelectorModalOpen: boolean;
  setIsSelectorModalOpen: (open: boolean) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedGender, setSelectedGenderState] = useState<CharacterGender>(() => {
    try {
      const saved = localStorage.getItem('nova_character_gender') as CharacterGender;
      return saved === 'male' || saved === 'female' ? saved : 'male';
    } catch {
      return 'male';
    }
  });

  const [characterState, setCharacterState] = useState<CharacterState>('IDLE');
  const [isSelectorModalOpen, setIsSelectorModalOpen] = useState<boolean>(false);

  const setCharacterGender = (gender: CharacterGender) => {
    setSelectedGenderState(gender);
    try {
      localStorage.setItem('nova_character_gender', gender);
    } catch (e) {
      console.warn(e);
    }
  };

  const currentCharacter = CHARACTER_PROFILES[selectedGender];

  return (
    <CharacterContext.Provider
      value={{
        currentCharacter,
        selectedGender,
        characterState,
        setCharacterGender,
        setCharacterState,
        isSelectorModalOpen,
        setIsSelectorModalOpen,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};
