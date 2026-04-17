import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import { updateCharityPrefSchema } from '../validators/user.schema';

const router = Router();
const prisma = new PrismaClient();

router.use(authenticate);

router.get('/me', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { charity: true, subscription: true }
    });
    if(!user) return res.status(404).json({error: 'Not found'});
    const { password_hash, ...u } = user;
    res.json(u);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/me/charity', validateRequest(updateCharityPrefSchema), async (req: Request, res: Response) => {
  try {
    const charity = await prisma.charity.findUnique({ where: { id: req.body.charity_id } });
    if (!charity) return res.status(404).json({ error: 'Charity not found' });
    
    const updated = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        charity_id: req.body.charity_id,
        charity_pct: req.body.charity_pct
      },
      include: { charity: true }
    });
    
    const { password_hash, ...u } = updated;
    res.json(u);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
