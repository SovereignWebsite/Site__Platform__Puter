# Learnings

- A strict CSP (`style-src 'self'`) blocks inline styles, including Playwright's addStyleTag. Hide elements with evaluate and the `hidden` attribute in screenshot scripts.
- axe's "region" rule: content outside a landmark fails. A notice outside header or main needs `<aside aria-label>`; inside a landmark use a plain paragraph. A skip link must come before any injected block.
- In dark mode, SVG text with a hard-coded dark fill vanishes. Put the drawing on its own light panel.
- The vendored Puter.js bundle (npm `dist/puter.cjs`) is not the file at js.puter.com/v2/; the bundle makes no request and writes no localStorage on load. The sign-in pop-up is Puter's own page and loads Sentry, Plausible and Cloudflare Turnstile.
- Never glob inside mkdir paths: an unmatched `*` creates a literal folder.
- Link only to addresses that exist at push time: a link to a folder not yet pushed fails the link check.
