// The demo's only script. Nothing here runs a network call until a button is pressed.
(function () {
  'use strict';
  var box = document.getElementById('demo');
  if (!box) return;
  var out = document.getElementById('out'), load = document.getElementById('load'), ask = document.getElementById('ask'),
    usage = document.getElementById('usage'), prompt = document.getElementById('prompt'), guest = document.getElementById('guest');
  function say(text, pre) {
    out.textContent = '';
    var el = document.createElement(pre ? 'pre' : 'p');
    el.textContent = text; out.appendChild(el);
  }
  function why(e) {
    var c = e && (e.code || (e.error && e.error.code)), m = e && (e.msg || e.message || (e.error && e.error.message));
    return 'That did not work' + (c ? ' (' + c + ')' : '') + (m ? ': ' + m : '') + '. Nothing was charged by this site.';
  }
  function textOf(r) {
    if (typeof r === 'string') return r;
    var c = r && r.message && r.message.content;
    if (typeof c === 'string') return c;
    if (Array.isArray(c)) return c.map(function (x) { return (x && x.text) || ''; }).join('');
    return JSON.stringify(r, null, 2);
  }
  load.addEventListener('click', function () {
    load.disabled = true; say('Loading Puter.js from this site. Nothing has been sent yet.');
    var s = document.createElement('script');
    s.src = box.getAttribute('data-src'); s.integrity = box.getAttribute('data-integrity');
    s.onload = function () {
      if (!window.puter) { say('The script loaded but did not start.'); return; }
      window.puter.quiet = true; ask.disabled = false; usage.disabled = false;
      box.setAttribute('data-state', 'loaded'); say('Puter.js is loaded. Nothing has been sent yet. Step 2 asks Puter to sign you in.');
    };
    s.onerror = function () { load.disabled = false; say('The script did not load.'); };
    document.head.appendChild(s);
  });
  ask.addEventListener('click', function () {
    // signIn() is called straight away, before any await, so the browser lets the pop-up open.
    var q = prompt.value.slice(0, 500), signin;
    try { signin = window.puter.auth.signIn(guest.checked ? { attempt_temp_user_creation: true } : undefined); } catch (e) { say(why(e)); return; }
    say('A Puter window should open (or a tab, depending on your browser). If it did not, press the button again.');
    Promise.resolve(signin).then(function () {
      say('Signed in. Asking the model.');
      return window.puter.ai.chat(q);
    }).then(function (r) { say(textOf(r)); }, function (e) { say(why(e)); });
  });
  usage.addEventListener('click', function () {
    var signin;
    try { signin = window.puter.auth.signIn(guest.checked ? { attempt_temp_user_creation: true } : undefined); } catch (e) { say(why(e)); return; }
    say('Asking Puter for your usage.');
    Promise.resolve(signin).then(function () { return window.puter.auth.getMonthlyUsage(); })
      .then(function (u) { say(JSON.stringify(u, null, 2), true); }, function (e) { say(why(e)); });
  });
})();
