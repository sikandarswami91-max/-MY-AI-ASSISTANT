import mongoose, { Schema, Document } from 'mongoose';

export interface IAICharacter extends Document {
  userId: mongoose.Types.ObjectId;
  characterId: string;
  name: string;
  gender: 'male' | 'female';
  personality: string;
  title: string;
  description: string;
  avatarUrl?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AICharacterSchema = new Schema<IAICharacter>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    characterId: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    personality: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const AICharacter =
  mongoose.models.AICharacter || mongoose.model<IAICharacter>('AICharacter', AICharacterSchema);
