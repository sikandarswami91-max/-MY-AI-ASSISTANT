import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  timeString: string;
  dueDate: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'today' | 'upcoming' | 'completed';
  tag?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    timeString: { type: String, default: 'Today · 7:00 PM' },
    dueDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    category: { type: String, enum: ['today', 'upcoming', 'completed'], default: 'today' },
    tag: { type: String, default: 'General' },
  },
  { timestamps: true }
);

export const Task = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
