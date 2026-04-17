import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import { updateCharityPrefSchema } from '../validators';
import * as userController from '../controllers/user.controller';

const router = Router();

router.use(authenticate);

router.get('/me', userController.getMe);
router.patch('/me/charity', validateRequest(updateCharityPrefSchema), userController.updateCharityPreference);

export default router;
