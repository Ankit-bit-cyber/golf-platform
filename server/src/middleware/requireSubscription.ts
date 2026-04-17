import { Request, Response, NextFunction } from 'express';
import { isActive } from '../services/subscription.service';

export const requireSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const active = await isActive(req.user.id);
    if (!active) {
      return res.status(403).json({ error: 'Subscribe to access this feature' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify subscription status' });
  }
};
