import mongoose, { Schema, Document } from 'mongoose';

export interface IUserSettings extends Document {
  userId: mongoose.Types.ObjectId;
  appearance: {
    theme: 'dark' | 'light' | 'system';
  };
  voice: {
    selectedVoiceId: string;
    gender: 'male' | 'female';
    language: 'English' | 'Hindi' | 'Hinglish';
    speed: number;
    pitch: number;
    autoSpeak: boolean;
  };
  aiPreferences: {
    responseStyle: 'concise' | 'balanced' | 'indepth';
    creativity: number;
    continuousMemory: boolean;
  };
  notifications: {
    taskReminders: boolean;
    aiProactiveSuggestions: boolean;
  };
  privacy: {
    analyticsOptIn: boolean;
    storeAudioLogs: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSettingsSchema = new Schema<IUserSettings>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    appearance: {
      theme: { type: String, enum: ['dark', 'light', 'system'], default: 'light' },
    },
    voice: {
      selectedVoiceId: { type: String, default: 'voice-nova-default' },
      gender: { type: String, enum: ['male', 'female'], default: 'female' },
      language: { type: String, enum: ['English', 'Hindi', 'Hinglish'], default: 'English' },
      speed: { type: Number, default: 1.0 },
      pitch: { type: Number, default: 1.0 },
      autoSpeak: { type: Boolean, default: false },
    },
    aiPreferences: {
      responseStyle: { type: String, enum: ['concise', 'balanced', 'indepth'], default: 'balanced' },
      creativity: { type: Number, default: 0.7 },
      continuousMemory: { type: Boolean, default: true },
    },
    notifications: {
      taskReminders: { type: Boolean, default: true },
      aiProactiveSuggestions: { type: Boolean, default: false },
    },
    privacy: {
      analyticsOptIn: { type: Boolean, default: true },
      storeAudioLogs: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export const UserSettings =
  mongoose.models.UserSettings || mongoose.model<IUserSettings>('UserSettings', UserSettingsSchema);
