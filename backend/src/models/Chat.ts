import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  category?: string;
  preview?: string;
  messagesCount: number;
  characterGender?: 'male' | 'female';
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, default: 'General' },
    preview: { type: String, default: '' },
    messagesCount: { type: Number, default: 0 },
    characterGender: { type: String, enum: ['male', 'female'], default: 'female' },
  },
  { timestamps: true }
);

export const Chat = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);
