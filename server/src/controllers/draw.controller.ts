import { Request, Response } from 'express';
import * as drawService from '../services/draw.service';
import prisma from '../lib/prisma';

export const createDraw = async (req: Request, res: Response) => {
  try {
    const draw = await drawService.createDraftDraw(req.body.month, req.body.year, req.body.draw_type);
    res.status(201).json(draw);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const simulateDraw = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const draw = await drawService.simulateDraw(req.params.id);
    res.json(draw);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const publishDraw = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const draw = await drawService.publishDraw(req.params.id);
    res.json(draw);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getDraws = async (req: Request, res: Response) => {
  try {
    const draws = await drawService.getAllDraws();
    res.json(draws);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getDraw = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const draw = await drawService.getDrawDetails(req.params.id);
    if (!draw) return res.status(404).json({ error: 'Not found' });
    res.json(draw);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyResults = async (req: Request, res: Response) => {
    try {
        const entries = await drawService.getUserDrawEntries(req.user!.id);
        const winnings = await prisma.winner.findMany({ where: { user_id: req.user!.id } });
        
        const results = entries.map(entry => {
            const win = winnings.find((w: any) => w.draw_id === entry.draw_id);
            return {
                draw: entry.draw,
                scores: entry.scores_snap,
                winner: win || null
            };
        });
        res.json(results);
    } catch(err:any) {
        res.status(500).json({ error: err.message });
    }
}
