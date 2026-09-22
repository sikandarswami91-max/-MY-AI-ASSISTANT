import React from 'react';
import { Modal } from '../Common/Modal';
import { Button } from '../Common/Button';
import { useCharacter, CHARACTER_PROFILES } from '../../context/CharacterContext';
import { FemaleAvatar } from './FemaleAvatar';
import { MaleAvatar } from './MaleAvatar';
import { Check, Sparkles } from 'lucide-react';

export const CharacterSelector: React.FC = () => {
  const {
    selectedGender,
    setCharacterGender,
    isSelectorModalOpen,
    setIsSelectorModalOpen,
  } = useCharacter();

  const handleSelect = (gender: 'male' | 'female') => {
    setCharacterGender(gender);
    setIsSelectorModalOpen(false);
  };

  const nova = CHARACTER_PROFILES.female;
  const alex = CHARACTER_PROFILES.male;

  return (
    <Modal
      isOpen={isSelectorModalOpen}
      onClose={() => setIsSelectorModalOpen(false)}
      title="Choose your AI Character"
      description="Select the persona and visual presence for your NOVA AI assistant."
      maxWidth="xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
        {/* Female Avatar Card - Nova */}
        <div
          onClick={() => handleSelect('female')}
          className={`relative flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
            selectedGender === 'female'
              ? 'bg-cyan-50/70 dark:bg-cyan-950/20 border-cyan-500 shadow-md shadow-cyan-500/10'
              : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850'
          }`}
        >
          {selectedGender === 'female' && (
            <div className="absolute top-3 right-3 p-1 rounded-full bg-cyan-500 text-slate-950">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}

          <div className="my-2">
            <FemaleAvatar size="lg" showBadge={false} />
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-base" role="img" aria-label="female avatar">👩</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{nova.name}</h3>
          </div>

          <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">{nova.personality}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 px-2 line-clamp-3 leading-relaxed">
            {nova.description}
          </p>

          <div className="mt-5 w-full">
            <Button
              variant={selectedGender === 'female' ? 'primary' : 'outline'}
              size="sm"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect('female');
              }}
            >
              {selectedGender === 'female' ? 'Selected' : 'Select Nova'}
            </Button>
          </div>
        </div>

        {/* Male Avatar Card - Alex */}
        <div
          onClick={() => handleSelect('male')}
          className={`relative flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
            selectedGender === 'male'
              ? 'bg-blue-50/70 dark:bg-blue-950/20 border-blue-500 shadow-md shadow-blue-500/10'
              : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-850'
          }`}
        >
          {selectedGender === 'male' && (
            <div className="absolute top-3 right-3 p-1 rounded-full bg-blue-500 text-slate-950">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}

          <div className="my-2">
            <MaleAvatar size="lg" showBadge={false} />
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-base" role="img" aria-label="male avatar">👨</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{alex.name}</h3>
          </div>

          <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">{alex.personality}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 px-2 line-clamp-3 leading-relaxed">
            {alex.description}
          </p>

          <div className="mt-5 w-full">
            <Button
              variant={selectedGender === 'male' ? 'primary' : 'outline'}
              size="sm"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect('male');
              }}
            >
              {selectedGender === 'male' ? 'Selected' : 'Select Alex'}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          Settings are saved instantly in local storage.
        </span>
        <Button variant="ghost" size="sm" onClick={() => setIsSelectorModalOpen(false)}>
          Close
        </Button>
      </div>
    </Modal>
  );
};
