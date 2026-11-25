// Makes the picker thumbnails at build time, never by hand: Playwright, 390 x 844, scale 1, light, first screen only,
// JPEG about 70 per cent. node tools/gen/shots.mjs  (after node tools/gen/gen.mjs)
import { createRequire } from 'node:module';
const { chromium } = createRequire(process.cwd() + '/')('playwright');
import { createServer } from 'node:http';
import { readFileSync, mkdirSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.json': 'application/json' };
const srv = createServer((q, r) => {
  let p = join('site', decodeURIComponent(q.url.split('?')[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { r.statusCode = 404; r.end(); return; }
  r.setHeader('content-type', types[extname(p)] || 'application/octet-stream'); r.end(readFileSync(p));
}).listen(8123);
mkdirSync('site/assets/designs', { recursive: true });
const b = await chromium.launch();
for (let n = 1; n <= 5; n++) {
  const c = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, colorScheme: n === 2 ? 'dark' : 'light' });
  const p = await c.newPage();
  await p.goto(`http://localhost:8123/designs/d${n}/`); await p.waitForTimeout(300);
  writeFileSync(`site/assets/designs/d${n}.jpg`, await p.screenshot({ type: 'jpeg', quality: 70 }));
  await c.close();
}
await b.close(); srv.close(); console.log('thumbnails written');
