// Generates the live site (design 1) and the five design previews from one content source.
//   node tools/gen/gen.mjs        writes site/index.html, site/{guide,demo,compare}/, site/designs/, and injects the
//                                 picker and the notice into the seeded pages (start, agents, admin, policy).
// Run it, then node tools/gen/shots.mjs for the picker thumbnails, then bash tools/check.sh.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { HOME, GUIDE, COMPARE, DEMO, PAGES, NOTICE, SITE, READ } from './content.mjs';

const HOST = 'https://puter.platform.sovereignweb.site';
const FAMILY = readFileSync('tools/gen/family.html', 'utf8');
const VENDOR = 'vendor/puter.js-2.6.5/puter.js';
const SRI = 'sha384-' + createHash('sha384').update(readFileSync('site/' + VENDOR)).digest('base64');
const w = (f, s) => { mkdirSync(f.replace(/\/[^/]*$/, ''), { recursive: true }); writeFileSync(f, s); };

export const DESIGNS = [
  { n: 1, name: 'Ledger', idea: 'The plain, printable one: a document in one column, with headings and links.', best: 'Reading and printing; fastest to load.', weak: 'Little pull for a first-time visitor.', dark: 'no' },
  { n: 2, name: 'Poster', idea: 'Dark first: one big claim and one big button.', best: 'Getting a visitor to try the demo.', weak: 'Heavy for long reading.', dark: 'yes' },
  { n: 3, name: 'Atlas', idea: 'A map of the topic: side navigation, three entry cards.', best: 'Visitors who know what they want to look up.', weak: 'Busy on a phone.', dark: 'no' },
  { n: 4, name: 'Path', idea: 'A three-step journey drawn as a flow: visitor, Puter, model.', best: 'Explaining who pays, at a glance.', weak: 'Less room for detail on the first screen.', dark: 'no' },
  { n: 5, name: 'Console', idea: 'A status panel first: what runs on load, what is allowed.', best: 'Technical readers who want the facts of the page.', weak: 'Cold for non-technical visitors.', dark: 'no' },
];
const base = (n, live) => (live ? '' : `/designs/d${n}`);
const NAV = [['', 'Home'], ['/guide/', 'Guide'], ['/demo/', 'Demo'], ['/compare/', 'Compare'], ['/start/', 'Start here', true]];

const CSP = (demo) => demo
  ? "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src https://api.puter.com wss://api.puter.com; frame-src https://puter.com; base-uri 'none'; form-action 'none'"
  : "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; base-uri 'none'; form-action 'none'";

function picker(cur, path, live) {
  const cards = DESIGNS.map((d) => {
    const here = cur === d.n && !live;
    return `<li><a href="${base(d.n, false)}${path}"${here ? ' aria-current="page"' : ''}><img src="/assets/designs/d${d.n}.jpg" width="90" height="195" alt="Design ${d.n}, ${d.name}: ${d.idea}"><span class="pn">${d.n}. ${d.name}${d.n === 1 ? ' <em>(live)</em>' : ''}</span><span class="pi">${d.idea}</span></a></li>`;
  }).join('');
  return `<details class="picker"><summary>Choose a design</summary><div class="panel"><p class="pick-line">Not picked yet. The live site uses design 1 meanwhile.</p><ul>${cards}</ul><p><a class="all" href="/designs/">Compare all designs</a></p></div></details>`;
}

function head(page, path, d, live, demo) {
  const pg = PAGES[page];
  const title = page === '' ? SITE : `${pg.title}: ${SITE}`;
  const url = `${HOST}${live ? '' : '/designs/d' + d}${path}`;
  const canon = `${HOST}${path}`;
  const img = `${HOST}/assets/share/card-1200x630.jpg`;
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${CSP(demo)}">
<meta name="color-scheme" content="light dark">
<title>${title}</title>
<meta name="description" content="${pg.desc}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE}">
<meta property="og:locale" content="en_GB">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${pg.desc}">
<meta property="og:image" content="${img}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${SITE}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${pg.desc}">
<meta name="twitter:image" content="${img}">
<link rel="canonical" href="${canon}">${live ? '' : '\n<meta name="robots" content="noindex">'}
<link rel="stylesheet" href="/assets/family.css">
<link rel="stylesheet" href="/assets/picker.css">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/d${d}.css">
</head>`;
}

const fix = (s, b) => s.replace(/\{b\}/g, b).replace(/href="\/(guide|demo|compare)\//g, `href="${b}/$1/`);
const nav = (b, cur, cls) => `<nav class="${cls}" aria-label="This site"><ul>${NAV.map(([h, l, root]) => `<li><a href="${root ? h : b + h + (h ? '' : '/')}"${!root && cur === h ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}</ul></nav>`;
const homeHref = (b) => b + '/';
const brandA = (b) => `<a class="brand" href="${homeHref(b)}">${SITE}</a>`;
const FOOT = (b) => `<footer class="foot"><p class="notice-foot">${NOTICE}</p><p>A sovereign website, made with the <a href="https://sovereignwebsite.org/">open pattern</a>. Source: <a href="https://github.com/SovereignWebsite/Site__Platform__Puter">github.com/SovereignWebsite/Site__Platform__Puter</a>. <a href="/start/">Start here</a> · <a href="/agents/">Use with your AI</a> · <a href="/admin/">How this site was made</a> · <a href="/policy/">How this site is governed</a></p></footer>`;
const noticeBar = (top) => top ? `<aside class="notice" aria-label="About this guide">${NOTICE}</aside>` : `<p class="notice">${NOTICE}</p>`;
const demoScript = (demo) => demo ? '\n<script src="/assets/demo.js"></script>' : '';

// ---- the five layouts: each differs in structure, not only in colour ----
const flowSvg = `<svg class="flow" viewBox="0 0 360 124" width="360" height="124" role="img" aria-labelledby="flowt"><title id="flowt">The visitor's own Puter account pays; this site pays nothing.</title><rect x="0" y="0" width="360" height="124" rx="10" fill="#fffdf8"/><rect x="4" y="30" width="90" height="56" rx="8" fill="#ffffff" stroke="#1f5f4a" stroke-width="2"/><text x="49" y="62" text-anchor="middle" font-size="16" fill="#1d1d1b">Visitor</text><rect x="135" y="30" width="90" height="56" rx="8" fill="#ffffff" stroke="#1f5f4a" stroke-width="2"/><text x="180" y="62" text-anchor="middle" font-size="16" fill="#1d1d1b">Puter</text><rect x="266" y="30" width="90" height="56" rx="8" fill="#ffffff" stroke="#1f5f4a" stroke-width="2"/><text x="311" y="62" text-anchor="middle" font-size="16" fill="#1d1d1b">Model</text><path d="M94 58h41M225 58h41" stroke="#1f5f4a" stroke-width="2" fill="none"/><text x="115" y="20" text-anchor="middle" font-size="14" fill="#1d1d1b">signs in</text><text x="180" y="116" text-anchor="middle" font-size="14" fill="#1d1d1b">their allowance pays</text></svg>`;

function homeBody(d, b) {
  const act = `<p class="act"><a class="button" href="${b}${HOME.action.href}">${HOME.action.label}</a></p><p class="actnote">${HOME.actionNote}</p>`;
  const three = HOME.three.map(([t, x, h]) => `<li><a href="${b}${h}"><strong>${t}</strong><span>${x}</span></a></li>`).join('');
  const steps = HOME.steps.map(([t, x], i) => `<li><span class="num" aria-hidden="true">${i + 1}</span><div><h2>${t}</h2><p>${x}</p></div></li>`).join('');
  if (d === 1) return `<h1>${HOME.title}</h1><p class="lede">${HOME.lede}</p>${act}<h2>Read more</h2><ul class="plainlist">${three}</ul><p class="honest">${HOME.honest}</p>`;
  if (d === 2) return `<div class="hero"><p class="kicker">Puter.js, explained</p><h1>${HOME.title}</h1>${act}</div><p class="lede">${HOME.lede}</p><ul class="cards">${three}</ul><p class="honest">${HOME.honest}</p>`;
  if (d === 3) return `<h1>${HOME.title}</h1><p class="lede">${HOME.lede}</p>${act}<ul class="cards">${three}</ul><p class="honest">${HOME.honest}</p>`;
  if (d === 4) return `<h1>${HOME.title}</h1>${flowSvg}${act}<ol class="steps">${steps}</ol><ul class="plainlist">${three}</ul><p class="honest">${HOME.honest}</p>`;
  return `<h1>${HOME.title}</h1><div class="grid"><aside class="panel-b" aria-label="Facts about this page"><h2>This site, as built</h2><dl><dt>Runs on page load</dt><dd>Nothing</dd><dt>Billed to this site</dt><dd>Nothing</dd><dt>Script source</dt><dd>This site (pinned copy)</dd><dt>Cookies, tracking</dt><dd>None</dd></dl></aside><section class="panel-a"><h2>What this is</h2><p>${HOME.lede}</p>${act}</section></div><ul class="cards">${three}</ul><p class="honest">${HOME.honest}</p>`;
}

function shell(d, page, live) {
  const b = base(d, live);
  const path = page ? `/${page}/` : '/';
  const demo = page === 'demo';
  const raw = page === '' ? homeBody(d, b) : page === 'guide' ? GUIDE : page === 'compare' ? COMPARE : DEMO.replace('id="demo"', `id="demo" data-src="/${VENDOR}" data-integrity="${SRI}"`);
  const body = fix(raw, b);
  const cur = page ? `/${page}/` : '';
  const top = `<a class="skip" href="#main">Skip to content</a>\n${picker(d, path, live)}\n${FAMILY}`;
  const classes = `d${d} p-${page || 'home'}`;
  let layout;
  if (d === 1) layout = `<header class="top">${brandA(b)}${nav(b, cur, 'own')}</header>${noticeBar(1)}<main id="main">${body}</main>${FOOT(b)}`;
  else if (d === 2) layout = `<main id="main">${noticeBar()}${body}</main><header class="top">${brandA(b)}${nav(b, cur, 'own')}</header>${FOOT(b)}`;
  else if (d === 3) layout = `<div class="shell"><header class="side">${brandA(b)}${nav(b, cur, 'own')}${noticeBar()}</header><main id="main">${body}</main></div>${FOOT(b)}`;
  else if (d === 4) layout = `<header class="top">${brandA(b)}</header>${nav(b, cur, 'own')}${noticeBar(1)}<main id="main">${body}</main>${FOOT(b)}`;
  else layout = `<header class="top">${brandA(b)}${nav(b, cur, 'own')}</header><aside class="statusbar" aria-label="About this guide"><span>${NOTICE}</span><span>Read ${READ}</span></aside><main id="main">${body}</main>${FOOT(b)}`;
  return `${head(page, path, d, live, demo)}\n<body class="${classes}">\n${top}\n${layout}${demoScript(demo)}\n</body>\n</html>\n`;
}

// live site = design 1; previews = all five
for (const page of ['', 'guide', 'demo', 'compare']) {
  w(`site/${page ? page + '/' : ''}index.html`, shell(1, page, true));
  for (const d of DESIGNS) w(`site/designs/d${d.n}/${page ? page + '/' : ''}index.html`, shell(d.n, page, false));
}

// ---- /designs/ ----
{
  const row = DESIGNS.map((d) => `<li><a href="/designs/d${d.n}/"><img src="/assets/designs/d${d.n}.jpg" width="195" height="422" alt="Design ${d.n}, ${d.name}: first phone screen. ${d.idea}"><span>${d.n}. ${d.name}</span></a></li>`).join('');
  const rowD = DESIGNS.map((d) => `<li><a href="/designs/d${d.n}/"><img src="/assets/designs/d${d.n}-dark.jpg" width="195" height="422" alt="Design ${d.n}, ${d.name}: first phone screen in dark mode"><span>${d.n}. ${d.name}</span></a></li>`).join('');
  const rows = DESIGNS.map((d) => `<tr><th scope="row">${d.n}. ${d.name}</th><td>${d.idea}</td><td>${d.best}</td><td>${d.weak}</td><td>${d.dark}</td></tr>`).join('');
  const page = 'designs';
  PAGES.designs = { title: 'Choose a design', desc: 'Five design directions for this guide, side by side, with the recommendation and the pick.' };
  const html = `${head(page, '/designs/', 1, true, false).replace('/assets/d1.css', '/assets/d1.css')}
<body class="d1 p-designs">
<a class="skip" href="#main">Skip to content</a>
${picker(1, '/', true)}
${FAMILY}
<header class="top">${brandA('')}${nav('', '', 'own')}</header>${noticeBar(1)}
<main id="main"><h1>Choose a design</h1>
<p class="pick">Not picked yet. The live site uses design 1 meanwhile.</p>
<p>Five directions for the same content. First screens at 390 by 844 pixels, light, taken ${READ}. <a href="#dark">The same row in dark</a>.</p>
<div class="rowbox" tabindex="0" role="region" aria-label="The five first screens, scrolls sideways on a phone"><ul class="shots">${row}</ul></div>
<h2 id="dark">The same five in dark</h2>
<div class="rowbox" tabindex="0" role="region" aria-label="The five first screens in dark mode, scrolls sideways on a phone"><ul class="shots">${rowD}</ul></div>
<h2>The five at a glance</h2>
<p class="actnote">On a phone, swipe the table sideways for more columns.</p>
<div class="table-wrap" tabindex="0" role="region" aria-label="Designs table"><table><caption>Five designs</caption><thead><tr><th scope="col">Design</th><th scope="col">Idea</th><th scope="col">Best for</th><th scope="col">Weakest at</th><th scope="col">Dark first</th></tr></thead><tbody>${rows}</tbody></table></div>
<h2>Who recommends what</h2>
<p>Keeper (puter.a), round 1: design 4, Path. It answers the question a visitor arrives with, "who pays?", before any text, and keeps the single action on the first screen. a.design (rounds 1 and 2, 25 November 2026) agrees: design 4, Path, ready for the owner to pick.</p>
<h2>How to choose</h2>
<ol><li>Does the first screen on a phone say what this site is for?</li><li>Can you reach the demo without hunting?</li><li>Would the owner say "wow"?</li></ol>
<p>Then say which number to keep.</p>
<h2>Rounds</h2>
<p><strong>Round 3 (small), ${READ}:</strong> after a.design's round 2, which verified all five fixes and recommends design 4. Ledger is labelled as the plain, printable one, and the table has a swipe cue.</p>\n<p><strong>Round 2, ${READ}:</strong> after a.design's round 1 review. Path's drawing labels are now 14 px. Atlas shows one row of navigation. Console shows its facts panel first. Poster is dark in both modes. Console's status band stays dark. A dark row of the five is above.</p>
<p><strong>Round 1, ${READ}:</strong> five directions built, all four pages in each. Reviewed by a.design, who recommended design 4 and listed five fixes (above).</p>
</main>${FOOT('')}
</body>
</html>
`;
  w('site/designs/index.html', html);
}

// ---- seeded pages: add the picker and the notice once ----
for (const f of ['start', 'agents', 'admin', 'policy']) {
  const p = `site/${f}/index.html`;
  if (!existsSync(p)) continue;
  let s = readFileSync(p, 'utf8');
  s = s.replace(/<!--picker-->[\s\S]*?<!--\/picker-->\n?/, '').replace(/<link rel="stylesheet" href="\/assets\/(picker|family)\.css">\n?/g, '');
  s = s.replace('</head>', '<link rel="stylesheet" href="/assets/picker.css">\n</head>');
  const blk = `<!--picker-->${picker(0, '/', true)}<aside class="notice" aria-label="About this guide">${NOTICE}</aside><!--/picker-->\n`;
  s = /<a class="skip"[^>]*>[^<]*<\/a>\n?/.test(s) ? s.replace(/(<a class="skip"[^>]*>[^<]*<\/a>\n?)/, `$1${blk}`) : s.replace(/<body([^>]*)>\n?/, (m) => `${m}${blk}`);
  w(p, s);
}
console.log('generated');
