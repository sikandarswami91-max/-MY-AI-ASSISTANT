import mongoose, { Schema, Document } from 'mongoose';

export interface IReminder extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  dateTime: Date;
  status: 'pending' | 'triggered' | 'dismissed';
  isRepeat: boolean;
  repeatInterval?: 'daily' | 'weekly' | 'monthly';
  createdAt: Date;
  updatedAt: Date;
}

const ReminderSchema = new Schema<IReminder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    dateTime: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'triggered', 'dismissed'], default: 'pending' },
    isRepeat: { type: Boolean, default: false },
    repeatInterval: { type: String, enum: ['daily', 'weekly', 'monthly'] },
  },
  { timestamps: true }
);

export const Reminder =
  mongoose.models.Reminder || mongoose.model<IReminder>('Reminder', ReminderSchema);
