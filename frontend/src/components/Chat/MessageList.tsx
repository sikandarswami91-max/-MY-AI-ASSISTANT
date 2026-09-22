import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../../types/chat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { useCharacter } from '../../context/CharacterContext';
import { MessageSquare } from 'lucide-react';

export interface MessageListProps {
  messages: ChatMessage[];
  isThinking?: boolean;
  onRegenerateLast?: () => void;
  onSpeak?: (text: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isThinking = false,
  onRegenerateLast,
  onSpeak,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { currentCharacter } = useCharacter();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 max-w-md mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4 shadow-xs">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Start a conversation with {currentCharacter.name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
          Ask questions, debug code, draft architectural documents, or explore ideas with natural conversational AI.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 space-y-2">
      {messages.map((msg, index) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          onRegenerate={
            index === messages.length - 1 && msg.role === 'assistant'
              ? onRegenerateLast
              : undefined
          }
          onSpeak={onSpeak}
        />
      ))}

      {isThinking && <TypingIndicator assistantName={currentCharacter.name} />}

      <div ref={bottomRef} className="h-4" />
    </div>
  );
};
