import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { charitySchema, updateCharityPrefSchema } from '../validators';
import { authenticate } from '../middleware/authenticate';
import { requireAdmin } from '../middleware/requireAdmin';
import * as charityController from '../controllers/charity.controller';

const router = Router();

router.get('/', charityController.getCharities);
router.get('/:id', charityController.getCharity);

router.post('/', authenticate, requireAdmin, validateRequest(charitySchema), charityController.createCharity);
router.patch('/:id', authenticate, requireAdmin, validateRequest(updateCharityPrefSchema), charityController.updateCharity);
router.delete('/:id', authenticate, requireAdmin, charityController.deleteCharity);

export default router;
