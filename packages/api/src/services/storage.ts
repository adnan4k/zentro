import fs from 'fs/promises';
import path from 'path';
import { config } from '../config';
import type { JobData } from '../types';

function jobDir(jobId: string): string {
  return path.join(config.storageDir, 'jobs', jobId);
}

function jobFilePath(jobId: string): string {
  return path.join(jobDir(jobId), 'job.json');
}

function screenshotsDir(jobId: string): string {
  return path.join(jobDir(jobId), 'screenshots');
}

export async function ensureJobDirs(jobId: string): Promise<void> {
  await fs.mkdir(jobDir(jobId), { recursive: true });
  await fs.mkdir(screenshotsDir(jobId), { recursive: true });
}

export async function saveJob(job: JobData): Promise<void> {
  await ensureJobDirs(job.id);
  await fs.writeFile(jobFilePath(job.id), JSON.stringify(job, null, 2), 'utf-8');
}

export async function getJob(jobId: string): Promise<JobData | null> {
  try {
    const raw = await fs.readFile(jobFilePath(jobId), 'utf-8');
    return JSON.parse(raw) as JobData;
  } catch {
    return null;
  }
}

export async function listJobs(): Promise<JobData[]> {
  const jobsDir = path.join(config.storageDir, 'jobs');
  try {
    const entries = await fs.readdir(jobsDir, { withFileTypes: true });
    const jobDirs = entries.filter((e) => e.isDirectory());
    const jobs: JobData[] = [];
    for (const dir of jobDirs) {
      const job = await getJob(dir.name);
      if (job) jobs.push(job);
    }
    jobs.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return jobs;
  } catch {
    return [];
  }
}

export function getScreenshotPath(jobId: string, sceneId: string): string {
  return path.join(screenshotsDir(jobId), `${sceneId}.png`);
}

export function getVideoPath(jobId: string): string {
  return path.join(jobDir(jobId), 'output.mp4');
}

export function getMusicOutputPath(jobId: string): string {
  return path.join(jobDir(jobId), 'audio.mp3');
}
