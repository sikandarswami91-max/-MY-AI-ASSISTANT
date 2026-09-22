import { Router, Request, Response } from 'express';
import { aiService } from '../services/aiService.js';
import { successResponse, errorResponse } from '../utils/response.js';

const router = Router();

router.post('/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, options } = req.body;
    if (!prompt) return errorResponse(res, 'Prompt is required', 400);
    const result = await aiService.generateText(prompt, options);
    return successResponse(res, result);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
});

router.post('/developer', async (req: Request, res: Response) => {
  try {
    const { action, input, language } = req.body;
    if (!action || !input) return errorResponse(res, 'Action and input are required', 400);
    const result = await aiService.developerMode(action, input, language);
    return successResponse(res, result);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
});

router.post('/study', async (req: Request, res: Response) => {
  try {
    const { topic, difficulty } = req.body;
    if (!topic) return errorResponse(res, 'Topic is required', 400);
    const result = await aiService.studyMode(topic, difficulty);
    return successResponse(res, result);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
});

router.get('/weather', async (req: Request, res: Response) => {
  try {
    const location = (req.query.location as string) || 'San Francisco, CA';
    const result = await aiService.getWeather(location);
    return successResponse(res, result);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
});

router.get('/search', async (req: Request, res: Response) => {
  try {
    const query = (req.query.q as string) || '';
    if (!query) return errorResponse(res, 'Query parameter q is required', 400);
    const result = await aiService.webSearch(query);
    return successResponse(res, result);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
});

export default router;
