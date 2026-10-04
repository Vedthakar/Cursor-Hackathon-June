// Renders brag.html frame-by-frame to PNGs. Usage: node render.mjs <outDir> [fps] [t1,t2,... for stills]
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
const [outDir, fpsArg, stills] = process.argv.slice(2);
const fps = Number(fpsArg || 30);
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('file://' + path.resolve(path.dirname(new URL(import.meta.url).pathname), 'brag.html'));
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);
const times = stills ? stills.split(',').map(Number) : null;
const dur = await page.evaluate(() => window.DURATION);
const n = times ? times.length : Math.round(dur * fps);
for (let i = 0; i < n; i++) {
  const t = times ? times[i] : i / fps;
  await page.evaluate(t => window.render(t), t);
  await page.screenshot({ path: path.join(outDir, `f${String(i).padStart(5, '0')}.${times ? 'png' : 'jpg'}`), ...(times ? {} : { type: 'jpeg', quality: 92 }) });
}
await browser.close();
