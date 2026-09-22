import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { UserSettings } from '../models/UserSettings.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getSettings = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    let settings = await UserSettings.findOne({ userId });

    if (!settings) {
      // Default initial settings
      settings = {
        appearance: { theme: 'light' },
        voice: {
          selectedVoiceId: 'voice-nova-default',
          gender: 'female',
          language: 'English',
          speed: 1.0,
          pitch: 1.0,
          autoSpeak: false,
        },
        aiPreferences: {
          responseStyle: 'balanced',
          creativity: 0.7,
          continuousMemory: true,
        },
        notifications: {
          taskReminders: true,
          aiProactiveSuggestions: false,
        },
        privacy: {
          analyticsOptIn: true,
          storeAudioLogs: false,
        },
      } as any;
    }

    return successResponse(res, settings);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const updateSettings = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const updated = await UserSettings.findOneAndUpdate(
      { userId },
      { $set: req.body },
      { new: true, upsert: true }
    );
    return successResponse(res, updated, 'Settings updated');
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};
