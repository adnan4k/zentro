import { chromium, type Browser, type Page } from 'playwright';
import path from 'path';
import fs from 'fs/promises';
import { detectSections, type DetectedSection } from './scene-planner';

const SCREENSHOT_WIDTH = 1920;
const SCREENSHOT_HEIGHT = 1080;

export async function captureWebsite(
  url: string,
  jobId: string,
  screenshotDir: string,
  onProgress: (pct: number) => void
): Promise<DetectedSection[]> {
  let browser: Browser | null = null;

  try {
    onProgress(5);
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: SCREENSHOT_WIDTH, height: SCREENSHOT_HEIGHT },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    onProgress(10);
    console.log(`[Capture] Navigating to ${url}...`);

    // Navigate with timeout
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    onProgress(20);

    // Dismiss common cookie banners and popups
    await dismissPopups(page);

    // Auto-scroll to trigger lazy loading
    await autoScroll(page, onProgress);

    // Extract section candidates from the DOM
    const candidates = await page.evaluate(() => {
      const results: Array<{
        tagName: string;
        className: string;
        id: string;
        scrollY: number;
        viewportHeight: number;
        textContent: string;
        boundingHeight: number;
      }> = [];

      const viewportHeight = window.innerHeight;

      // Query candidate elements
      const selectors = [
        'header',
        'section',
        '[class*="hero"]',
        '[class*="Hero"]',
        '[class*="banner"]',
        '[class*="Banner"]',
        '[class*="feature"]',
        '[class*="Feature"]',
        '[class*="pricing"]',
        '[class*="Pricing"]',
        '[class*="testimonial"]',
        '[class*="Testimonial"]',
        '[class*="review"]',
        '[class*="cta"]',
        '[class*="CTA"]',
        '[class*="call-to-action"]',
        '[class*="dashboard"]',
        '[class*="demo"]',
        '[class*="product"]',
        'footer',
        // Also grab large divs that might be visual sections
        'div[class*="section"]',
        'div[class*="Section"]',
        'div[class*="container"]',
      ];

      const seen = new Set<Element>();
      for (const sel of selectors) {
        try {
          document.querySelectorAll(sel).forEach((el) => {
            if (seen.has(el)) return;
            const rect = el.getBoundingClientRect();
            // Only include visible elements
            if (rect.width === 0 || rect.height === 0) return;
            seen.add(el);

            // Get text content from heading and paragraph elements
            const headings = Array.from(el.querySelectorAll('h1, h2, h3, h4, p'))
              .map((e) => (e as HTMLElement).innerText?.trim())
              .filter(Boolean)
              .join(' ');

            results.push({
              tagName: el.tagName.toLowerCase(),
              className: (el as HTMLElement).className || '',
              id: el.id || '',
              scrollY: rect.top + window.scrollY,
              viewportHeight,
              textContent: headings || (el as HTMLElement).innerText?.substring(0, 300) || '',
              boundingHeight: rect.height,
            });
          });
        } catch {
          // Some selectors may be invalid — skip
        }
      }

      return results;
    });

    onProgress(60);

    // Detect sections using the rule-based planner
    const sections = detectSections(candidates);
    console.log(
      `[Capture] Detected ${sections.length} sections: ${sections
        .map((s) => s.sectionType)
        .join(', ')}`
    );

    // Take screenshots for each detected section
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const progressPct = 60 + Math.round(((i + 1) / sections.length) * 35);
      onProgress(progressPct);

      await page.evaluate((scrollY) => {
        window.scrollTo({ top: scrollY, behavior: 'instant' });
      }, section.scrollY);

      // Wait for any lazy images or animations to settle
      await page.waitForTimeout(300);

      const screenshotPath = path.join(screenshotDir, `scene-${i + 1}.png`);
      await page.screenshot({
        path: screenshotPath,
        type: 'png',
        fullPage: false, // Viewport-only, since we're positioned at the section
      });

      console.log(`[Capture] Screenshot ${i + 1}/${sections.length}: ${screenshotPath}`);
    }

    onProgress(95);

    return sections;
  } finally {
    if (browser) {
      await browser.close();
    }
    onProgress(100);
  }
}

async function dismissPopups(page: Page): Promise<void> {
  try {
    // Common cookie consent and popup selectors
    const dismissSelectors = [
      '[aria-label="Close"]',
      '[aria-label="Dismiss"]',
      '.close',
      '.cookie-accept',
      '.cookie-consent button',
      '[data-testid="close-button"]',
      'button:has-text("Accept")',
      'button:has-text("Got it")',
      'button:has-text("OK")',
      'button:has-text("Close")',
      '[class*="popup"] button',
      '[class*="modal"] button.close',
    ];

    for (const sel of dismissSelectors) {
      try {
        const btn = page.locator(sel).first();
        if (await btn.isVisible({ timeout: 500 })) {
          await btn.click({ timeout: 1000 });
          console.log(`[Capture] Dismissed popup: ${sel}`);
          await page.waitForTimeout(300);
        }
      } catch {
        // Not found or not clickable — skip
      }
    }
  } catch {
    // Popup dismissal is best-effort
  }
}

async function autoScroll(
  page: Page,
  onProgress: (pct: number) => void
): Promise<void> {
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = SCREENSHOT_HEIGHT;

  if (totalHeight <= viewportHeight) {
    onProgress(30);
    return; // No scrolling needed
  }

  // Smooth scroll in steps
  const steps = 10;
  const scrollStep = (totalHeight - viewportHeight) / steps;

  for (let i = 0; i <= steps; i++) {
    const scrollY = Math.min(i * scrollStep, totalHeight - viewportHeight);
    await page.evaluate((y) => {
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, scrollY);

    // Progress from 20→55 during scrolling
    const progress = 20 + Math.round((i / steps) * 35);
    onProgress(progress);

    await page.waitForTimeout(400);
  }

  // Scroll back to top
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(300);
}
