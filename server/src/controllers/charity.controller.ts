import { Request, Response } from 'express';
import * as charityService from '../services/charity.service';

export const getCharities = async (req: Request, res: Response) => {
  try {
    const featured = req.query.featured === 'true';
    const search = req.query.search as string;
    const charities = await charityService.getAllCharities(featured, search);
    res.json(charities);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCharity = async (req: Request, res: Response) => {
  try {
    const charity = await charityService.getCharityById(req.params.id);
    res.json(charity);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const createCharity = async (req: Request, res: Response) => {
  try {
    const charity = await charityService.createCharity(req.body);
    res.status(201).json(charity);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCharity = async (req: Request, res: Response) => {
  try {
    const charity = await charityService.updateCharity(req.params.id, req.body);
    res.json(charity);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCharity = async (req: Request, res: Response) => {
  try {
    const result = await charityService.deleteCharity(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
