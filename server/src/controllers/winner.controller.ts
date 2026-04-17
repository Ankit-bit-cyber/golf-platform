import { Request, Response } from 'express';
import * as winnerService from '../services/winner.service';

export const getMyWinnings = async (req: Request, res: Response) => {
  try {
    const winnings = await winnerService.getMyWins(req.user!.id);
    res.json(winnings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getWinner = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const winner = await winnerService.getWinnerById(req.params.id);
    if (winner.user_id !== req.user!.id && req.user!.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    res.json(winner);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const submitProof = async (req: Request<{ id: string }>, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const result = await winnerService.submitProof(req.params.id, req.user!.id, req.file);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const approveWinner = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const result = await winnerService.verifyWinner(req.params.id, 'approve');
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const rejectWinner = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const result = await winnerService.verifyWinner(req.params.id, 'reject');
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
