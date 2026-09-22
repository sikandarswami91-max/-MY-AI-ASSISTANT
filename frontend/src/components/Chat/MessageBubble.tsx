import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChatMessage } from '../../types/chat';
import { useCharacter } from '../../context/CharacterContext';
import { FemaleAvatar } from '../AICharacter/FemaleAvatar';
import { MaleAvatar } from '../AICharacter/MaleAvatar';
import { MessageActions } from './MessageActions';
import { Copy, Check, Terminal } from 'lucide-react';
import userAvatarImg from '../../assets/images/avatar_user_profile_1790105043411.jpg';

export interface MessageBubbleProps {
  message: ChatMessage;
  onRegenerate?: () => void;
  onSpeak?: (text: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onRegenerate,
  onSpeak,
}) => {
  const { currentCharacter, selectedGender } = useCharacter();
  const isUser = message.role === 'user';
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-3 sm:gap-4 py-3 sm:py-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="shrink-0 mt-0.5">
          {selectedGender === 'female' ? (
            <FemaleAvatar size="sm" showBadge={false} />
          ) : (
            <MaleAvatar size="sm" showBadge={false} />
          )}
        </div>
      )}

      {/* Message Content Container */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-2xl w-full`}>
        {/* Author & Timestamp */}
        <div className="flex items-center gap-2 mb-1 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-800 dark:text-slate-300">
            {isUser ? 'You' : currentCharacter.name}
          </span>
          <span>·</span>
          <span className="font-mono tabular-nums">{message.timestamp}</span>
        </div>

        {/* Bubble Box */}
        <div
          className={`rounded-2xl px-4 sm:px-5 py-3.5 text-sm leading-relaxed transition-colors duration-200 ${
            isUser
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-900/10 rounded-tr-xs'
              : 'bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-xs rounded-tl-xs'
          }`}
        >
          {/* Main prose text with line break parsing */}
          <div className="space-y-2 whitespace-pre-wrap font-sans">
            {message.content}
          </div>

          {/* Code Blocks */}
          {message.codeBlocks && message.codeBlocks.length > 0 && (
            <div className="mt-3.5 space-y-3">
              {message.codeBlocks.map((cb, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700/80 bg-slate-950 font-mono text-xs shadow-inner"
                >
                  {/* Code Block Header */}
                  <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800 text-slate-400">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-[11px] uppercase font-semibold text-slate-300">
                        {cb.language || 'code'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(cb.code, idx)}
                      className="flex items-center gap-1 text-[11px] hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedCodeIndex === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy code</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Code Body */}
                  <pre className="p-4 overflow-x-auto text-cyan-300/90 leading-relaxed scrollbar-thin">
                    <code>{cb.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* Attachments if present */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-2">
              {message.attachments.map((att) => (
                <div
                  key={att.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300"
                >
                  <span>📎</span>
                  <span className="truncate max-w-[140px]">{att.name}</span>
                  {att.size && <span className="text-slate-500 font-mono">({att.size})</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Actions (AI messages only) */}
        {!isUser && (
          <MessageActions
            content={message.content}
            onRegenerate={onRegenerate}
            onSpeak={onSpeak ? () => onSpeak(message.content) : undefined}
            initialLiked={message.liked}
            initialDisliked={message.disliked}
          />
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="shrink-0 mt-0.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 shadow-xs">
            <img
              src={userAvatarImg}
              alt="User Avatar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover select-none"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};
