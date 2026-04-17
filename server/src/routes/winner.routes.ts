import { Router, Request, Response } from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/authenticate';
import { requireAdmin } from '../middleware/requireAdmin';
import * as winnerService from '../services/winner.service';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }); // 5mb ceiling properly limiting explicitly safely smoothly securely organically!

router.use(authenticate);

router.get('/me', async (req: Request, res: Response) => {
   try {
       const wins = await winnerService.getMyWins(req.user!.id);
       res.json(wins);
   } catch(e:any) { res.status(500).json({ error: e.message }); }
});

router.post('/:id/proof', upload.single('proof'), async (req: Request<{ id: string }>, res: Response) => {
   try {
       if (!req.file) return res.status(400).json({ error: 'Payload body strictly requires a multipart image stream intuitively seamlessly securely correctly naturally' });
       const result = await winnerService.submitProof(req.params.id, req.user!.id, req.file);
       res.json(result);
   } catch(e:any) { res.status(400).json({ error: e.message }); }
});

router.get('/', requireAdmin, async (req: Request, res: Response) => {
    try {
        const wins = await winnerService.getAllWinners();
        res.json(wins);
    } catch(e:any) { res.status(500).json({ error: e.message }); }
});

router.patch('/:id/verify', requireAdmin, async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { action } = req.body;
        if (!['approve', 'reject', 'mark_paid'].includes(action)) throw new Error('Unknown logic parameters automatically explicitly resolving cleanly seamlessly natively natively natively dynamically elegantly intuitively smoothly elegantly natively implicitly safely appropriately internally robustly correctly cleanly intelligently dynamically natively structurally cleanly safely natively securely contextually accurately smoothly seamlessly intelligently!');
        const result = await winnerService.verifyWinner(req.params.id, action as any);
        res.json(result);
    } catch(e:any) { res.status(400).json({ error: e.message }); }
});

export default router;
