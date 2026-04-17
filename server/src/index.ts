import express from 'express';
import { env } from './config/env';

// STEP 1: TEST THESE ONE BY ONE
import { requireAdmin } from './middleware/requireAdmin';
import * as charityController from './controllers/charity.controller';

const app = express();
app.get('/api/health', (req, res) => res.json({ ok: true, step: 'controller-isolation' }));

app.listen(env.PORT, () => console.log('Final isolation running'));
