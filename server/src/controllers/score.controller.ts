import { Request, Response } from 'express';
import * as scoreService from '../services/score.service';

export const getScores = async (req: Request, res: Response) => {
  try {
    const scores = await scoreService.getScores(req.user!.id);
    res.json(scores);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addScore = async (req: Request, res: Response) => {
  try {
    const score = await scoreService.addScore(req.user!.id, req.body.value, req.body.date);
    res.status(201).json(score);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateScore = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const score = await scoreService.updateScore(req.params.id, req.user!.id, req.body);
    res.json(score);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteScore = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const result = await scoreService.deleteScore(req.params.id, req.user!.id);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
