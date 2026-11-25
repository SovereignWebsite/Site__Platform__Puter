// Shared page content for all five designs. Every fact carries a link to Puter's own docs or repository and the date read.
// Nothing here is invented: where Puter does not say, the page says "not stated".
export const READ = '25 November 2026';
export const NOTICE = "An independent Sovereign Website guide. Not Puter's site.";
export const SITE = 'Puter: LLMs from the browser';
const D = 'https://docs.puter.com';
export const SRC = {
  signin: [D + '/Auth/signIn/', 'Puter docs: auth.signIn()'],
  usage: [D + '/Auth/getMonthlyUsage/', 'Puter docs: auth.getMonthlyUsage()'],
  pays: [D + '/user-pays-model/', 'Puter docs: User-Pays Model'],
  sec: [D + '/security/', 'Puter docs: Security and Permissions'],
  limits: [D + '/rate-limits-and-quotas/', 'Puter docs: Rate Limits and Quotas'],
  chat: [D + '/AI/chat/', 'Puter docs: ai.chat()'],
  models: [D + '/AI/listModels/', 'Puter docs: ai.listModels()'],
  start: [D + '/getting-started/', 'Puter docs: Getting Started'],
  priv: ['https://puter.com/privacy', "Puter's privacy policy"],
  dev: ['https://puter.com/developer-agreement', "Puter's App Developer Agreement"],
  repo: ['https://github.com/HeyPuter/puter', "Puter's repository"],
  or: ['https://openrouter.ai/docs/guides/overview/auth/oauth', "OpenRouter's OAuth PKCE guide"],
  nim: ['https://docs.api.nvidia.com/nim/docs/product', "NVIDIA's NIM FAQ"],
};
export const cite = (k) => `<a class="src" href="${SRC[k][0]}">${SRC[k][1]}</a>, read ${READ}`;
export const e = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// ---- Home: the pieces each design arranges differently ----
export const HOME = {
  title: 'Language models from a web page, with no key and no backend',
  lede: "Puter.js lets a static web page call a language model without an API key in the page and without a server of its own. The visitor signs in with their own Puter account, and that account pays for what they use.",
  action: { href: '/demo/', label: 'Try the demo' },
  actionNote: 'Nothing runs until you press a button, and nothing is billed to this site.',
  steps: [
    ['The page includes Puter.js', 'A script, served from this site as a pinned copy. It holds no key.'],
    ['The visitor presses a button', 'Puter opens a sign-in window. Pop-ups need a user action, so nothing happens on load.'],
    ['Their own account pays', "Usage is charged to the visitor's Puter allowance, not to the site's owner."],
  ],
  three: [
    ['How it works', 'The page, the pop-up and the allowance, step by step.', '/guide/#how'],
    ['Who pays, and limits', "The user-pays model, the free monthly allowance, the rate limits.", '/guide/#limits'],
    ['What is not stated', 'Where prompts go and what Puter does not say. We list the gaps.', '/guide/#gaps'],
  ],
  honest: "This guide is independent. Puter has not reviewed it. Where Puter's own documents are silent, we say so rather than guess.",
};

// ---- Guide ----
export const GUIDE = `
<h1>How Puter.js reaches a model from the browser</h1>
<p class="lede">Every fact below links to Puter's own documents or repository, with the date we read it. Anything we tested ourselves is labelled as ours. Anything Puter does not say is under <a href="#gaps">What is not stated</a>.</p>
<nav class="toc" aria-label="On this page"><ul><li><a href="#how">How it works</a></li><li><a href="#models">Models and features</a></li><li><a href="#pays">Who pays</a></li><li><a href="#limits">Limits</a></li><li><a href="#privacy">Privacy and permissions</a></li><li><a href="#agreement">Developer agreement</a></li><li><a href="#script">The script itself</a></li><li><a href="#gaps">What is not stated</a></li><li><a href="#measured">Not measured</a></li><li><a href="#bridge">A safer pattern</a></li></ul></nav>

<section id="how"><h2>How it works</h2>
<ol>
<li>The page includes Puter.js. Puter documents a script tag and an npm package, <code>@heyputer/puter.js</code> (${cite('start')}).</li>
<li>When the code first needs a cloud service, the visitor is asked to sign in with their Puter account. If they are already signed in, they are not asked again (${cite('sec')}).</li>
<li>Sign-in opens a pop-up window. It must be triggered by a user action such as a click, because browsers block pop-ups that are not (${cite('signin')}).</li>
<li>Once signed in, <code>puter.ai.chat(prompt)</code> returns a completion. The model is chosen with the <code>model</code> option (${cite('chat')}).</li>
</ol>
<p>There is no API key in the page and no backend of ours. Puter says the same of its own model: "No API keys at all" (${cite('pays')}).</p>
<h3>Guest accounts</h3>
<p>The sign-in call has an option, <code>attempt_temp_user_creation</code>, that lets Puter create a temporary user so a visitor can start without signing up. "They can always sign up later" (${cite('signin')}). Puter's rate limits give guests ("anonymous" accounts) their own, lower numbers (${cite('limits')}). Whether a fresh guest can finish a useful task is not something Puter's documents answer, and we have not measured it.</p>
</section>

<section id="models"><h2>Models and features</h2>
<ul>
<li>If no model is named, <code>ai.chat()</code> defaults to <code>gpt-5.4-nano</code>. Puter says more than 500 models are available from providers including OpenAI, Anthropic, Google, Alibaba Cloud, xAI, Mistral and OpenRouter (${cite('chat')}).</li>
<li><code>puter.ai.listModels()</code> returns the models available to the app, with pricing and capability metadata where available. Each has an <code>id</code> and a <code>provider</code> (${cite('models')}).</li>
<li>Options Puter lists for chat include <code>stream</code>, <code>max_tokens</code>, <code>temperature</code> and <code>reasoning_effort</code> (${cite('chat')}).</li>
<li>The same AI budget is shared by chat, images, video, text to speech, speech to text and OCR (${cite('limits')}).</li>
</ul>
<p>Model lists and prices change. This guide does not copy a list; ask <code>listModels()</code> or Puter's model directory for the current one.</p>
</section>

<section id="pays"><h2>Who pays</h2>
<ul>
<li>Under Puter's User-Pays Model, users cover their own cloud and AI usage through their own Puter account. The developer's usage never mixes with theirs (${cite('pays')}).</li>
<li>Every user starts with a free monthly allowance. If it runs out, Puter prompts them to upgrade, or they can do it in their billing settings (${cite('pays')}).</li>
<li>The allowance resets monthly and does not roll over. Purchased credits never expire and are spent after the allowance runs out (${cite('limits')}).</li>
<li>AI is "priced per model" and charged "at real cost". Rates can change (${cite('limits')}).</li>
<li>A request that produced no output is free. A stream that stops early is charged on an estimate of what was streamed (${cite('limits')}).</li>
<li><code>puter.auth.getMonthlyUsage()</code> returns the user's monthly usage. Called from an app, <code>usage</code> and <code>appTotals</code> cover only that app, while <code>allowanceInfo</code> covers the whole account (${cite('usage')}). The <a href="{b}/demo/">demo</a> can show your own result.</li>
</ul>
<p>Puter's docs describe the arrangement as users paying for their own usage. This site therefore does not describe the service as free for visitors.</p>
</section>

<section id="limits"><h2>Limits</h2>
<table><caption>AI request limits, per user and per app (${cite('limits')})</caption>
<thead><tr><th scope="col">Limit</th><th scope="col">Paid</th><th scope="col">Free</th><th scope="col">Guest</th></tr></thead>
<tbody><tr><th scope="row">Requests per 10 seconds</th><td>200</td><td>30</td><td>20</td></tr>
<tr><th scope="row">Concurrent requests</th><td>20</td><td>3</td><td>2</td></tr></tbody></table>
<ul>
<li>A chat completion counts as concurrent until the model finishes, even if the page disconnects, for up to 10 minutes (${cite('limits')}).</li>
<li>Three independent checks can stop a request: usage credit (<code>402 insufficient_funds</code>), rate limit (<code>429 too_many_requests</code>) and storage quota (<code>413</code>) (${cite('limits')}).</li>
<li>Several expensive requests started together reserve their maximum cost first, so later ones can fail with <code>402</code> even when the month's allowance is not spent (${cite('limits')}). Interfaces should not tell users "you have run out" on a <code>402</code> alone.</li>
<li>Limits include inputs: an image inlined in a chat message is capped at 5 MB, for example (${cite('limits')}).</li>
</ul>
</section>

<section id="privacy"><h2>Privacy and permissions</h2>
<h3>What signing in gives the page</h3>
<p>After sign-in an app gets, by default: a folder in the user's cloud storage, its own key-value store, the AI services, and the ability to "create and publish websites on the user's behalf" (${cite('sec')}). An AI button needs only the third. Tell users the rest.</p>
<h3>What Puter's privacy policy says</h3>
<ul>
<li>Its effective date is 18 July 2022 (${cite('priv')}).</li>
<li>Data may be stored, processed and transmitted "in Canada and locations around the world", including outside the user's country (${cite('priv')}).</li>
<li>Puter uses cookies and similar technologies, and uses third parties for hosting, analytics, customer care, marketing, advertising and payments (${cite('priv')}).</li>
<li><strong>Ours, not Puter's:</strong> we searched the policy text on ${READ} for "AI", "artificial" and "model" and found no match. The policy as published does not address prompts, model providers or training.</li>
</ul>
<h3>What we saw when the sign-in window opened</h3>
<p><strong>Tested by us on ${READ}, not stated in Puter's documents.</strong> In a clean headless browser, opening the sign-in window loaded scripts from <code>gui-cdn.puter.com</code>, Sentry, Plausible and Cloudflare Turnstile, and a favicon from Google. That window runs on Puter's own domain, under Puter's own page, not on this site. Our page made no request to any Puter host before the click, and wrote nothing to <code>localStorage</code>.</p>
</section>

<section id="agreement"><h2>The developer agreement</h2>
<p>Puter publishes an App Developer Agreement. It covers "the provision of App Developer Services" through Puter's App Developer Center and the distribution of apps (${cite('dev')}). What it says, in its own terms:</p>
<ul>
<li>Puter may remove an app from its directory or developer centre "at any time and for any reason".</li>
<li>The developer sets the price, if any, that end users are charged for an app.</li>
<li>Fees for the developer services are those on Puter's app-centre page, which Puter "may update from time to time". Changes to the agreement apply when Puter posts them.</li>
<li>Puter's total liability to a developer is capped at fifty dollars. The developer agrees to indemnify Puter against claims arising from the developer's app.</li>
<li>Developers must be at least 18. The agreement is governed by the laws of British Columbia, Canada.</li>
</ul>
<p>The agreement's text speaks of apps submitted to Puter's directory. It does not say whether it applies to a plain website that only includes Puter.js and is never submitted. We do not know, and we do not say.</p>
</section>

<section id="script"><h2>The script itself</h2>
<p>Puter documents loading the script from <code>https://js.puter.com/v2/</code> (${cite('start')}). That address is a floating URL: Puter can change what it serves at any time, and the code runs with full rights on your page. A static page cannot pin it with a subresource integrity hash.</p>
<p>This site instead serves a pinned copy of the npm package <code>@heyputer/puter.js</code> version 2.6.5 from its own origin, checked against the package's published integrity hash. The page's content security policy then allows scripts from this site only. The record is in the README at <code>site/vendor/puter.js-2.6.5/</code> in <a href="https://github.com/SovereignWebsite/Site__Platform__Puter">this site's repository</a>. A pinned copy is a third-party script by design: we did not write it and we update it only on purpose.</p>
<p>The hosts the demo's policy allows besides this site are <code>api.puter.com</code> (the API) and <code>puter.com</code> (sign-in). We found the bundle names these hosts by searching its code and by running it; the full list, and what we have not tested after sign-in, is in the README.</p>
</section>

<section id="gaps"><h2>What is not stated</h2>
<p>Puter's documents we read on ${READ} do not say:</p>
<ul>
<li>How large the free monthly allowance is. The docs say it is "shown in the dashboard".</li>
<li>Which sign-in providers exist. Google is mentioned as an example only (${cite('signin')}).</li>
<li>Which company hosts each model upstream of Puter, how long prompts are kept, or whether they are used for training.</li>
<li>Whether the script can be pinned or checked with an integrity hash. (The npm package can be pinned, as above.)</li>
<li>How guest accounts behave in practice, or how sign-in behaves on every phone or browser.</li>
<li>Whether Puter's App Developer Agreement applies to a plain website that is not submitted to Puter's directory (see above).</li>
<li>Puter's general Terms of Service: we have not read them for this site, so we make no claim about them.</li>
</ul>
<p>An independent review for this site's owner reports several further details, for example that allowance amounts are in microcents and that Puter.js keeps its sign-in token in the page's <code>localStorage</code>. We have not checked those against Puter's documents, so we do not state them as fact here.</p>
</section>

<section id="measured"><h2>Not measured</h2>
<p>This guide and demo were built without completing a real Puter sign-in, so these are open, not answered:</p>
<ul>
<li>The size of the free monthly allowance, and what one answer costs from it.</li>
<li>Whether a fresh guest account can finish a useful task.</li>
<li>How sign-in behaves in Safari, and on iPhone and iPad.</li>
<li>Which hosts the page uses after sign-in. The demo's policy allows <code>api.puter.com</code>, its websocket and <code>puter.com</code>; if more are needed the browser's console will name them.</li>
</ul>
<p>The <a href="{b}/demo/">demo</a> is built so that a person can find these out with their own account.</p>
</section>

<section id="bridge"><h2>A safer pattern: keep the script in its own frame</h2>
<p>If a page holds anything private, such as keys or other people's data, put Puter.js in a small page on a separate origin, embed it in a sandboxed iframe, and pass only the prompt text in and the answer out with <code>postMessage</code>, checking <code>event.origin</code> each way. The sign-in button then lives inside that frame, so the user's click opens the pop-up. This site does not do this: it needs a host of its own, and the demo holds no private data. We describe it as a pattern, not as something we have tested.</p>
</section>
`;

// ---- Compare ----
export const COMPARE = `
<h1>Puter, OpenRouter and NVIDIA as routes to models</h1>
<p class="lede">A short comparison, facts only. It covers one question: can a static page reach a model with the visitor paying, and no key of ours in the page? Sister sites go deeper: <a href="https://openrouter.platform.sovereignweb.site/">the OpenRouter guide</a> is live. An NVIDIA guide is planned and has no address yet.</p>
<div class="table-wrap" tabindex="0" role="region" aria-label="Comparison table">
<table><caption>Three routes, as read or tested on ${READ}</caption>
<thead><tr><th scope="col">Question</th><th scope="col">Puter.js</th><th scope="col">OpenRouter</th><th scope="col">NVIDIA API catalogue</th></tr></thead>
<tbody>
<tr><th scope="row">How the visitor connects</th><td>Signs in to their Puter account in a pop-up (${cite('signin')}).</td><td>OAuth with PKCE, using a code challenge with method S256 (${cite('or')}).</td><td>Not tested by us. A key is needed.</td></tr>
<tr><th scope="row">Who pays</th><td>The visitor, from their Puter allowance (${cite('pays')}).</td><td>The visitor's own OpenRouter account.</td><td>Not applicable to a visitor route.</td></tr>
<tr><th scope="row">Key in the page</th><td>None (${cite('pays')}).</td><td>The OAuth flow returns a key to the browser. Where the page keeps it is the page's choice.</td><td>A key is needed, so it would sit in the page or behind a proxy.</td></tr>
<tr><th scope="row">Browser calls to the API</th><td>Handled by the Puter.js script.</td><td><strong>Tested by us:</strong> a cross-origin preflight to <code>openrouter.ai/api/v1/chat/completions</code> answered <code>access-control-allow-origin: *</code>.</td><td><strong>Tested by us:</strong> a preflight to <code>integrate.api.nvidia.com/v1/chat/completions</code> returned no <code>access-control-*</code> headers, so a browser would block the call.</td></tr>
<tr><th scope="row">Privacy statement on AI</th><td>Policy does not mention AI, as above (${cite('priv')}).</td><td>Not assessed here.</td><td>Describes the catalogue as a place to "build POCs with model APIs" before moving to self-hosting (${cite('nim')}).</td></tr>
</tbody></table></div>
<p>The tests marked "tested by us" were single requests on ${READ} and may change. Re-run them before you rely on them.</p>
<p>What this does not say: which route is best. That depends on what the page holds and who it is for.</p>
`;

// ---- Demo ----
export const DEMO = `
<h1>Demo: ask a model with your own Puter account</h1>
<p class="lede">This page is inert until you press a button. Nothing is billed to this site. Anything you use is charged to your own Puter allowance.</p>
<div class="notebox" role="note"><h2 class="h3">Before you start</h2>
<ul>
<li>The script is a <strong>third-party script by design</strong>: Puter.js 2.6.5, Puter's own npm package, served from this site as a pinned copy. This page's policy allows scripts from this site only.</li>
<li>Signing in opens a Puter window (or a tab, depending on your browser). That window is Puter's page, with Puter's own terms. We do not see your password.</li>
<li>Signing in gives this page a storage folder, a key-value store, AI access and the ability to publish websites on your account (<a href="${SRC.sec[0]}">Puter docs: Security and Permissions</a>, read ${READ}). This demo uses only the AI call and your usage figure.</li>
<li>Type nothing private. Puter's published privacy policy does not say where AI prompts go.</li>
<li>The default model is Puter's own default (<a href="${SRC.chat[0]}">ai.chat() docs</a>, read ${READ}). Your answer will be charged at that model's rate.</li>
</ul></div>
<div class="demo" id="demo" data-state="idle">
<p class="step"><span class="n">1</span> Load the script.</p>
<p><button type="button" id="load">Load Puter.js from this site</button></p>
<p class="step"><span class="n">2</span> Ask. This signs you in with Puter if you are not already.</p>
<p><label for="prompt">Your question</label><br><textarea id="prompt" rows="3" cols="40" maxlength="500">In one sentence, what is a static web page?</textarea></p>
<p><label><input type="checkbox" id="guest"> Try a temporary guest account if I have no Puter account</label></p>
<p><button type="button" id="ask" disabled>Sign in with Puter and ask</button></p>
<p class="step"><span class="n">3</span> Optional: see your allowance.</p>
<p><button type="button" id="usage" disabled>Show my monthly usage</button></p>
<div id="out" role="status" aria-live="polite" tabindex="-1"><p>Waiting. Nothing has run yet.</p></div>
</div>
<noscript><p>This demo needs JavaScript. Without it, nothing runs.</p></noscript>
<h2>What to look for</h2>
<ul>
<li>If a pop-up is blocked, press the button again. Pop-ups need a click.</li>
<li>The usage result is Puter's raw answer. We do not convert its units: Puter's page for it does not give them.</li>
<li>If you see a <code>402</code> error, your balance may be used up, or several costly requests started together. A <code>429</code> means too many requests in a short time (<a href="${SRC.limits[0]}">rate limits</a>).</li>
</ul>
`;

export const PAGES = {
  '': { title: SITE, desc: 'How to reach language models from a static page with Puter.js: the visitor signs in with their own Puter account and pays their own way. No API key, no backend.' },
  guide: { title: 'How it works, limits and privacy', desc: "How Puter.js reaches a language model from the browser: sign-in, the user-pays model, limits, privacy and what Puter does not state. Every fact links to Puter's docs." },
  demo: { title: 'Demo: ask a model with your own Puter account', desc: 'A static demo that loads Puter.js only when you press a button and bills your own Puter allowance, not this site.' },
  compare: { title: 'Puter, OpenRouter and NVIDIA compared', desc: 'A short, facts-only comparison of three routes from a static page to a language model.' },
};
