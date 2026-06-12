import path from 'path';
import fs from 'fs/promises';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import type { Scene } from '../../api/src/types';

const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

export interface RenderInput {
  scenes: Scene[];
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  musicPath: string;
}

export async function renderVideo(
  jobId: string,
  scenes: Scene[],
  outputDir: string,
  musicPath: string,
  onProgress: (pct: number) => void
): Promise<string> {
  onProgress(5);
  console.log(`[Render] Starting render for job ${jobId}...`);
  console.log(`[Render] ${scenes.length} scenes, output: ${outputDir}`);

  // Calculate total frames
  const totalDurationSec = scenes.length > 0 ? scenes[scenes.length - 1].endTime : 60;
  const durationInFrames = Math.ceil(totalDurationSec * FPS);

  const inputProps: RenderInput = {
    scenes,
    durationInFrames,
    fps: FPS,
    width: WIDTH,
    height: HEIGHT,
    musicPath,
  };

  onProgress(10);

  // Write input props to a JSON file
  const propsPath = path.join(outputDir, 'input-props.json');
  await fs.writeFile(propsPath, JSON.stringify(inputProps, null, 2));
  console.log(`[Render] Input props written to ${propsPath}`);

  const remotionSrcDir = path.resolve(__dirname, '../../remotion/src');
  const outputPath = path.join(outputDir, 'output.mp4');

  onProgress(20);

  try {
    // Copy screenshots to Remotion's public/ folder so <Img> can load them
    const publicDir = path.resolve(__dirname, '../../remotion/public');
    const screenshotsPublicDir = path.join(publicDir, 'screenshots');
    await fs.mkdir(screenshotsPublicDir, { recursive: true });

    // Copy screenshots and transform paths to public/-relative
    const publicScenes = [];
    for (const scene of scenes) {
      const filename = path.basename(scene.screenshotPath);
      const srcPath = scene.screenshotPath;
      const dstPath = path.join(screenshotsPublicDir, filename);
      try {
        await fs.copyFile(srcPath, dstPath);
      } catch {
        console.warn(`[Render] Could not copy screenshot: ${srcPath}`);
      }
      publicScenes.push({
        ...scene,
        screenshotPath: `screenshots/${filename}`, // relative to public/
      });
    }
    console.log(`[Render] Copied ${scenes.length} screenshots to public/`);

    // Update inputProps with public-relative paths
    inputProps.scenes = publicScenes;

    const entryPoint = path.join(remotionSrcDir, 'index.ts');
    console.log(`[Render] Bundling Remotion project from ${entryPoint}...`);

    const bundleLocation = await bundle({
      entryPoint,
      webpackOverride: (config: any) => config,
      publicDir,
    });

    onProgress(40);
    console.log(`[Render] Bundle: ${bundleLocation}`);

    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: 'ZentroDemo',
      inputProps,
    });

    onProgress(50);
    console.log(`[Render] Composition: ${composition.id} (${composition.durationInFrames} frames)`);

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps,
      onProgress: ({ progress }: { progress: number }) => {
        const ourProgress = 50 + Math.round(progress * 45);
        onProgress(ourProgress);
      },
    });

    onProgress(100);
    const stat = await fs.stat(outputPath);
    console.log(`[Render] Video rendered: ${outputPath} (${(stat.size / 1024 / 1024).toFixed(1)} MB)`);
    return outputPath;
  } catch (err) {
    const msg = (err as Error).message || String(err);
    console.error(`[Render] Remotion render failed: ${msg}`);
    // Re-throw so the worker marks the job as failed
    throw new Error(`Render failed: ${msg}`);
  }
}
