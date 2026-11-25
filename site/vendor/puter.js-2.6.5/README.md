# Puter.js 2.6.5, pinned copy

This folder holds one file, `puter.js`, served from this site's own origin so that the demo page's content security policy can say `script-src 'self'`.

| | |
|---|---|
| Package | `@heyputer/puter.js` |
| Version | 2.6.5 (the `latest` tag on npm when copied) |
| Copied | 25 November 2026 |
| Source file | `dist/puter.cjs` inside the npm tarball (the browser bundle, an IIFE) |
| Tarball | https://registry.npmjs.org/@heyputer/puter.js/-/puter.js-2.6.5.tgz |
| Tarball integrity (npm) | `sha512-4cK8qEKy3k7RpkdEfMO5pwLYVTLx6KNgMJrMIYV/aWHsftnqB+5w9fZLDRnxFdDqmWsqPnIJ8tNh6HFDcAZVNw==` |
| Checked | The downloaded tarball's SHA-512 matched the registry's value |
| `puter.js` SHA-384 (SRI) | `sha384-cxUuIyzn+eZySBzLjYzu2EPLDC3wj9mbKTQdeLvXjlhkpHME6nS7DzYsio5hj6U0` |
| Built by Puter | header says "Generated on 2026-10-25 08:22" |

This is not the file served at `https://js.puter.com/v2/`, which is a different, newer and larger build. The demo page loads this copy and nothing from `js.puter.com`.

## Licence

Apache-2.0. The full text is in `LICENSE` here (from https://www.apache.org/licenses/LICENSE-2.0.txt, read 25 November 2026). The npm tarball itself carries no LICENSE or NOTICE file, so the declaration comes from Puter's repository, read on 25 November 2026:

- https://github.com/HeyPuter/puter/blob/main/src/puter-js/package.json: `"license": "Apache-2.0"`.
- https://github.com/HeyPuter/puter/blob/main/src/puter-js/README.md: "## License", "Apache-2.0".

The repository's root `LICENSE.txt` is the GNU Affero General Public License 3.0. It covers the rest of Puter. The `puter.js` package declares its own licence in its own folder, which is the one that applies to this file. The npm package's `package.json` says the same.

If Puter ever changes that declaration, stop serving this copy and load `https://js.puter.com/v2/` instead (sites.a, 25 November 2026).

## Hosts the bundle names

Found by searching the bundle's code and by running it in headless Chromium on 25 November 2026.

- Named in the code: `api.puter.com` (the API), `puter.com` (sign-in and the dashboard), `worker-sandbox.puter.com`, `puter.site`, `puter.work`, `nodejs.puter.site`, `puter-net.b-cdn.net`, `apps.puter.com`, `docs.puter.com`. Of these, only `api.puter.com` and `puter.com` matter to this demo; the rest serve features it does not use.
- Does not name `js.puter.com`: the bundle loads no code from it.
- Run in a clean browser with no click: no network request and nothing written to `localStorage`.
- Run with one click on a button that calls `puter.auth.signIn()`: the page itself requested only the pop-up address on `puter.com`. The pop-up is Puter's page. It loaded scripts from `gui-cdn.puter.com`, Sentry, Plausible and Cloudflare Turnstile, and a favicon from Google, under Puter's own origin and policy.
- Not tested: anything after a completed sign-in. We cannot sign in with a real account. The demo's policy therefore allows `connect-src` to `https://api.puter.com` and `wss://api.puter.com`, and `frame-src` to `https://puter.com`, and nothing else. If a call after sign-in is blocked, the browser console names the host; add it only after reading what it is.
- A search found no `eval(` or `new Function` in the bundle, and the policy has no `unsafe-eval`.

## Updating

Check npm for a newer version at each visit. Update only after reading the changelog, then copy the new `dist/puter.cjs`, record the new version, integrity hashes and date here, regenerate the pages (`node tools/gen/gen.mjs`) so the page's SRI value changes, and re-run `bash tools/check.sh`.
