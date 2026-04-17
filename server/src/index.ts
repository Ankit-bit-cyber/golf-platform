import express from 'express';
import { env } from './config/env';

// STEP 1: TEST THESE ONE BY ONE
// import { authenticate } from './middleware/authenticate';
// import { requireSubscription } from './middleware/requireSubscription';
// import { validateRequest } from './middleware/validateRequest';
// import { createScoreSchema } from './validators';
// import * as scoreController from './controllers/score.controller';

const app = express();
app.get('/api/health', (req, res) => res.json({ ok: true, step: 'isolation-base' }));

app.listen(env.PORT, () => console.log('Base running'));
