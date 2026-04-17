import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { registerSchema, loginSchema } from '../validators/auth.schema';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

export default router;
