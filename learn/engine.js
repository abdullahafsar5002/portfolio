/* ============================================================
   CODE QUEST - ENGINE

   Three runners, all sharing one idea:
   the learner's code and the level's checks are evaluated inside the
   SAME function scope, so a check can read whatever the learner just
   declared.

   Two details make that work, and both were bugs first:

   1. Each check is written into the generated script as a LITERAL
      eval, e.g. eval("(greeting === \"hello\")"). Passing a variable
      instead - eval(t.expr) - makes it an INDIRECT eval, which runs in
      global scope where no local binding exists and a bare `return` is
      a syntax error. That is why every check used to come back false.

   2. A check may be written with or without `return`. normaliseCheck
      turns `return a === b` into `(a === b)` and keeps multi
      statement checks as an immediately invoked function. Stripping
      `return` from a multi-statement check and then throwing the value
      away silently produces undefined, i.e. "failed".

   Isolation: a sandboxed iframe with allow-scripts only. No same-origin
   access, no storage, no top navigation. The cost is that an endless loop
   cannot be killed, so obviously-unbounded loops are refused up front by
   hasRunawayLoop().
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'aa-learn-progress-v1';

  /* ============================================================
     PROGRESS
     ============================================================ */
  function blank() {
    return { done: {}, xp: 0, streak: 0, lastDay: '' };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      var p = JSON.parse(raw);
      if (!p || typeof p !== 'object') return blank();
      return { done: p.done || {}, xp: p.xp || 0, streak: p.streak || 0, lastDay: p.lastDay || '' };
    } catch (e) { return blank(); }
  }

  var state = load();

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }

  function bumpStreak() {
    var today = new Date().toISOString().slice(0, 10);
    if (state.lastDay === today) return;
    var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    state.streak = state.lastDay === yesterday ? state.streak + 1 : 1;
    state.lastDay = today;
  }

  /* A level opens once the previous one in the same track is done. */
  function isUnlocked(trackId, index) {
    if (index === 0) return true;
    var levels = TRACKS[trackId].levels;
    return !!state.done[levels[index - 1].id];
  }

  function trackProgress(trackId) {
    var levels = TRACKS[trackId].levels;
    var done = 0;
    for (var i = 0; i < levels.length; i++) if (state.done[levels[i].id]) done++;
    return { done: done, total: levels.length };
  }

  function complete(trackId, levelId, xp) {
    if (state.done[levelId]) return false;
    state.done[levelId] = 1;
    state.xp += xp;
    bumpStreak();
    save();
    return true;
  }

  function totalXpEarned() {
    var total = 0;
    Object.keys(TRACKS).forEach(function (t) {
      TRACKS[t].levels.forEach(function (l) { if (state.done[l.id]) total += l.xp; });
    });
    return total;
  }

  /* ============================================================
     CHECK NORMALISATION
     ============================================================ */
  function normaliseCheck(src) {
    var s = String(src).trim();
    s = s.replace(/;+\s*$/, '');

    if (s.indexOf(';') === -1) {
      /* single expression: an optional leading `return` is removed and
         the value is the expression itself */
      s = s.replace(/^return\s+/, '');
      return '(' + s + ')';
    }

    /* several statements: `return` must stay, and a top-level return is
       only legal inside a function */
    return '(function(){' + s + '})()';
  }

  /* JSON for embedding a value as a JS string literal in generated
     source. Only the characters JSON leaves dangerous are escaped. */
  function jsonAttr(obj) {
    return JSON.stringify(obj)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029');
  }

  /* Builds the __run(...) lines. Each call embeds the check source as a
     literal so the eval inside it stays direct. */
  function checkLines(tests) {
    return tests.map(function (t) {
      return '__run(' + jsonAttr(t.name) + ', ' + jsonAttr(t.fail) + ', ' +
             'eval(' + jsonAttr(normaliseCheck(t.code)) + '));';
    }).join('\n');
  }

  /* ============================================================
     SANDBOX
     ============================================================ */
  function makeFrame(html, timeoutMs) {
    return new Promise(function (resolve, reject) {
      var iframe = document.createElement('iframe');
      iframe.setAttribute('sandbox', 'allow-scripts');
      iframe.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;border:0;left:-9999px';
      iframe.srcdoc = html;

      var settled = false;
      var timer = setTimeout(function () {
        if (settled) return;
        settled = true;
        cleanup();
        reject(new Error('The page did not respond in time. Reload and try again.'));
      }, timeoutMs || 15000);

      function cleanup() {
        clearTimeout(timer);
        window.removeEventListener('message', onMsg);
        if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
      }

      function onMsg(e) {
        if (settled) return;
        if (e.source !== iframe.contentWindow) return;
        settled = true;
        cleanup();
        resolve(e.data);
      }

      window.addEventListener('message', onMsg);
      document.body.appendChild(iframe);
    });
  }

  /* Wraps a body in a minimal document with top-level error trapping. */
  function wrap(body) {
    return '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>' +
      '<script>' +
      'window.addEventListener("error",function(e){' +
      '  parent.postMessage({type:"crash",message:String(e && e.message || e),out:[]},"*");' +
      '});' +
      '<\/script>' +
      '<script>try{' + body +
      '}catch(__e){' +
      '  parent.postMessage({type:"crash",message:String(__e && __e.message || __e),out:[]},"*");' +
      '}' +
      '<\/script></body></html>';
  }

  /* Refuses code that would freeze the iframe, since an iframe has no
     kill switch the way a Worker would. */
  function hasRunawayLoop(code) {
    var src = String(code);
    if (/for\s*\(\s*;\s*;\s*\)/.test(src)) {
      return 'This for loop has no stopping point.';
    }
    var alwaysTrue = src.match(/while\s*\(\s*(true|1)\s*\)|;\s*(true|1)\s*;\s*\)/g);
    if (alwaysTrue && !/\bbreak\b/.test(src)) {
      return 'This loop never ends.';
    }
    return null;
  }

  /* ============================================================
     JS RUNNER
     ============================================================ */
  function runJs(code, tests, opts) {
    opts = opts || {};
    var loopError = hasRunawayLoop(code);
    if (loopError) {
      return Promise.resolve({
        ok: false, crash: loopError + ' Give it a condition that eventually stops, or add a break.',
        out: [], results: []
      });
    }

    /* Levels marked async use promises or setTimeout, so their checks must
       run after those callbacks fire rather than immediately. The sandbox
       therefore waits a short settle window before checking. */

    var body =
      'var __out = [];\n' +
      'function __log() {\n' +
      '  __out.push(Array.prototype.map.call(arguments, function (a) {\n' +
      '    try { return (a !== null && typeof a === "object") ? JSON.stringify(a) : String(a); }\n' +
      '    catch (e) { return String(a); }\n' +
      '  }).join(" "));\n' +
      '}\n' +
      'var console = { log: __log, info: __log, warn: __log, error: __log, debug: __log };\n' +
      'var out = __out;\n' +
      'var __results = [];\n' +
      'function __run(name, fail, value) {\n' +
      '  __results.push({ name: name, pass: !!value, fail: fail, err: null });\n' +
      '}\n' +
      'function __finish() {\n' +
      '  parent.postMessage({ type: "result", results: __results, out: __out }, "*");\n' +
      '}\n' +
      code + '\n' +
      checkLines(tests) + '\n' +
      (opts.async
        ? 'setTimeout(__finish, 300);'
        : '__finish();');

    return makeFrame(wrap(body)).then(function (d) {
      if (d.type === 'crash') return { ok: false, crash: d.message, out: [], results: [] };
      return { ok: true, results: d.results || [], out: d.out || [] };
    }, function (e) {
      return { ok: false, crash: e.message, out: [], results: [] };
    });
  }

  /* ============================================================
     HTML / CSS RUNNER
     ============================================================ */
  function runWeb(code, checks) {
    var body =
      'document.body.innerHTML = ' + jsonAttr(code) + ';\n' +
      'var doc = document.body;\n' +
      'var getComputedStyle = window.getComputedStyle.bind(window);\n' +
      'var __results = [];\n' +
      'function __run(name, fail, value) {\n' +
      '  __results.push({ name: name, pass: !!value, fail: fail, err: null });\n' +
      '}\n' +
      checkLines(checks) + '\n' +
      'parent.postMessage({ type: "result", results: __results, html: ' + jsonAttr(code) + ' }, "*");';

    return makeFrame(wrap(body)).then(function (d) {
      if (d.type === 'crash') return { ok: false, crash: d.message, results: [] };
      return { ok: true, results: d.results || [], html: d.html };
    }, function (e) {
      return { ok: false, crash: e.message, results: [] };
    });
  }

  /* ============================================================
     SQL RUNNER - real SQLite compiled to WebAssembly, in the sandbox
     ============================================================ */
  var DB_SQL = [
    "CREATE TABLE departments (id INTEGER, name TEXT);",
    "INSERT INTO departments VALUES (1,'Engineering'),(2,'Sales'),(3,'Accounts');",
    "CREATE TABLE employees (id INTEGER, name TEXT, role TEXT, salary INTEGER, dept_id INTEGER);",
    "INSERT INTO employees VALUES",
    "(1,'Ali','Engineer',95000,1),",
    "(2,'Sara','Engineer',88000,1),",
    "(3,'Bilal','Manager',120000,3),",
    "(4,'Hina','Sales',72000,2),",
    "(5,'Usman','Sales',68000,2);",
    "CREATE TABLE projects (id INTEGER, title TEXT);",
    "INSERT INTO projects VALUES (1,'SkyFlame'),(2,'Toruk');"
  ].join('');

  var SQLJS = 'https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/';

  function runSql(code, checks) {
    var html =
      '<!DOCTYPE html><html><head><meta charset="utf-8">' +
      '<script src="' + SQLJS + 'sql-wasm.js"><\/script>' +
      '</head><body><script>' +
      'var __code = ' + jsonAttr(code) + ';\n' +
      'var __ddl = ' + jsonAttr(DB_SQL) + ';\n' +
      'if (typeof initSqlJs !== "function") {' +
      '  parent.postMessage({ type:"crash", message:"The SQLite engine did not load. This level needs an internet connection." }, "*");' +
      '} else {' +
      '  initSqlJs({ locateFile: function(f){ return "' + SQLJS + '" + f; } }).then(function(SQL){' +
      '    try {' +
      '      var db = new SQL.Database();\n' +
      '      db.run(__ddl);\n' +
      '      db.run(__code);\n' +
      '      var res = db.exec(__code);\n' +
      '      var rows = [], cols = [];\n' +
      '      if (res && res.length) {\n' +
      '        cols = res[0].columns;\n' +
      '        var data = res[0].values;\n' +
      '        for (var r=0;r<data.length;r++){ var o={}; for(var c=0;c<cols.length;c++){ o[cols[c]] = data[r][c]; } rows.push(o); }\n' +
      '      }\n' +
      /* Helpers so levels can ask about tables the learner created. */
      '      function tableExists(n){ var s=db.exec("SELECT name FROM sqlite_master WHERE type=\'table\' AND name=\'" + n + "\'"); return !!(s && s.length && s[0].values.length); }\n' +
      '      function colType(t,c){ try { var s=db.exec("PRAGMA table_info(" + t + ")"); for(var i=0;i<s[0].values.length;i++){ if(s[0].values[i][1]===c) return s[0].values[i][2]; } } catch(e){} return null; }\n' +
      '      function countRows(t){ try { var s=db.exec("SELECT COUNT(*) FROM " + t); return s[0].values[0][0]; } catch(e){ return -1; } }\n' +
      '      function cell(t,id,c){ try { var s=db.exec("SELECT " + c + " FROM " + t + " WHERE id = " + id); return s[0].values.length ? s[0].values[0][0] : null; } catch(e){ return null; } }\n' +
      '      function rowCount(t){ try { var s=db.exec("SELECT COUNT(*) FROM " + t); return s[0].values[0][0]; } catch(e){ return -1; } }\n' +
      '      var sql = __code;\n' +
      '      var __results = [];\n' +
      '      function __run(name, fail, value) {\n' +
      '        __results.push({ name: name, pass: !!value, fail: fail, err: null });\n' +
      '      }\n' +
      checkLines(checks) + '\n' +
      '      parent.postMessage({ type:"result", rows:rows, results:__results }, "*");\n' +
      '    } catch(e){ parent.postMessage({ type:"crash", message:String(e && e.message || e) }, "*"); }\n' +
      '  }).catch(function(e){ parent.postMessage({ type:"crash", message:"SQLite failed to start: " + e }, "*"); });\n' +
      '}\n' +
      '<\/script></body></html>';

    return makeFrame(html, 20000).then(function (d) {
      if (d.type === 'crash') return { ok: false, crash: d.message, rows: [], results: [] };
      return { ok: true, rows: d.rows || [], results: d.results || [] };
    }, function (e) {
      return { ok: false, crash: e.message, rows: [], results: [] };
    });
  }

  /* ============================================================
     LOGIC RUNNER - interprets the block sequence the player built
     ============================================================ */
  function runLogic(sequence) {
    var vars = {};
    var out = [];
    var trace = [];

    function num(v) {
      if (v === null || v === undefined) return 0;
      if (typeof v === 'object') {
        if (v.kind === 'var') return Number(vars[v.name]) || 0;
        v = v.value;
      }
      var n = Number(v);
      return isNaN(n) ? 0 : n;
    }

    sequence.forEach(function (item) {
      switch (item.kind) {
        case 'set':
          vars[item.name] = num(item.value);
          trace.push(item.name + ' = ' + vars[item.name]);
          break;
        case 'add':
          vars[item.name] = (Number(vars[item.name]) || 0) + num(item.by);
          trace.push(item.name + ' = ' + vars[item.name]);
          break;
        case 'print':
          out.push(String(item.value));
          break;
        case 'printvar':
          out.push(String(vars[item.name]));
          break;
        case 'if':
          var l = Number(vars[item.left]) || 0;
          var r = Number(item.right) || 0;
          trace.push('if (' + l + ' > ' + r + ') = ' + (l > r));
          break;
        case 'repeat':
          var n = Math.min(50, Math.max(0, num(item.count)));
          for (var i = 0; i < n; i++) out.push(String(item.value));
          break;
        case 'foreach':
          (item.items || []).forEach(function (v) { out.push(String(v)); });
          break;
      }
    });

    return Promise.resolve({ ok: true, out: out, vars: vars, trace: trace });
  }

  /* ============================================================ */
  window.LearnEngine = {
    get state() { return state; },
    save: save,
    isUnlocked: isUnlocked,
    trackProgress: trackProgress,
    complete: complete,
    totalXpEarned: totalXpEarned,
    runJs: runJs,
    runWeb: runWeb,
    runSql: runSql,
    runLogic: runLogic,
    reset: function () { state = blank(); save(); }
  };
})();