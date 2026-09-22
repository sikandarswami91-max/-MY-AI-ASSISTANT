import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FeatureCard } from './FeatureCard';
import { MessageSquare, Mic, Search, FileText, Code2, BookOpen } from 'lucide-react';
import { useCharacter } from '../../context/CharacterContext';

export const QuickActions: React.FC<{ onVoiceTrigger?: () => void; onSearchTrigger?: () => void }> = ({
  onVoiceTrigger,
  onSearchTrigger,
}) => {
  const navigate = useNavigate();
  const { setCharacterState } = useCharacter();

  const actions = [
    {
      title: '💬 Chat',
      description: 'Conversational problem solving, creative brainstorming & reasoning.',
      icon: <MessageSquare className="w-5 h-5" />,
      accent: 'cyan' as const,
      onClick: () => navigate('/chat'),
    },
    {
      title: '🎤 Voice',
      description: 'Hands-free voice assistant with dual speech synthesis & multilingual modes.',
      icon: <Mic className="w-5 h-5" />,
      accent: 'emerald' as const,
      onClick: () => {
        if (onVoiceTrigger) {
          onVoiceTrigger();
        } else {
          setCharacterState('LISTENING');
          navigate('/chat');
        }
      },
    },
    {
      title: '🔎 Search',
      description: 'Index previous knowledge, notes, sessions and project attachments.',
      icon: <Search className="w-5 h-5" />,
      accent: 'blue' as const,
      onClick: () => {
        if (onSearchTrigger) {
          onSearchTrigger();
        } else {
          navigate('/history');
        }
      },
    },
    {
      title: '📄 Files',
      description: 'Document intelligence, PDF analysis, code repository schemas.',
      icon: <FileText className="w-5 h-5" />,
      accent: 'purple' as const,
      onClick: () => navigate('/files'),
    },
    {
      title: '💻 Coding',
      description: 'Developer workspace with syntax generators, explainers and bug fixes.',
      icon: <Code2 className="w-5 h-5" />,
      accent: 'cyan' as const,
      onClick: () => navigate('/developer'),
    },
    {
      title: '📚 Study',
      description: 'Interactive study tutor with flashcards, quizzes and concept roadmaps.',
      icon: <BookOpen className="w-5 h-5" />,
      accent: 'amber' as const,
      onClick: () => navigate('/study'),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            What would you like to do?
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select a specialized neural mode or initiate a workflow
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {actions.map((act, index) => (
          <FeatureCard
            key={index}
            title={act.title}
            description={act.description}
            icon={act.icon}
            accent={act.accent}
            onClick={act.onClick}
          />
        ))}
      </div>
    </div>
  );
};
