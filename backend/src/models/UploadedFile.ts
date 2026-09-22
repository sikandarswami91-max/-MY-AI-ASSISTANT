import mongoose, { Schema, Document } from 'mongoose';

export interface IUploadedFile extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  originalName: string;
  mimeType: string;
  size: string;
  sizeBytes: number;
  path: string;
  url: string;
  type: 'pdf' | 'image' | 'document' | 'code';
  description?: string;
  pages?: number;
  createdAt: Date;
  updatedAt: Date;
}

const UploadedFileSchema = new Schema<IUploadedFile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: String, required: true },
    sizeBytes: { type: Number, default: 0 },
    path: { type: String, default: '' },
    url: { type: String, default: '' },
    type: { type: String, enum: ['pdf', 'image', 'document', 'code'], default: 'document' },
    description: { type: String, default: '' },
    pages: { type: Number },
  },
  { timestamps: true }
);

export const UploadedFile =
  mongoose.models.UploadedFile || mongoose.model<IUploadedFile>('UploadedFile', UploadedFileSchema);
