import express from 'express';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';
import scoreRoutes from './routes/score.routes';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/scores', scoreRoutes);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, isolation: 'nuclear' });
});

app.get('/api/test-direct', (req, res) => {
  res.json({ message: 'Direct route works' });
});

app.listen(env.PORT, () => {
  console.log(`NUCLEAR TEST running on port ${env.PORT}`);
});
