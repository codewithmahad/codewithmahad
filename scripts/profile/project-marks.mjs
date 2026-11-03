import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { out, svg, lettering, introText } from './design.mjs';

// Profile marks for the two completed Android projects.
// Quizzler's Q contour is derived from its existing launcher vector.
const quizQ = "M54,22 C37.4,22 24,35.4 24,52 C24,68.6 37.4,82 54,82 C70.6,82 84,68.6 84,52 C84,35.4 70.6,22 54,22 Z M54,74 C41.3,74 31,63.7 31,51 C31,38.3 41.3,28 54,28 C66.7,28 77,38.3 77,51 C77,63.7 66.7,74 54,74 Z M65,65 L85,85 L89,81 L69,61 Z";

export async function buildProjectMarks(directory = path.join(out, 'projects')) {
  await mkdir(directory, { recursive: true });
  for (const [theme, c] of Object.entries({
    light: { math: '#294d69', curve: '#377eb5', quiz: '#415365', answer: '#bb634b' },
    dark: { math: '#dce8f3', curve: '#4a94e2', quiz: '#ece0c9', answer: '#e4a473' },
  })) {
    const derivify = '<path d="M15 98 C43 100 62 86 80 56 C90 40 94 27 101 20" fill="none" stroke="' + c.curve + '" stroke-width="3.4" stroke-linecap="round"/>'
      + lettering('∂', 13, 92, 98, introText, c.math, -1);
    const quizzler = '<g transform="translate(-15 -12) scale(1.3)">'
      + '<path d="' + quizQ + '" fill="' + c.quiz + '"/>'
      + '<path d="M41 51 L50 60 L66 42" fill="none" stroke="' + c.answer + '" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/>'
      + '</g>';
    await Promise.all([
      writeFile(path.join(directory, 'derivify-' + theme + '.svg'), svg(112, 112, 'Derivify — a partial derivative and a rising curve', derivify)),
      writeFile(path.join(directory, 'quizzler-' + theme + '.svg'), svg(112, 112, 'Quizzler — a Q with a checked answer', quizzler)),
    ]);
  }
}

