import { Request } from 'express';

export interface AuthUserPayload {
  userId: string;
  email: string;
  name: string;
  role?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUserPayload;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string | Record<string, any>;
  timestamp: string;
}

export type AIServiceType =
  | 'text'
  | 'voice_stt'
  | 'voice_tts'
  | 'vision'
  | 'ocr'
  | 'document'
  | 'search'
  | 'weather'
  | 'calculator'
  | 'developer'
  | 'study'
  | 'memory';

export interface AIExecutionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  language?: string;
  context?: any;
}
