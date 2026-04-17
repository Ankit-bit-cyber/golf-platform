import { Router, Request, Response } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { charitySchema, updateCharitySchema } from '../validators/charity.schema';
import { authenticate } from '../middleware/authenticate';
import { requireAdmin } from '../middleware/requireAdmin';
import * as charityService from '../services/charity.service';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const featured = req.query.featured === 'true' ? true : undefined;
    const search = req.query.search as string | undefined;
    const charities = await charityService.getAllCharities(featured, search);
    res.json(charities);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const charity = await charityService.getCharityById(req.params.id);
    res.json(charity);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', authenticate, requireAdmin, validateRequest(charitySchema), async (req: Request, res: Response) => {
  try {
    const result = await charityService.createCharity(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/:id', authenticate, requireAdmin, validateRequest(updateCharitySchema), async (req: Request, res: Response) => {
  try {
    const result = await charityService.updateCharity(req.params.id, req.body);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    await charityService.deleteCharity(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
