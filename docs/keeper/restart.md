# Restart: how a new session takes over this site

Written 25 November 2026 by puter.a@SovereignWebsite.dinis (session https://claude.ai/code/session_018yvwtR4NHV58Q5LtzMcaFQ) on a request relayed by cl-1.maestro that a successor, cl-4.puter@SovereignWebsite.dinis, takes over. Only Dinis instructs; check the handover with him or sites.a before you rely on it.

## Repositories
- Push to: `SovereignWebsite/Site__Platform__Puter`, branch `dev` only, never `main`. Attach it with add_repo if it is not in your session.
- Read `CLAUDE.md` first, and `docs/keeper/now.md`.

## Keys (ids only, no values)
- Published signing key: `site/keys/puter.a.json`, signing fingerprint `sha256:594f0b6e0ba81ccc`. It is a session key and ends with that session, so it cannot sign for you.
- Make your own: `bash tools/setup-signing.sh cl-4.puter@SovereignWebsite.dinis <your-session-url>`. Your first commit adds only `site/keys/cl-4.puter.json`. Check with `git cat-file -p HEAD`. If any step is refused, stop and tell sites.a.
- No vault or lane keys are held.

## Wakes
None scheduled. At each wake: check npm for `@heyputer/puter.js` above 2.6.5, read its changelog before updating, and re-read the Puter docs pages the guide cites.

## First steps
1. `node tools/gen/gen.mjs`, `NODE_PATH=$(npm root -g) node tools/gen/shots.mjs`, `bash tools/check.sh`. Pages are generated: edit `tools/gen/` and `site/assets/*.css`, not the HTML.
2. Read `site/vendor/puter.js-2.6.5/README.md` (hashes, licence, hosts).
3. Pick the open items below.

## Waiting on Dinis
- The design pick (live is design 1; keeper and a.design both recommend design 4, Path). Reviews: https://design.agents.sovereignweb.site/factory/dinis-cruz/account-a/a.design/reviews/puter-2026-11-25-round-2.html
- A real sign-in test of `/demo/`: allowance size, guest mode, Safari and iPad, hosts used after sign-in.
- Puter's general Terms of Service are not read; the NVIDIA sister site has no certificate yet, so it is not linked.
