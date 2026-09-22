import { ChatMessage, ChatSession } from '../types/chat';
import { NoteItem } from '../types/note';
import { TaskItem } from '../types/task';
import { FileItem } from '../types/file';
import { mockChats, mockMessages, mockNotes, mockTasks, mockFiles } from './mockData';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'nova_jwt_token';

/**
 * Token utilities
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Robust HTTP client that communicates with the backend,
 * with fallback to local mock data if the backend server is offline.
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  fallbackData?: T
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  // If uploading FormData, delete Content-Type so browser sets boundary
  if (options.body instanceof FormData) {
    delete (headers as Record<string, any>)['Content-Type'];
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.status === 401) {
      removeToken();
    }

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({ message: 'Network response was not ok' }));
      throw new Error(errorJson.message || `Request failed with status ${response.status}`);
    }

    const json = await response.json();
    return json.data !== undefined ? json.data : json;
  } catch (error) {
    // If backend is not running or network fails, gracefully return fallback data if available
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw error;
  }
}

export const api = {
  // Authentication & Profile
  auth: {
    login: async (email: string, password: string) => {
      try {
        const res = await apiFetch<{ user: any; token: string }>('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
        if (res?.token) setToken(res.token);
        return res;
      } catch (err) {
        // Fallback for seamless demo
        const fakeToken = 'mock-jwt-token-demo';
        setToken(fakeToken);
        return {
          user: { id: 'demo-user-1', name: 'Alex Vance', email, role: 'user' },
          token: fakeToken,
        };
      }
    },

    register: async (name: string, email: string, password: string) => {
      try {
        const res = await apiFetch<{ user: any; token: string }>('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
        });
        if (res?.token) setToken(res.token);
        return res;
      } catch (err) {
        const fakeToken = 'mock-jwt-token-demo';
        setToken(fakeToken);
        return {
          user: { id: 'demo-user-1', name, email, role: 'user' },
          token: fakeToken,
        };
      }
    },

    logout: async () => {
      removeToken();
      return { success: true };
    },

    getMe: async () => {
      return apiFetch('/auth/me', { method: 'GET' }, {
        id: 'demo-user-1',
        name: 'Alex Vance',
        email: 'alex.vance@nova.ai',
        role: 'Principal Software Architect',
        bio: 'Principal Software Architect & AI Explorer',
      });
    },

    updateProfile: async (data: { name?: string; bio?: string }) => {
      return apiFetch('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
  },

  // Chat Services
  chats: {
    list: async (): Promise<ChatSession[]> => {
      return apiFetch<ChatSession[]>('/chat', { method: 'GET' }, [...mockChats]);
    },

    getMessages: async (chatId: string): Promise<ChatMessage[]> => {
      const fallback = mockMessages[chatId] || [
        {
          id: 'msg-def-1',
          role: 'assistant',
          content: "Hello! I'm NOVA. How can I assist you with this new conversation?",
          timestamp: 'Just now',
        },
      ];
      try {
        const res: any = await apiFetch(`/chat/${chatId}`, { method: 'GET' });
        return res?.messages || fallback;
      } catch {
        return fallback;
      }
    },

    sendMessage: async (chatId: string, content: string): Promise<ChatMessage> => {
      const fallback: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `I received: "${content}". NOVA neural reasoning core evaluated your request.`,
        timestamp: 'Just now',
      };

      try {
        const res: any = await apiFetch(`/chat/${chatId}/messages`, {
          method: 'POST',
          body: JSON.stringify({ content }),
        });
        return res?.assistantMessage || fallback;
      } catch {
        return fallback;
      }
    },

    deleteChat: async (chatId: string): Promise<{ success: boolean }> => {
      return apiFetch<{ success: boolean }>(
        `/chat/${chatId}`,
        { method: 'DELETE' },
        { success: true }
      );
    },
  },

  // Notes Services
  notes: {
    list: async (): Promise<NoteItem[]> => {
      return apiFetch<NoteItem[]>('/notes', { method: 'GET' }, [...mockNotes]);
    },

    create: async (note: Omit<NoteItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<NoteItem> => {
      const fallback: NoteItem = {
        ...note,
        id: `note-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      return apiFetch<NoteItem>('/notes', {
        method: 'POST',
        body: JSON.stringify(note),
      }, fallback);
    },

    update: async (id: string, note: Partial<NoteItem>): Promise<NoteItem> => {
      return apiFetch<NoteItem>(`/notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(note),
      }, { ...note, id } as NoteItem);
    },

    delete: async (id: string): Promise<{ success: boolean }> => {
      return apiFetch<{ success: boolean }>(`/notes/${id}`, { method: 'DELETE' }, { success: true });
    },
  },

  // Tasks Services
  tasks: {
    list: async (): Promise<TaskItem[]> => {
      return apiFetch<TaskItem[]>('/tasks', { method: 'GET' }, [...mockTasks]);
    },

    create: async (task: Omit<TaskItem, 'id'>): Promise<TaskItem> => {
      const fallback: TaskItem = {
        ...task,
        id: `task-${Date.now()}`,
      };
      return apiFetch<TaskItem>('/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
      }, fallback);
    },

    toggle: async (id: string, completed: boolean): Promise<{ success: boolean }> => {
      return apiFetch<{ success: boolean }>(`/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed }),
      }, { success: true });
    },

    delete: async (id: string): Promise<{ success: boolean }> => {
      return apiFetch<{ success: boolean }>(`/tasks/${id}`, { method: 'DELETE' }, { success: true });
    },
  },

  // Reminders Services
  reminders: {
    list: async () => {
      return apiFetch('/reminders', { method: 'GET' }, []);
    },

    create: async (reminder: { title: string; dateTime: string; isRepeat?: boolean }) => {
      return apiFetch('/reminders', {
        method: 'POST',
        body: JSON.stringify(reminder),
      });
    },

    delete: async (id: string) => {
      return apiFetch(`/reminders/${id}`, { method: 'DELETE' });
    },
  },

  // Files Services
  files: {
    list: async (): Promise<FileItem[]> => {
      return apiFetch<FileItem[]>('/files', { method: 'GET' }, [...mockFiles]);
    },

    upload: async (file: File): Promise<FileItem> => {
      const formData = new FormData();
      formData.append('file', file);

      const fallback: FileItem = {
        id: `file-${Date.now()}`,
        name: file.name,
        type: 'document',
        size: `${(file.size / 1024).toFixed(1)} KB`,
        uploadedAt: 'Just now',
      };

      return apiFetch<FileItem>('/files/upload', {
        method: 'POST',
        body: formData,
      }, fallback);
    },

    uploadMock: async (fileName: string, size: string): Promise<FileItem> => {
      return {
        id: `file-${Date.now()}`,
        name: fileName,
        type: 'document',
        size,
        uploadedAt: 'Just now',
      };
    },

    delete: async (id: string): Promise<{ success: boolean }> => {
      return apiFetch<{ success: boolean }>(`/files/${id}`, { method: 'DELETE' }, { success: true });
    },
  },

  // Settings
  settings: {
    get: async () => {
      return apiFetch('/settings', { method: 'GET' }, {
        appearance: { theme: 'dark' },
        voice: { speed: 1.0, pitch: 1.0, autoSpeak: false },
        aiPreferences: { responseStyle: 'balanced', creativity: 0.7, continuousMemory: true },
      });
    },

    update: async (settings: any) => {
      return apiFetch('/settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      }, settings);
    },
  },

  // AI Services
  ai: {
    developer: async (action: string, input: string, language = 'typescript') => {
      return apiFetch('/ai/developer', {
        method: 'POST',
        body: JSON.stringify({ action, input, language }),
      });
    },

    study: async (topic: string, difficulty = 'Intermediate') => {
      return apiFetch('/ai/study', {
        method: 'POST',
        body: JSON.stringify({ topic, difficulty }),
      });
    },

    getWeather: async (location = 'San Francisco, CA') => {
      return apiFetch(`/ai/weather?location=${encodeURIComponent(location)}`, { method: 'GET' });
    },

    search: async (query: string) => {
      return apiFetch(`/ai/search?q=${encodeURIComponent(query)}`, { method: 'GET' });
    },
  },

  // Health Check
  health: {
    check: async () => {
      return apiFetch('/health', { method: 'GET' });
    },
  },

  // User Profile
  user: {
    getProfile: async () => {
      return {
        name: 'Alex Vance',
        email: 'alex.vance@nova-ai.studio',
        role: 'Senior Engineering Architect',
        tier: 'Nova Pro Member',
        joinedDate: 'August 2026',
        usage: {
          monthlyTokensUsed: '1.42M',
          tokenLimit: '5.00M',
          chatsCount: 142,
          storageUsed: '412 MB',
          storageLimit: '5 GB',
        },
      };
    },
  },
};
