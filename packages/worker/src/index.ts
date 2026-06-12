import { Worker, type Job as BullJob } from 'bullmq';
import path from 'path';
import { captureWebsite } from './capture';
import { buildStoryboard } from './scene-planner';
import { renderVideo } from './render';
import { selectTrack, hasMusic } from './music';
import {
  getScreenshotPath,
  getVideoPath,
  getMusicOutputPath,
} from '../../api/src/services/storage';
import type { JobData, Scene } from '../../api/src/types';
import fs from 'fs/promises';

const QUEUE_NAME = 'video-jobs';
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const STORAGE_DIR = path.resolve(process.env.STORAGE_DIR || './data');
const MUSIC_DIR = path.resolve(process.env.MUSIC_DIR || './assets/music');
const SCREENSHOT_DIR = path.join(STORAGE_DIR, 'jobs');

// Simple per-job write lock to prevent concurrent JSON corruption
const writeLocks = new Map<string, Promise<void>>();

function withLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const prev = writeLocks.get(key) || Promise.resolve();
  const next = prev.then(fn, fn); // run fn even if previous rejected
  writeLocks.set(key, next.then(() => {}, () => {})); // clear when done
  return next;
}

async function updateJobProgress(
  job: BullJob,
  jobId: string,
  status: JobData['status'],
  progress: number,
  extra: Partial<JobData> = {}
): Promise<void> {
  const jobDir = path.join(SCREENSHOT_DIR, jobId);
  const jobJsonPath = path.join(jobDir, 'job.json');

  await job.updateProgress(progress);

  await withLock(jobId, async () => {
    try {
      const raw = await fs.readFile(jobJsonPath, 'utf-8');
      const data: JobData = JSON.parse(raw);
      const updated: JobData = { ...data, ...extra, status, progress };
      // Atomic write: write to temp file then rename
      const tmpPath = jobJsonPath + '.tmp';
      await fs.writeFile(tmpPath, JSON.stringify(updated, null, 2), 'utf-8');
      await fs.rename(tmpPath, jobJsonPath);
    } catch {
      // If file doesn't exist yet, skip — the API will have created it
    }
  });
}

async function processJob(job: BullJob): Promise<void> {
  const { id: jobId, url, style, duration } = job.data as {
    id: string;
    url: string;
    style: any;
    duration: number;
  };

  console.log(`\n[Worker] Processing job ${jobId}: ${url} (${style}, ${duration}s)`);
  const jobDir = path.join(SCREENSHOT_DIR, jobId);
  const screenshotDir = path.join(jobDir, 'screenshots');

  // Ensure directories exist
  await fs.mkdir(screenshotDir, { recursive: true });

  try {
    // ---- Phase 1: Capture ----
    await updateJobProgress(job, jobId, 'capturing', 5);
    const detectedSections = await captureWebsite(
      url,
      jobId,
      screenshotDir,
      async (pct) => {
        // Map capture progress (0–100) to overall (5–35)
        const overall = 5 + Math.round(pct * 0.3);
        await updateJobProgress(job, jobId, 'capturing', overall);
      }
    );

    if (detectedSections.length === 0) {
      throw new Error('No sections detected on the page. The URL may be empty or require JavaScript.');
    }

    // ---- Phase 2: Scene Planning ----
    await updateJobProgress(job, jobId, 'planning', 35);
    const scenes = buildStoryboard(detectedSections, screenshotDir, duration);

    // Update screenshot paths to absolute for the Remotion renderer
    const absoluteScenes: Scene[] = scenes.map((scene) => ({
      ...scene,
      screenshotPath: path.join(screenshotDir, `scene-${parseInt(scene.id.split('-')[1])}.png`),
    }));

    await updateJobProgress(job, jobId, 'planning', 45, { sceneData: absoluteScenes });
    console.log(
      `[Worker] Storyboard: ${scenes.length} scenes, total ${scenes[scenes.length - 1]?.endTime || duration}s`
    );

    // ---- Phase 3: Music Selection ----
    await updateJobProgress(job, jobId, 'rendering', 46);
    let musicPath = '';
    if (hasMusic(MUSIC_DIR)) {
      musicPath = selectTrack(style, MUSIC_DIR);
      console.log(`[Worker] Music track: ${musicPath}`);
    } else {
      console.log('[Worker] No music tracks found — rendering without music.');
    }

    // ---- Phase 4: Render ----
    await updateJobProgress(job, jobId, 'rendering', 48);
    const outputPath = await renderVideo(
      jobId,
      absoluteScenes,
      jobDir,
      musicPath,
      async (pct) => {
        // Map render progress (0–100) to overall (48–98)
        const overall = 48 + Math.round(pct * 0.5);
        await updateJobProgress(job, jobId, 'rendering', Math.min(overall, 98));
      }
    );

    // ---- Complete ----
    await updateJobProgress(job, jobId, 'completed', 100, {
      outputPath,
      sceneData: absoluteScenes,
    });

    console.log(`[Worker] Job ${jobId} completed! Output: ${outputPath}`);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[Worker] Job ${jobId} failed: ${errorMsg}`);
    await updateJobProgress(job, jobId, 'failed', 0, { error: errorMsg });
  }
}

// ---- Start Worker ----
console.log('[Worker] Starting Zentro worker...');
console.log(`[Worker] Redis: ${REDIS_URL}`);
console.log(`[Worker] Storage: ${STORAGE_DIR}`);
console.log(`[Worker] Music: ${MUSIC_DIR}`);

const worker = new Worker(QUEUE_NAME, processJob, {
  connection: { url: REDIS_URL },
  concurrency: 1, // One at a time per worker instance
});

worker.on('completed', (job) => {
  console.log(`[Worker] Job ${job.id} completed successfully.`);
});

worker.on('failed', (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed: ${err.message}`);
});

worker.on('error', (err) => {
  console.error(`[Worker] Worker error: ${err.message}`);
});

console.log('[Worker] Worker is ready and listening for jobs...');

// Graceful shutdown
async function shutdown() {
  console.log('\n[Worker] Shutting down...');
  await worker.close();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
