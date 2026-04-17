import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import charityRoutes from './charity.routes.js';
import drawRoutes from './draw.routes.js';
import scoreRoutes from './score.routes.js';
import subscriptionRoutes from './subscription.routes.js';
import adminRoutes from './admin.routes.js';
import winnerRoutes from './winner.routes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ ok: true, status: 'fully-integrated' }));

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/charities', charityRoutes);
router.use('/draws', drawRoutes);
router.use('/scores', scoreRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/admin', adminRoutes);
router.use('/winners', winnerRoutes);

export default router;
