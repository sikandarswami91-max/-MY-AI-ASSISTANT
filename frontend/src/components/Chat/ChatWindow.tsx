import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../../types/chat';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useCharacter } from '../../context/CharacterContext';
import { useVoiceContext } from '../../context/VoiceContext';
import { useVoice } from '../../hooks/useVoice';
import { Sparkles, Trash2, Volume2, RotateCcw } from 'lucide-react';
import { VoiceVisualizer } from '../Voice/VoiceVisualizer';
import {
  getAssistantGreeting,
  hasSessionGreetingBeenDelivered,
  markSessionGreetingDelivered,
  resetSessionGreeting,
} from '../../utils/greeting';

export interface ChatWindowProps {
  initialMessages?: ChatMessage[];
  chatTitle?: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  initialMessages = [],
  chatTitle = 'General Assistant & Neural Reasoning',
}) => {
  const { currentCharacter, setCharacterState } = useCharacter();
  const { settings, currentVoice } = useVoiceContext();
  const { isListening, startListening, stopListening, simulateSpeech, audioFrequencies } = useVoice();
  const [isThinking, setIsThinking] = useState(false);
  const speechTriggeredRef = useRef(false);

  // Initialize messages with automatic AI greeting on session start
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const greetingText = getAssistantGreeting((settings.language as any) || 'English');
    const greetingMsg: ChatMessage = {
      id: `asst-greeting-${Date.now()}`,
      role: 'assistant',
      content: greetingText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // If initial messages exist, use them; otherwise automatically present greeting
    if (initialMessages && initialMessages.length > 0) {
      return initialMessages;
    }

    return [greetingMsg];
  });

  // Automatic greeting delivery check on component mount for new session
  useEffect(() => {
    const greetingDelivered = hasSessionGreetingBeenDelivered();
    const greetingText = getAssistantGreeting((settings.language as any) || 'English');

    if (!greetingDelivered) {
      markSessionGreetingDelivered();

      // Ensure the greeting is at least present in the chat
      setMessages((prev) => {
        const alreadyHasGreeting = prev.some((m) => m.content.includes('Hello Sir') || m.content.includes('नमस्ते'));
        if (alreadyHasGreeting) return prev;
        return [
          {
            id: `asst-greeting-${Date.now()}`,
            role: 'assistant',
            content: greetingText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
          ...prev,
        ];
      });

      // If voice / autoSpeak is active and audio permission allowed, speak greeting
      if (settings.autoSpeak && !speechTriggeredRef.current) {
        speechTriggeredRef.current = true;
        setTimeout(() => {
          simulateSpeech(greetingText);
        }, 600);
      }
    }
  }, [settings.language, settings.autoSpeak, simulateSpeech]);

  const handleSendMessage = (content: string, attachments?: File[]) => {
    if (!content.trim() && (!attachments || attachments.length === 0)) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: attachments?.map((f, i) => ({
        id: `att-${i}`,
        name: f.name,
        type: f.type.startsWith('image/') ? 'image' : 'file',
        size: `${Math.round(f.size / 1024)} KB`,
      })),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);
    setCharacterState('THINKING');

    // Simulate assistant reasoning & response
    setTimeout(() => {
      setIsThinking(false);
      setCharacterState('SPEAKING');

      const replies = [
        `I analyzed your input regarding "${content}".\n\n### Recommendation:\n1. **Modular Architecture**: Deconstruct the problem into decoupled, testable components.\n2. **State Isolation**: Maintain pure local UI state while ensuring bidirectional data synchronization with the backend.\n3. **Resilience & Caching**: Cache idempotent requests and graceful offline fallbacks.\n\nWould you like me to generate specific code or create an actionable task?`,
        `Here is an optimized perspective on "${content}":\n\nWhen scaling distributed workflows, consistency models must balance throughput and isolation. Using asynchronous batching significantly reduces latency while preserving deterministic outcomes.`,
        `Understood. I have logged this into your active session context. Would you like me to schedule a reminder or create a technical note in your planner?`,
      ];
      const pickedReply = replies[Math.floor(Math.random() * replies.length)];

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: pickedReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // If Auto Speak is enabled, trigger speech
      if (settings.autoSpeak) {
        simulateSpeech(pickedReply.slice(0, 80));
      }

      setTimeout(() => {
        setCharacterState('IDLE');
      }, 2500);
    }, 1100);
  };

  const handleClearChat = () => {
    const greetingText = getAssistantGreeting((settings.language as any) || 'English');
    setMessages([
      {
        id: `asst-greeting-${Date.now()}`,
        role: 'assistant',
        content: greetingText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleNewSession = () => {
    resetSessionGreeting();
    markSessionGreetingDelivered();
    const greetingText = getAssistantGreeting((settings.language as any) || 'English');
    setMessages([
      {
        id: `asst-greeting-${Date.now()}`,
        role: 'assistant',
        content: greetingText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    if (settings.autoSpeak) {
      simulateSpeech(greetingText);
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      setCharacterState('IDLE');
    } else {
      startListening();
      setCharacterState('LISTENING');
    }
  };

  const handleRegenerateLast = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      handleSendMessage(lastUserMsg.content);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/90 dark:bg-slate-950/70 rounded-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-lg transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold shrink-0 shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight truncate">
                NOVA AI
              </h1>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20 font-medium shrink-0">
                {currentCharacter.name} Active
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{chatTitle}</p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Voice Waveform when active */}
          {isListening && (
            <div className="hidden sm:flex items-center bg-emerald-50 dark:bg-slate-800/80 rounded-xl px-2.5 py-1 border border-emerald-200 dark:border-slate-700">
              <VoiceVisualizer isActive={true} frequencies={audioFrequencies} color="emerald" height={20} />
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium ml-1.5">Listening</span>
            </div>
          )}

          {/* New Session Button */}
          <button
            type="button"
            onClick={handleNewSession}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
            title="Start new conversation session with greeting"
            aria-label="Start new session"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleClearChat}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-rose-500 hover:bg-slate-200/60 dark:hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
            title="Clear conversation"
            aria-label="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message List */}
      <MessageList
        messages={messages}
        isThinking={isThinking}
        onRegenerateLast={handleRegenerateLast}
        onSpeak={(text) => simulateSpeech(text.slice(0, 100))}
      />

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isThinking}
        onVoiceClick={handleVoiceToggle}
        isVoiceListening={isListening}
      />
    </div>
  );
};
