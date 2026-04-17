import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { requireAdmin } from '../middleware/requireAdmin';
import { validateRequest } from '../middleware/validateRequest';
import { createDrawSchema } from '../validators/draw.schema';
import * as drawController from '../controllers/draw.controller';

const router = Router();

router.use(authenticate);

router.get('/my-results', drawController.getMyResults);
router.get('/', drawController.getDraws);
router.get('/:id', drawController.getDraw);

router.post('/', requireAdmin, validateRequest(createDrawSchema), drawController.createDraw);
router.post('/:id/simulate', requireAdmin, drawController.simulateDraw);
router.post('/:id/publish', requireAdmin, drawController.publishDraw);

export default router;
