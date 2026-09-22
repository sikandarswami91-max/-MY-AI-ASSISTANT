import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  chatId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  role: 'user' | 'assistant' | 'system';
  content: string;
  codeBlocks?: Array<{ language: string; code: string }>;
  attachments?: Array<{ id: string; name: string; type: string; size?: string; url?: string }>;
  liked?: boolean;
  disliked?: boolean;
  timestamp: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    content: { type: String, required: true },
    codeBlocks: [
      {
        language: { type: String, default: 'text' },
        code: { type: String, default: '' },
      },
    ],
    attachments: [
      {
        id: { type: String },
        name: { type: String },
        type: { type: String },
        size: { type: String },
        url: { type: String },
      },
    ],
    liked: { type: Boolean, default: false },
    disliked: { type: Boolean, default: false },
    timestamp: { type: String, default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  },
  { timestamps: true }
);

export const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
