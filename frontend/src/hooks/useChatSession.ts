/**
 * Shared chat session hook — single source of truth for conversations.
 *
 * Used by BOTH the main ChatWindow and the floating NovaChatWidget so there is
 * no duplicate chat/API logic. It:
 *  - lazily creates a real backend chat on the first message,
 *  - sends messages through the existing `api.chats` service (real AI replies),
 *  - persists the conversation to localStorage so a page refresh does not lose it,
 *  - surfaces friendly error messages instead of fabricating replies.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChatMessage } from '../types/chat';
import { api } from '../services/api';

const SESSION_KEY = 'nova_chat_session';

interface PersistedChat {
  chatId: string | null;
  messages: ChatMessage[];
}

function loadPersistedSession(): PersistedChat {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedChat;
      if (parsed && Array.isArray(parsed.messages) && parsed.messages.length > 0) {
        return {
          chatId: typeof parsed.chatId === 'string' ? parsed.chatId : null,
          messages: parsed.messages,
        };
      }
    }
  } catch {
    // corrupted or unavailable storage — start fresh
  }
  return { chatId: null, messages: [] };
}

const timestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export interface UseChatSessionOptions {
  initialMessages?: ChatMessage[];
  chatTitle?: string;
}

export interface SendMessageResult {
  ok: boolean;
  reply?: ChatMessage;
  error?: string;
}

export function useChatSession(options: UseChatSessionOptions = {}) {
  const { initialMessages = [], chatTitle = 'NOVA AI' } = options;

  const persistedRef = useRef<PersistedChat | null>(null);
  if (persistedRef.current === null) {
    persistedRef.current = loadPersistedSession();
  }
  const persisted = persistedRef.current;

  const [chatId, setChatId] = useState<string | null>(persisted.chatId);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    persisted.messages.length > 0 ? persisted.messages : initialMessages
  );
  const [isThinking, setIsThinking] = useState(false);

  const chatIdRef = useRef<string | null>(persisted.chatId);
  const backendUnavailableRef = useRef(false);

  // Persist the conversation so refreshing the page keeps it.
  useEffect(() => {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ chatId, messages }));
    } catch {
      // storage full or blocked — non-fatal
    }
  }, [chatId, messages]);

  const ensureChatId = useCallback(async (): Promise<string> => {
    if (chatIdRef.current) return chatIdRef.current;
    if (backendUnavailableRef.current) {
      throw new Error('Cannot reach the NOVA backend. Please try again in a moment.');
    }
    try {
      const chat = await api.chats.create(chatTitle);
      const id = chat?._id || chat?.id;
      if (!id) throw new Error('Chat creation returned no id');
      chatIdRef.current = id;
      setChatId(id);
      return id;
    } catch {
      backendUnavailableRef.current = true;
      throw new Error(
        'Cannot reach the NOVA backend. Start it with "cd backend && npm run dev" and try again.'
      );
    }
  }, [chatTitle]);

  const sendMessage = useCallback(
    async (content: string, attachments?: File[]): Promise<SendMessageResult> => {
      const trimmed = (content || '').trim();
      if (!trimmed && (!attachments || attachments.length === 0)) {
        return { ok: false, error: 'Please type a message first.' };
      }

      const attachmentMeta = attachments?.map((f, i) => ({
        id: `att-${i}`,
        name: f.name,
        type: (f.type.startsWith('image/') ? 'image' : 'file') as 'image' | 'file',
        size: `${Math.round(f.size / 1024)} KB`,
      }));

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmed,
        timestamp: timestamp(),
        attachments: attachmentMeta,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsThinking(true);

      try {
        const activeChatId = await ensureChatId();
        // Exact user message goes to the backend AI (Gemini/OpenAI/etc.)
        const reply = await api.chats.sendMessage(activeChatId, trimmed, attachmentMeta);
        setMessages((prev) => [...prev, reply]);
        return { ok: true, reply };
      } catch (err) {
        const detail = err instanceof Error && err.message ? err.message : 'Network error';
        const errorReply: ChatMessage = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `\u26a0\ufe0f I couldn't generate a response right now.\n\n**Reason:** ${detail}`,
          timestamp: timestamp(),
        };
        setMessages((prev) => [...prev, errorReply]);
        return { ok: false, error: detail, reply: errorReply };
      } finally {
        setIsThinking(false);
      }
    },
    [ensureChatId]
  );

  const resetSession = useCallback(() => {
    chatIdRef.current = null;
    backendUnavailableRef.current = false;
    setChatId(null);
    setMessages([]);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { messages, setMessages, isThinking, sendMessage, resetSession, chatId };
}
