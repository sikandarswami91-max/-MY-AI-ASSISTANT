import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Send, X, Minus, MessageCircle } from 'lucide-react';
import { useCharacter } from '../../context/CharacterContext';
import { useVoiceContext } from '../../context/VoiceContext';
import { useChatSession } from '../../hooks/useChatSession';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { getAssistantGreeting } from '../../utils/greeting';

/**
 * Floating "Nova AI Companion" widget — a ChatGPT-style popup conversation.
 *
 * Reuses the shared `useChatSession` hook (same backend chat, history and
 * persistence as the main ChatWindow) plus the existing MessageBubble and
 * TypingIndicator components, so no duplicate chat/API logic is introduced.
 */
export const NovaChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const { currentCharacter } = useCharacter();
  const { settings } = useVoiceContext();
  const { messages, setMessages, isThinking, sendMessage } = useChatSession({
    chatTitle: 'Nova AI Companion',
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to the newest message
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isThinking, isOpen]);

  // Welcome message when the popup is opened on an empty conversation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = getAssistantGreeting((settings.language as any) || 'English');
      setMessages([
        {
          id: `asst-welcome-${Date.now()}`,
          role: 'assistant',
          content: `${greeting}\nI'm Nova, your AI companion. Ask me anything — studies, code, career advice, or just have a friendly chat.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;
    setText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    void sendMessage(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift + Enter inserts a new line
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col items-end gap-3">
      {/* Chat popup */}
      {isOpen && (
        <section
          role="dialog"
          aria-label="Nova AI companion chat"
          className="nova-chat-pop flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-slate-900/20 dark:shadow-black/60 w-[min(24rem,calc(100vw-2rem))] h-[min(36rem,calc(100vh-8rem))] sm:w-[24rem] sm:h-[36rem]"
        >
          {/* Header — Nova branding */}
          <header className="flex items-center justify-between gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-800/90 bg-gradient-to-r from-cyan-500/10 to-blue-500/5 dark:from-cyan-500/15 dark:to-slate-900/40 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="min-w-0 leading-tight">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                  Nova
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  AI Companion
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                title="Minimize chat"
                aria-label="Minimize chat"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-rose-500 hover:bg-slate-200/60 dark:hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Conversation — messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5 overscroll-contain"
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isThinking && <TypingIndicator assistantName={currentCharacter.name} />}
          </div>

          {/* Composer */}
          <div className="shrink-0 border-t border-slate-200 dark:border-slate-800/90 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md p-2.5">
            <div className="flex items-end gap-1.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus-within:border-cyan-500/80 focus-within:ring-1 focus-within:ring-cyan-500/30 rounded-2xl p-2 transition-all shadow-sm">
              <textarea
                ref={textareaRef}
                rows={1}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
                }}
                onKeyDown={handleKeyDown}
                placeholder="Message Nova..."
                aria-label="Message Nova"
                className="flex-1 bg-transparent border-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-0 resize-none text-sm py-1.5 px-1.5 max-h-40 min-h-[36px] outline-none"
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={isThinking || !text.trim()}
                className="min-w-[36px] min-h-[36px] flex items-center justify-center p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-sm shadow-cyan-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                title="Send message"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center pt-1.5 px-1">
              Nova can make mistakes. Verify important info.
            </p>
          </div>
        </section>
      )}

      {/* Floating launcher — shown while the popup is closed */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-900/25 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          title="Chat with Nova"
          aria-label="Open Nova chat"
          aria-expanded={isOpen}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-semibold hidden sm:inline">Chat with Nova</span>
        </button>
      )}
    </div>
  );
};
