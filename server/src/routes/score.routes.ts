import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.use(authenticate);

router.get('/test', (req, res) => {
  res.json({ score: 'minimal' });
});

export default router;
