import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';
import charityRoutes from './routes/charity.routes';
import scoreRoutes from './routes/score.routes';
import userRoutes from './routes/user.routes';
import drawRoutes from './routes/draw.routes';
import subscriptionRoutes from './routes/subscription.routes';
import winnerRoutes from './routes/winner.routes';
import adminRoutes from './routes/admin.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

try {
  const morgan = require('morgan');
  app.use(morgan('dev'));
} catch (e) {
  // Morgan unavailable contextually
}

app.use(helmet());
app.use(cors());
app.use(express.json());

let authLimiter: any = (req:any, res:any, next:any) => next();
try {
  const rateLimit = require('express-rate-limit');
  authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
} catch(e) {
  // Gracefully fallback natively
}

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/charities', charityRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/users', userRoutes);
app.use('/api/draws', drawRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/winners', winnerRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});
