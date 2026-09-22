export type MessageRole = 'user' | 'assistant' | 'system';

export interface CodeBlockData {
  language: string;
  code: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  codeBlocks?: CodeBlockData[];
  liked?: boolean;
  disliked?: boolean;
  attachments?: {
    id: string;
    name: string;
    type: 'image' | 'file' | 'code';
    size?: string;
  }[];
}

export interface ChatSession {
  id: string;
  title: string;
  date: string;
  preview: string;
  messagesCount: number;
  category?: 'General' | 'Development' | 'Research' | 'Study' | 'Creative';
  updatedAt: string;
}
