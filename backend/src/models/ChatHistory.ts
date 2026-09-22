import mongoose, { Schema, Document } from 'mongoose';

export interface IChatHistory extends Document {
  userId: mongoose.Types.ObjectId;
  chatId: mongoose.Types.ObjectId;
  title: string;
  summary: string;
  category: string;
  dateGroup: 'Today' | 'Yesterday' | 'Previous 7 days' | 'Older';
  messageCount: number;
  lastActive: Date;
}

const ChatHistorySchema = new Schema<IChatHistory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    category: { type: String, default: 'General' },
    dateGroup: {
      type: String,
      enum: ['Today', 'Yesterday', 'Previous 7 days', 'Older'],
      default: 'Today',
    },
    messageCount: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ChatHistory =
  mongoose.models.ChatHistory || mongoose.model<IChatHistory>('ChatHistory', ChatHistorySchema);
