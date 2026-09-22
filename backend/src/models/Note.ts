import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  category: string;
  isPinned: boolean;
  isFavorite: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, default: '' },
    category: { type: String, default: 'General' },
    isPinned: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export const Note = mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);
