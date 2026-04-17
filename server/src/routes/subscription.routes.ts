import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import { updateSubscriptionSchema } from '../validators';
import * as subService from '../services/subscription.service';

const router = Router();

router.use(authenticate);

router.get('/me', async (req: Request, res: Response) => {
  try {
    const sub = await subService.getSubscription(req.user!.id);
    if (!sub) return res.status(404).json({ error: 'Not found' });
    res.json(sub);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/me', validateRequest(updateSubscriptionSchema), async (req: Request, res: Response) => {
  try {
    const sub = await subService.updatePlan(req.user!.id, req.body.plan);
    res.json(sub);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
