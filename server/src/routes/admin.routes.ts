import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/authenticate';
import { requireAdmin } from '../middleware/requireAdmin';
import * as adminService from '../services/admin.service';

const router = Router();
router.use(authenticate, requireAdmin);

router.get('/stats', async (req: Request, res: Response) => {
    try {
        const stats = await adminService.getPlatformStats();
        res.json(stats);
    } catch(err:any) { res.status(500).json({error: err.message}); }
});

router.get('/users', async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const search = (req.query.search as string) || '';
        
        const data = await adminService.getUsers(page, limit, search);
        res.json(data);
    } catch(err:any) { res.status(500).json({error: err.message}); }
});

router.patch('/users/:id/subscription/toggle', async (req: Request, res: Response) => {
    try {
        const result = await adminService.toggleUserSubscription(req.params.id);
        res.json(result);
    } catch(err:any) { res.status(400).json({error: err.message}); }
});

export default router;
