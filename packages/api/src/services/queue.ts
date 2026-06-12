import { Queue, Worker, type Job as BullJob } from 'bullmq';
import { config } from '../config';
import type { JobData, CreateJobRequest } from '../types';

const QUEUE_NAME = 'video-jobs';

let queue: Queue | null = null;

function getConnection() {
  return { connection: { url: config.redisUrl } };
}

export function getQueue(): Queue {
  if (!queue) {
    queue = new Queue(QUEUE_NAME, getConnection());
  }
  return queue;
}

export async function addJob(data: CreateJobRequest, jobId: string): Promise<void> {
  const q = getQueue();
  await q.add('process-video', { ...data, id: jobId }, { jobId });
}

export async function getJobStatus(jobId: string): Promise<{
  state: 'waiting' | 'active' | 'completed' | 'failed' | 'delayed' | 'unknown';
  progress: number;
  error?: string;
} | null> {
  const q = getQueue();
  try {
    const job = await q.getJob(jobId);
    if (!job) return null;
    const state = await job.getState();
    return {
      state: state as any,
      progress: job.progress as number,
      error: (job as any).failedReason || undefined,
    };
  } catch {
    return null;
  }
}

export async function closeQueue(): Promise<void> {
  if (queue) {
    await queue.close();
    queue = null;
  }
}
