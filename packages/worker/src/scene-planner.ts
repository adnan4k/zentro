import type { Scene, SectionType, AnimationType } from '../../api/src/types';

export interface DetectedSection {
  selector: string;
  sectionType: SectionType;
  scrollY: number;
  viewportHeight: number;
  textContent: string;
  boundingHeight: number;
}

const SECTION_HINTS: Array<{
  keywords: string[];
  type: SectionType;
  priority: number;
}> = [
  { keywords: ['hero', 'banner', 'jumbotron', 'header', 'landing'], type: 'hero', priority: 10 },
  { keywords: ['feature', 'benefit', 'service', 'capability', 'offering'], type: 'features', priority: 8 },
  { keywords: ['pricing', 'plan', 'subscription', 'price', 'tier'], type: 'pricing', priority: 9 },
  { keywords: ['testimonial', 'review', 'quote', 'customer', 'client', 'success-story'], type: 'testimonials', priority: 7 },
  { keywords: ['dashboard', 'demo', 'product', 'screen', 'interface', 'ui', 'app'], type: 'dashboard', priority: 6 },
  { keywords: ['cta', 'call-to-action', 'get-started', 'signup', 'sign-up', 'trial', 'contact', 'demo-cta'], type: 'cta', priority: 9 },
];

export function detectSections(
  elements: Array<{
    tagName: string;
    className: string;
    id: string;
    scrollY: number;
    viewportHeight: number;
    textContent: string;
    boundingHeight: number;
  }>
): DetectedSection[] {
  const scored = elements.map((el) => {
    const combined = `${el.tagName} ${el.className} ${el.id} ${el.textContent}`.toLowerCase();

    // Semantic tag bonus
    let baseScore = 0;
    if (el.tagName === 'header') baseScore = 8;
    else if (el.tagName === 'section') baseScore = 7;
    else if (el.tagName === 'footer') baseScore = 5;
    else if (el.tagName === 'div') baseScore = 3;

    // Size score: prefer elements that fill most of the viewport
    const viewportRatio = Math.min(el.boundingHeight / el.viewportHeight, 1.5);
    const sizeScore = viewportRatio >= 0.4 ? 5 : viewportRatio >= 0.2 ? 3 : 1;

    // Text richness score
    const wordCount = el.textContent.split(/\s+/).filter(Boolean).length;
    const textScore = wordCount > 20 ? 3 : wordCount > 5 ? 2 : 1;

    // Image presence score
    const hasImage =
      combined.includes('img') || combined.includes('background') || combined.includes('bg-');
    const imageScore = hasImage ? 3 : 0;

    // Section hint match
    let bestHint: { type: SectionType; priority: number } = {
      type: 'generic',
      priority: 0,
    };
    for (const hint of SECTION_HINTS) {
      for (const kw of hint.keywords) {
        if (combined.includes(kw) && hint.priority > bestHint.priority) {
          bestHint = { type: hint.type, priority: hint.priority };
        }
      }
    }

    const totalScore = baseScore + sizeScore + textScore + imageScore + bestHint.priority;

    return {
      ...el,
      sectionType: bestHint.type,
      score: totalScore,
    };
  });

  // Sort by vertical position
  scored.sort((a, b) => a.scrollY - b.scrollY);

  // Merge overlapping candidates
  const merged: typeof scored = [];
  for (const candidate of scored) {
    const last = merged[merged.length - 1];
    if (last && candidate.scrollY < last.scrollY + last.boundingHeight * 0.5) {
      // Overlapping — keep the higher-scored one
      if (candidate.score > last.score) {
        merged[merged.length - 1] = candidate;
      }
    } else {
      merged.push(candidate);
    }
  }

  // Cap at 8 scenes and ensure we have at least 2
  const capped = merged.slice(0, 8);

  // Ensure first section is hero if there's a high-scored header-like element
  if (capped.length > 0 && capped[0].sectionType === 'generic') {
    const heroCandidate = capped.find(
      (s) => s.sectionType === 'hero' || s.sectionType === 'features'
    );
    if (heroCandidate) {
      capped[0].sectionType = 'hero';
    }
  }

  // Ensure last section is CTA
  if (capped.length > 1 && capped[capped.length - 1].sectionType === 'generic') {
    capped[capped.length - 1].sectionType = 'cta';
  }

  return capped.map((c) => ({
    selector: c.className ? `.${c.className.split(' ')[0]}` : c.tagName,
    sectionType: c.sectionType,
    scrollY: c.scrollY,
    viewportHeight: c.viewportHeight,
    textContent: c.textContent.substring(0, 200),
    boundingHeight: c.boundingHeight,
  }));
}

// Build a storyboard from detected sections
export function buildStoryboard(
  sections: DetectedSection[],
  screenshotDir: string,
  totalDurationSec: number
): Scene[] {
  const ANIMATION_MAP: Record<SectionType, AnimationType> = {
    hero: 'zoom-in',
    features: 'pan-right',
    pricing: 'fade-in',
    testimonials: 'zoom-in',
    dashboard: 'scroll-up',
    cta: 'zoom-in',
    generic: 'fade-in',
  };

  const durations = distributeTime(sections.map((s) => s.sectionType), totalDurationSec);

  let timeCursor = 0;
  return sections.map((section, i) => {
    const startTime = timeCursor;
    const endTime = startTime + durations[i];
    timeCursor = endTime;

    return {
      id: `scene-${i + 1}`,
      sectionType: section.sectionType,
      screenshotPath: `${screenshotDir}/scene-${i + 1}.png`,
      startTime: Math.round(startTime * 100) / 100,
      endTime: Math.round(endTime * 100) / 100,
      animation: {
        type: ANIMATION_MAP[section.sectionType],
        intensity: 0.6,
      },
      transition: i === 0 ? 'none' : 'fade',
      metadata: {
        scrollY: section.scrollY,
        viewportHeight: section.viewportHeight,
        elementSelector: section.selector,
        textContent: section.textContent,
      },
    };
  });
}

function distributeTime(types: SectionType[], totalSec: number): number[] {
  const weights: Record<SectionType, number> = {
    hero: 0.25,
    features: 0.2,
    pricing: 0.15,
    testimonials: 0.15,
    dashboard: 0.15,
    cta: 0.1,
    generic: 0.1,
  };

  const raw = types.map((t) => weights[t]);
  const totalWeight = raw.reduce((a, b) => a + b, 0);
  return raw.map((w) => (w / totalWeight) * totalSec);
}
