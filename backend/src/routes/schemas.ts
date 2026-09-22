import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});

export const createChatSchema = z.object({
  title: z.string().optional(),
  category: z.string().optional(),
});

export const postMessageSchema = z.object({
  content: z.string().optional().default(''),
  attachments: z.array(z.any()).optional().default([]),
});

export const noteSchema = z.object({
  title: z.string().min(1, 'Note title is required'),
  content: z.string().optional().default(''),
  category: z.string().optional().default('General'),
  tags: z.array(z.string()).optional().default([]),
  isPinned: z.boolean().optional().default(false),
  isFavorite: z.boolean().optional().default(false),
});

export const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  timeString: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional().default('medium'),
  category: z.enum(['today', 'upcoming', 'completed']).optional().default('today'),
  tag: z.string().optional(),
  completed: z.boolean().optional(),
});

export const reminderSchema = z.object({
  title: z.string().min(1, 'Reminder title is required'),
  dateTime: z.string().min(1, 'Valid dateTime string is required'),
  isRepeat: z.boolean().optional().default(false),
  repeatInterval: z.enum(['daily', 'weekly', 'monthly']).optional(),
});
