import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { createScoreSchema, updateScoreSchema } from '../validators';
import * as scoreController from '../controllers/score.controller';
import { authenticate } from '../middleware/authenticate';
import { requireSubscription } from '../middleware/requireSubscription';

const router = Router();

router.use(authenticate);
router.use(requireSubscription);

router.get('/', scoreController.getScores);
router.post('/', validateRequest(createScoreSchema), scoreController.addScore);
router.patch('/:id', validateRequest(updateScoreSchema), scoreController.updateScore);
router.delete('/:id', scoreController.deleteScore);

export default router;
