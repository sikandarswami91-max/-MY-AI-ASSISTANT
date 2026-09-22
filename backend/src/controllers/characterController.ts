import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { AICharacter } from '../models/AICharacter.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getCharacter = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    let character = await AICharacter.findOne({ userId, isDefault: true });

    if (!character) {
      character = {
        characterId: 'char-nova',
        name: 'Nova',
        gender: 'female',
        personality: 'Adaptive Neural Assistant',
        title: 'Multimodal Cognitive Specialist',
        description: 'Warm, adaptive, highly articulate intelligence tuned for engineering and systems thinking.',
        isDefault: true,
      } as any;
    }

    return successResponse(res, character);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const updateCharacter = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const { characterId, name, gender, personality, title, description } = req.body;

    const updated = await AICharacter.findOneAndUpdate(
      { userId, isDefault: true },
      {
        $set: {
          characterId,
          name,
          gender,
          personality,
          title,
          description,
        },
      },
      { new: true, upsert: true }
    );

    return successResponse(res, updated, 'Character persona updated');
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};
