import { Request, Response } from 'express';
import * as subscriptionService from '../services/subscription.service';

export const getSubscription = async (req: Request, res: Response) => {
  try {
    const sub = await subscriptionService.getSubscription(req.user!.id);
    if (!sub) return res.status(404).json({ error: 'No subscription found' });
    res.json(sub);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePlan = async (req: Request, res: Response) => {
  try {
    const { plan } = req.body;
    if (!['MONTHLY', 'YEARLY'].includes(plan)) {
      return res.status(400).json({ error: 'Invalid plan' });
    }
    const sub = await subscriptionService.updatePlan(req.user!.id, plan);
    res.json(sub);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const checkStatus = async (req: Request, res: Response) => {
  try {
    const active = await subscriptionService.isActive(req.user!.id);
    res.json({ active });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
