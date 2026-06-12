import { Router, type Request, type Response } from 'express';
import { v4 as uuid } from 'uuid';
import { createJobSchema, type JobData } from '../types';
import { addJob } from '../services/queue';
import { saveJob, getJob, listJobs, getVideoPath } from '../services/storage';
import fs from 'fs';

const router = Router();

// POST /api/jobs — Create a new video generation job
router.post('/', async (req: Request, res: Response) => {
  const parsed = createJobSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid request', details: parsed.error.flatten() });
    return;
  }

  const { url, style, duration } = parsed.data;
  const id = uuid();
  const now = new Date().toISOString();

  const job: JobData = {
    id,
    url,
    style,
    duration,
    status: 'queued',
    progress: 0,
    createdAt: now,
  };

  await saveJob(job);
  await addJob({ url, style, duration }, id);

  res.status(201).json({ id, status: 'queued' });
});

// GET /api/jobs — List all jobs
router.get('/', async (_req: Request, res: Response) => {
  const jobs = await listJobs();
  res.json(jobs);
});

// GET /api/jobs/:id — Get job status
router.get('/:id', async (req: Request, res: Response) => {
  const job = await getJob(req.params.id);
  if (!job) {
    res.status(404).json({ error: 'Job not found' });
    return;
  }
  res.json(job);
});

// GET /api/jobs/:id/video — Stream the rendered video
router.get('/:id/video', async (req: Request, res: Response) => {
  const job = await getJob(req.params.id);
  if (!job || job.status !== 'completed' || !job.outputPath) {
    res.status(404).json({ error: 'Video not available' });
    return;
  }

  const videoPath = getVideoPath(job.id);
  if (!fs.existsSync(videoPath)) {
    res.status(404).json({ error: 'Video file not found' });
    return;
  }

  const stat = fs.statSync(videoPath);
  res.writeHead(200, {
    'Content-Type': 'video/mp4',
    'Content-Length': stat.size,
    'Content-Disposition': `attachment; filename="zentro-${job.id}.mp4"`,
  });
  fs.createReadStream(videoPath).pipe(res);
});

export default router;
