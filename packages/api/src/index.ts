import express from 'express';
import cors from 'cors';
import { config } from './config';
import jobRoutes from './routes/jobs';
import { closeQueue } from './services/queue';
import path from 'path';

const app = express();

// Middleware
app.use(cors({ origin: config.frontendUrl }));
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);

// Serve static video files
app.use('/data', express.static(path.resolve(config.storageDir)));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
const server = app.listen(config.port, () => {
  console.log(`[Zentro API] Running on http://localhost:${config.port}`);
  console.log(`[Zentro API] Storage: ${config.storageDir}`);
  console.log(`[Zentro API] Redis: ${config.redisUrl}`);
});

// Graceful shutdown
async function shutdown() {
  console.log('\n[Zentro API] Shutting down...');
  await closeQueue();
  server.close();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
