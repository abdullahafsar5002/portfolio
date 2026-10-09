(function () {
  'use strict';

  document.documentElement.className += ' js';

  /* ==========================================================
     THEME TOGGLE  (dark default, light optional)
     Saved in localStorage; respects system preference on first
     visit; sets data-theme on <html> so CSS can switch instantly.
     ========================================================== */

  var root = document.documentElement;
  var STORE_KEY = 'aa-theme';

  function systemPrefersLight() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  }

  // Dark is the intended default. Only follow the OS if it explicitly
  // asks for light; headless/CI browsers often report light and we do not
  // want the portfolio to silently render as the wrong brand.
  function initialTheme() {
    var saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) { /* ignore */ }
    if (saved === 'dark' || saved === 'light') return saved;
    return systemPrefersLight() ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORE_KEY, theme); } catch (e) { /* private mode */ }
    var btns = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
      btns[i].setAttribute('title',
        theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }
  }

  // Restore saved choice, else use the resolved default.
  applyTheme(initialTheme());

  function wireToggles() {
    var btns = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var cur = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        applyTheme(cur === 'light' ? 'dark' : 'light');
      });
    }
  }

  /* --- keep tab in sync if the OS scheme changes --- */
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: light)');
    var onSchemeChange = function (e) {
      var stored = null;
      try { stored = localStorage.getItem(STORE_KEY); } catch (err) { /* ignore */ }
      if (!stored) applyTheme(e.matches ? 'light' : 'dark');
    };
    if (mq.addEventListener) mq.addEventListener('change', onSchemeChange);
    else if (mq.addListener) mq.addListener(onSchemeChange);
  }

  /* ==========================================================
     FOOTER YEAR
     ========================================================== */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ==========================================================
     REVEAL ON SCROLL
     Guarded: if the observer never fires (headless, odd viewports,
     JS timing), everything is shown anyway. Content must never be
     permanently invisible because an animation did not run.
     ========================================================== */
  var revealables = document.querySelectorAll('[data-reveal]');

  function revealAll() {
    for (var i = 0; i < revealables.length; i++) {
      revealables[i].classList.add('in');
    }
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    for (var i = 0; i < revealables.length; i++) io.observe(revealables[i]);

    // Safety net: nothing may stay hidden.
    setTimeout(function () {
      var still = document.querySelectorAll('[data-reveal]:not(.in)');
      if (still.length) revealAll();
    }, 2500);
  } else {
    revealAll();
  }

  /* ==========================================================
     COUNT STATS UP
     ========================================================== */
  var nums = document.querySelectorAll('[data-count]');

  function run(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    el.textContent = '0';
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = target;
      return;
    }
    var dur = 1100, t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(e.target); io2.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    for (var j = 0; j < nums.length; j++) io2.observe(nums[j]);
  } else {
    for (var j = 0; j < nums.length; j++) run(nums[j]);
  }

  // If the counter never triggers, show the true value anyway.
  setTimeout(function () {
    var pending = document.querySelectorAll('[data-count]');
    for (var k = 0; k < pending.length; k++) {
      var want = pending[k].getAttribute('data-count');
      if (pending[k].textContent !== want) pending[k].textContent = want;
    }
  }, 2600);

  /* ==========================================================
     COMMAND PALETTE  (Ctrl/Cmd + K)
     Real navigation, keyboard driven. Adds the "this is a
     product" signal that a static page cannot.
     ========================================================== */
  var palette, paletteInput, paletteList, paletteItems, paletteIndex;

  var COMMANDS = [
    { label: 'SkyFlame ERP case study',   meta: 'flagship',  href: 'project-skyflame.html' },
    { label: 'Toruk Makto League',        meta: 'case study', href: 'project-toruk-makto.html' },
    { label: 'Z-Lane Broast',             meta: 'case study', href: 'project-z-lane-broast.html' },
    { label: 'Afsar Ali Golf Coaching',   meta: 'case study', href: 'project-golf-coaching.html' },
    { label: 'All work',                  meta: 'section',   href: 'index.html#work' },
    { label: 'Stack',                     meta: 'section',   href: 'index.html#stack' },
    { label: 'Contact',                   meta: 'section',   href: 'index.html#contact' },
    { label: 'Top of page',              meta: 'go to',     href: '#', top: true }
  ];

  var EXTERNAL = [
    { label: 'GitHub profile',       meta: 'external', href: 'https://github.com/whitedevil1566' },
    { label: 'Toruk Makto League',   meta: 'external', href: 'https://torukmaktoleague.com' },
    { label: 'Z-Lane Broast',        meta: 'external', href: 'https://whitedevil1566.github.io/Z-Lane-Broast/' },
    { label: 'Golf Coaching site',   meta: 'external', href: 'https://coach.abdullahafsar.site' }
  ];

  function buildPalette() {
    if (palette) return;

    palette = document.createElement('div');
    palette.className = 'palette';
    palette.setAttribute('role', 'dialog');
    palette.setAttribute('aria-modal', 'true');
    palette.setAttribute('aria-label', 'Command palette');
    palette.innerHTML =
      '<div class="palette-box">' +
        '<div class="palette-head">' +
          '<input class="palette-input" type="text" placeholder="Jump to..." aria-label="Search commands" autocomplete="off" spellcheck="false">' +
          '<kbd>ESC</kbd>' +
        '</div>' +
        '<ul class="palette-list"></ul>' +
        '<div class="palette-foot"><span>Enter to open</span><span><kbd>&uarr;</kbd><kbd>&darr;</kbd> navigate</span></div>' +
      '</div>';
    document.body.appendChild(palette);

    paletteInput = palette.querySelector('.palette-input');
    paletteList = palette.querySelector('.palette-list');

    palette.addEventListener('click', function (e) {
      if (e.target === palette) closePalette();
    });
    paletteInput.addEventListener('input', renderPalette);
    paletteInput.addEventListener('keydown', paletteKeys);
  }

  function allCommands() {
    return COMMANDS.concat(EXTERNAL);
  }

  function renderPalette() {
    var q = paletteInput.value.trim().toLowerCase();
    var matches = allCommands().filter(function (c) {
      return !q || c.label.toLowerCase().indexOf(q) !== -1 || c.meta.indexOf(q) !== -1;
    });
    paletteIndex = 0;
    paletteList.innerHTML = '';

    if (!matches.length) {
      paletteList.innerHTML = '<li class="palette-empty">No match. Try "skyflame", "golf" or "github".</li>';
      return;
    }

    matches.forEach(function (c, i) {
      var li = document.createElement('li');
      li.className = 'palette-item' + (i === 0 ? ' is-sel' : '');
      li.innerHTML = '<span class="pi-label"></span><span class="pi-meta"></span>';
      li.querySelector('.pi-label').textContent = c.label;
      li.querySelector('.pi-meta').textContent = c.meta;
      li.addEventListener('click', function () { go(c); });
      li.addEventListener('mouseenter', function () { selectPalette(i); });
      paletteList.appendChild(li);
    });
    paletteItems = paletteList.querySelectorAll('.palette-item');
  }

  function selectPalette(i) {
    if (!paletteItems || !paletteItems.length) return;
    paletteIndex = Math.max(0, Math.min(i, paletteItems.length - 1));
    for (var j = 0; j < paletteItems.length; j++) {
      paletteItems[j].classList.toggle('is-sel', j === paletteIndex);
    }
    if (paletteItems[paletteIndex].scrollIntoView) {
      paletteItems[paletteIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  function paletteKeys(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); selectPalette(paletteIndex + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); selectPalette(paletteIndex - 1); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      var sel = paletteItems && paletteItems[paletteIndex];
      if (sel) sel.click();
    }
  }

  function openPalette() {
    buildPalette();
    renderPalette();
    palette.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { paletteInput.focus(); paletteInput.select(); }, 30);
  }

  function closePalette() {
    if (!palette) return;
    palette.classList.remove('is-open');
    document.body.style.overflow = '';
    paletteInput.value = '';
  }

  function go(cmd) {
    closePalette();
    if (cmd.top) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (cmd.href.charAt(0) === '#') {
      window.location.href = cmd.href;
    } else if (/^https?:/.test(cmd.href)) {
      window.open(cmd.href, '_blank', 'noopener');
    } else {
      window.location.href = cmd.href;
    }
  }

  document.addEventListener('keydown', function (e) {
    var k = (e.key || '').toLowerCase();
    if ((e.metaKey || e.ctrlKey) && k === 'k') {
      e.preventDefault();
      palette && palette.classList.contains('is-open') ? closePalette() : openPalette();
      return;
    }
    if (e.key === 'Escape' && palette && palette.classList.contains('is-open')) {
      closePalette();
      return;
    }
    // "/" opens the palette too, unless already typing in a field
    if (e.key === '/' && !paletteOpen()) {
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        openPalette();
      }
    }
  });

  function paletteOpen() {
    return palette && palette.classList.contains('is-open');
  }

  /* keyboard hint button */
  var kb = document.querySelector('[data-palette-open]');
  if (kb) kb.addEventListener('click', openPalette);

  /* ==========================================================
     SCROLL PROGRESS BAR
     ========================================================== */
  var bar = document.querySelector('.scroll-progress');
  function updateProgress() {
    if (!bar) return;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.transform = 'scaleX(' + (p / 100) + ')';
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { updateProgress(); ticking = false; });
  }, { passive: true });
  updateProgress();

  /* ==========================================================
     COPY EMAIL TO CLIPBOARD
     ========================================================== */
  var copyBtn = document.querySelector('[data-copy-email]');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-copy-email');
      var done = function () {
        var old = copyBtn.getAttribute('data-label') || copyBtn.textContent;
        copyBtn.setAttribute('data-label', old);
        copyBtn.textContent = 'Copied';
        setTimeout(function () { copyBtn.textContent = old; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, function () { window.location.href = 'mailto:' + email; });
      } else {
        window.location.href = 'mailto:' + email;
      }
    });
  }

  /* ==========================================================
     CONTACT FORM
     ========================================================== */
  var form   = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form && status) {
    wireContactForm(form, status);
  }

  wireToggles();

  /* The form posts to Formspree. A plain POST already works with JavaScript
   off; this upgrades it to fetch() so the page does not reload on success.
   If the endpoint is ever removed, fall back to the email address rather
   than showing a form that cannot send. */
  function wireContactForm(form, status) {
  var endpoint = form.getAttribute('action') || '';
  var fallback = document.getElementById('form-fallback');

  if (!/^https:\/\/formspree\.io\/f\//.test(endpoint)) {
    form.hidden = true;
    if (fallback) {
      fallback.textContent = 'Email me at abdullahafsar2005@gmail.com or use WhatsApp.';
      fallback.hidden = false;
    }
    return;
  }

  if (fallback) fallback.hidden = true;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn = form.querySelector('button');
    btn.disabled = true;
    status.textContent = 'Sending...';
    status.className = 'form-status';

    fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    })
      .then(function (r) {
        if (!r.ok) throw new Error('bad response');
        form.reset();
        status.textContent = 'Sent. I will get back to you shortly.';
        status.className = 'form-status is-accent';
      })
      .catch(function () {
        status.textContent = 'Could not send - email abdullahafsar2005@gmail.com instead.';
        status.className = 'form-status is-error';
      })
      .then(function () { btn.disabled = false; });
  });
}

})();