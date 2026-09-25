#!/usr/bin/env node
// Honesty and safety checks on the built site in dist/ (LLD section 8). Fails with a list of problems.
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const files = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
  const p = path.join(d, e.name);
  e.isDirectory() ? walk(p) : files.push(p);
});
if (!fs.existsSync(dist)) { console.error('✗ dist/ not found. Run npm run build first.'); process.exit(1); }
walk(dist);

const problems = [];
const text = files.filter((f) => /\.(html|css|js|xml|txt|json|svg)$/.test(f));
for (const f of text) {
  const s = fs.readFileSync(f, 'utf8');
  const rel = path.relative(dist, f);
  if (/cheatyfrever@/i.test(s)) problems.push(`${rel}: contains the plain email address`);
  if (/Instagram/i.test(s)) problems.push(`${rel}: mentions Instagram`);
  if (/Junior Manager/i.test(s)) problems.push(`${rel}: contains the HR grade`);
  if (/href=["']#?["']/.test(s)) problems.push(`${rel}: has an empty or "#" link`);
  if (/(fonts\.googleapis|fonts\.gstatic|cdn\.jsdelivr|unpkg\.com|cdnjs|use\.typekit)/i.test(s)) problems.push(`${rel}: requests a font or script CDN`);
  if (/<script[^>]+src=["']https?:/i.test(s)) problems.push(`${rel}: loads an external script`);
  if (/<a [^>]*target=["']_blank["']/.test(s)) {
    for (const m of s.matchAll(/<a [^>]*target=["']_blank["'][^>]*>/g)) {
      if (!/rel=["'][^"']*noopener[^"']*noreferrer|rel=["'][^"']*noreferrer[^"']*noopener/.test(m[0])) problems.push(`${rel}: external link without rel="noopener noreferrer"`);
    }
  }
}
const index = path.join(dist, 'index.html');
const nf = path.join(dist, '404.html');
if (!fs.existsSync(index)) problems.push('index.html is missing');
if (!fs.existsSync(nf)) problems.push('404.html is missing');
if (!fs.existsSync(path.join(dist, '.nojekyll'))) problems.push('.nojekyll is missing');
if (fs.existsSync(index)) {
  const h = fs.readFileSync(index, 'utf8');
  const og = h.match(/property="og:image" content="([^"]+)"/)?.[1] ?? '';
  if (!/^https:\/\//.test(og)) problems.push(`index.html: og:image is not absolute (${og || 'missing'})`);
  if (/<username>|&lt;username&gt;/.test(h)) problems.push('index.html: siteUrl placeholder <username> is in the output');
  if (/class="topo/.test(h) && !/illustrative, not actual architecture/.test(h)) problems.push('index.html: diagram shown without the "illustrative, not actual architecture" caption');
  if (!/<noscript>[^<]*\[at\][^<]*<\/noscript>/.test(h)) problems.push('index.html: <noscript> email fallback missing');
}
if (fs.existsSync(nf) && !/name="robots" content="noindex/.test(fs.readFileSync(nf, 'utf8'))) problems.push('404.html: must always be noindex');
if (!files.some((f) => f.endsWith('.woff2'))) problems.push('no self-hosted .woff2 font files in dist/');

if (problems.length) {
  console.error(`\n✗ check:dist found ${problems.length} problem(s):\n  - ${problems.join('\n  - ')}\n`);
  process.exit(1);
}
console.log(`✓ check:dist passed (${files.length} files checked)`);
