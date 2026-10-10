/* ============================================================
   A C interpreter that runs in the browser with nothing to download.

   NOT a compiler. It parses a C subset and evaluates it directly, so
   a learner writes real C and sees real output with no toolchain.

   The memory model is the whole design here, and it is deliberately
   different from a "real" machine:

     Every value is a CELL: { t: 'int', v: 5 }
     An array is a cell holding a LIST of cells
     A struct is a cell holding a MAP of cells
     A pointer is simply a reference to another cell

   There are no integer addresses anywhere. That is what makes
   pointers, arrays and structs compose instead of fighting: they
   are all the same thing at different depths.

   Supported: int/long/short/char/float/double/void, variables,
   arrays, pointers, structs, typedef, functions, if/else,
   while, do/while, for, switch, break, continue, return, the usual
   operators, string and char literals, and a slice of <string.h>,
   <stdlib.h> and <math.h>.

   Not supported: the preprocessor beyond skipping directives,
   function pointers, file I/O, variadic user functions. No level
   uses them.
   ============================================================ */
(function (root) {
  'use strict';

  /* ------------------------------------------------------------
     LEXER
     ------------------------------------------------------------ */
  var KEYWORDS = {};
  ('int long short char float double void signed unsigned struct union enum typedef ' +
   'if else while do for return break continue switch case default const static sizeof')
    .split(' ').forEach(function (k) { KEYWORDS[k] = 1; });

  var ESC = { n: '\n', t: '\t', r: '\r', '0': '\0', '\\': '\\', '"': '"', "'": "'", a: '\x07', b: '\b', f: '\f', v: '\v' };

  function lex(src) {
    var i = 0, n = src.length, line = 1, out = [];

    while (i < n) {
      var c = src[i];

      if (c === '\n') { line++; i++; continue; }
      if (c === ' ' || c === '\t' || c === '\r') { i++; continue; }

      if (c === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
      if (c === '/' && src[i + 1] === '*') {
        i += 2;
        while (i < n && !(src[i] === '*' && src[i + 1] === '/')) { if (src[i] === '\n') line++; i++; }
        i += 2;
        continue;
      }
      if (c === '#') { while (i < n && src[i] !== '\n') i++; continue; }

      if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src[i + 1] || ''))) {
        var s = i, flt = false;
        if (c === '0' && /[xX]/.test(src[i + 1] || '')) {
          i += 2;
          while (i < n && /[0-9a-fA-F]/.test(src[i])) i++;
        } else {
          while (i < n && /[0-9]/.test(src[i])) i++;
          if (src[i] === '.') { flt = true; i++; while (i < n && /[0-9]/.test(src[i])) i++; }
          if (/[eE]/.test(src[i] || '')) {
            flt = true; i++;
            if (/[+-]/.test(src[i] || '')) i++;
            while (i < n && /[0-9]/.test(src[i])) i++;
          }
        }
        if (/[uUlLfF]/.test(src[i] || '')) i++;
        var raw = src.slice(s, i);
        out.push({ t: 'num', v: num(raw), flt: flt, line: line });
        continue;
      }

      if (/[A-Za-z_]/.test(c)) {
        var w = i;
        while (i < n && /[A-Za-z0-9_]/.test(src[i])) i++;
        var id = src.slice(w, i);
        if (id === 'NULL') { out.push({ t: 'num', v: 0, line: line }); continue; }
        out.push(KEYWORDS[id] ? { t: 'kw', v: id, line: line } : { t: 'id', v: id, line: line });
        continue;
      }

      if (c === '"') {
        i++;
        var b = '';
        while (i < n && src[i] !== '"') {
          if (src[i] === '\\') { b += ESC[src[i + 1]] !== undefined ? ESC[src[i + 1]] : src[i + 1]; i += 2; }
          else { if (src[i] === '\n') line++; b += src[i++]; }
        }
        i++;
        out.push({ t: 'str', v: b, line: line });
        continue;
      }

      if (c === "'") {
        i++;
        var ch;
        if (src[i] === '\\') { ch = ESC[src[i + 1]] !== undefined ? ESC[src[i + 1]] : src[i + 1]; i += 2; }
        else ch = src[i++];
        if (src[i] === "'") i++;
        out.push({ t: 'num', v: ch.charCodeAt(0), line: line });
        continue;
      }

      var OPS = ['<<=', '>>=', '...', '->', '++', '--', '<<', '>>', '<=', '>=', '==', '!=', '&&', '||',
        '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=',
        '+', '-', '*', '/', '%', '=', '<', '>', '!', '&', '|', '^', '~', '?', ':', ';', ',',
        '(', ')', '[', ']', '{', '}', '.'];
      var op = null;
      for (var k = 0; k < OPS.length; k++) if (src.substr(i, OPS[k].length) === OPS[k]) { op = OPS[k]; break; }
      if (op) { out.push({ t: 'op', v: op, line: line }); i += op.length; continue; }

      throw new Error('unexpected character "' + c + '" on line ' + line);
    }
    out.push({ t: 'eof', v: '', line: line });
    return out;
  }

  function num(raw) {
    var s = raw.replace(/[uUlLfF]+$/, '');
    if (/^0[xX]/.test(s)) return parseInt(s, 16);
    if (/[.eE]/.test(s)) return parseFloat(s);
    return parseInt(s, 10);
  }

  /* ------------------------------------------------------------
     PARSER
     ------------------------------------------------------------ */
  function parse(toks) {
    var p = 0;
    var typedefs = {};
    var structs = {};
    var enums = {};

    function peek(k) { return toks[p + (k || 0)]; }
    function at(t, v) { var x = peek(); return x.t === t && (v === undefined || x.v === v); }
    function atOp(v) { return at('op', v); }
    function atKw(v) { return at('kw', v); }
    function next() { return toks[p++]; }
    function eat(t, v) { if (at(t, v)) { next(); return true; } return false; }
    function expect(t, v) {
      if (!at(t, v)) { var g = peek(); throw new Error('expected "' + (v || t) + '" but found "' + g.v + '" on line ' + g.line); }
      return next();
    }

    var TYPE_KW = ['int', 'long', 'short', 'char', 'float', 'double', 'void', 'signed', 'unsigned', 'struct', 'union', 'enum'];
    function isTypeStart() {
      var x = peek();
      if (x.t === 'kw' && TYPE_KW.indexOf(x.v) !== -1) return true;
      return x.t === 'id' && !!typedefs[x.v];
    }

    /* Array bounds are literals in practice. Note the node kind is "lit". */
    function constVal(node) {
      if (!node) return 0;
      if (node.k === 'lit' || node.k === 'num') return node.v;
      if (node.k === 'bin') return constVal(node.a) + constVal(node.b);
      return 1;
    }

    function parseType() {
      while (atKw('const') || atKw('static') || atKw('extern')) next();
      var base = { kind: 'int' }, ptr = 0;

      if (atKw('struct') || atKw('union')) {
        var kw = next().v;
        var name = at('id') ? next().v : null;
        if (atOp('{')) {
          var fields = parseStructBody();
          if (name) structs[name] = { kind: kw, fields: fields };
          base = { kind: 'struct', name: name };
        } else {
          base = { kind: 'struct', name: name };
        }
      } else if (atKw('enum')) {
        next();
        var en = at('id') ? next().v : null;
        var vals = [];
        if (atOp('{')) {
          next();
          var v = 0;
          while (!atOp('}')) {
            if (at('id')) { var mn = next().v; if (eat('op', '=')) v = constVal(next()); vals.push({ name: mn, value: v }); v++; }
            else next();
            if (!eat('op', ',')) break;
          }
          expect('op', '}');
        }
        if (en) enums[en] = vals;
        base = { kind: 'int' };
      } else if (atKw('int') || atKw('char') || atKw('float') || atKw('double') || atKw('void') ||
                 atKw('long') || atKw('short') || atKw('signed') || atKw('unsigned')) {
        var first = next().v;
        if (first === 'long' || first === 'short' || first === 'signed' || first === 'unsigned') {
          while (atKw('long') || atKw('short') || atKw('signed') || atKw('unsigned') || atKw('int')) next();
          base = { kind: first === 'short' ? 'short' : 'int' };
        } else {
          base = { kind: first };
          while (atKw('long') || atKw('short') || atKw('signed') || atKw('unsigned') || atKw('int')) next();
        }
      } else if (at('id') && typedefs[peek().v]) {
        base = typedefs[next().v];
      }

      while (atOp('*')) { next(); ptr++; }
      return { base: base, ptr: ptr };
    }

    function parseStructBody() {
      expect('op', '{');
      var fields = [];
      while (!atOp('}')) {
        if (at('eof')) throw new Error('unfinished struct');
        var ty = parseType();
        if (eat('op', ';')) continue;
        do {
          var fname = at('id') ? next().v : '_pad';
          while (atOp('[')) { next(); expect('op', ']'); }
          fields.push({ name: fname, type: ty });
        } while (eat('op', ','));
        eat('op', ';');
      }
      expect('op', '}');
      return fields;
    }

    /* --- expressions --- */
    function expr() { return assign(); }

    function assign() {
      var l = ternary();
      var x = peek();
      if (x.t === 'op' && ['=', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<=', '>>='].indexOf(x.v) !== -1) {
        next();
        return { k: 'assign', op: x.v, l: l, r: assign(), line: x.line };
      }
      return l;
    }

    function ternary() {
      var c = binary(0);
      if (atOp('?')) {
        next();
        var a = expr();
        expect('op', ':');
        return { k: 'cond', c: c, a: a, b: assign() };
      }
      return c;
    }

    var PREC = { '||': 1, '&&': 2, '|': 3, '^': 4, '&': 5, '==': 6, '!=': 6,
      '<': 7, '>': 7, '<=': 7, '>=': 7, '<<': 8, '>>': 8, '+': 9, '-': 9, '*': 10, '/': 10, '%': 10 };

    function binary(min) {
      var l = unary();
      for (;;) {
        var x = peek();
        if (x.t !== 'op') break;
        var pr = PREC[x.v];
        if (!pr || pr < min) break;
        next();
        l = { k: 'bin', op: x.v, a: l, b: binary(pr + 1), line: x.line };
      }
      return l;
    }

    function unary() {
      var x = peek();
      if (atOp('!')) { next(); return { k: 'un', op: '!', e: unary() }; }
      if (atOp('-')) { next(); return { k: 'un', op: '-', e: unary() }; }
      if (atOp('+')) { next(); return unary(); }
      if (atOp('~')) { next(); return { k: 'un', op: '~', e: unary() }; }
      if (atOp('&')) { next(); return { k: 'addr', e: unary() }; }
      if (atOp('*')) { next(); return { k: 'deref', e: unary() }; }
      if (atOp('++') || atOp('--')) { next(); return { k: 'pre', op: x.v, e: unary() }; }
      if (atKw('sizeof')) {
        next();
        if (atOp('(') && isTypeStart()) {
          var q = p;
          next();
          var ty = parseType();
          if (atOp(')')) { next(); return { k: 'sizeof', type: ty }; }
          p = q;
        }
        return { k: 'sizeofE', e: unary() };
      }
      return postfix();
    }

    function postfix() {
      var e = primary();
      for (;;) {
        if (atOp('(')) {
          next();
          var args = [];
          if (!atOp(')')) { do { args.push(assign()); } while (eat('op', ',')); }
          expect('op', ')');
          e = { k: 'call', fn: e, args: args, line: e.line };
          continue;
        }
        if (atOp('[')) { next(); var ix = expr(); expect('op', ']'); e = { k: 'index', a: e, b: ix, line: e.line }; continue; }
        if (atOp('.')) { next(); e = { k: 'member', a: e, name: next().v }; continue; }
        if (atOp('->')) { next(); e = { k: 'member', a: { k: 'deref', e: e }, name: next().v }; continue; }
        if (atOp('++') || atOp('--')) { var o = next(); e = { k: 'post', op: o.v, e: e }; continue; }
        break;
      }
      return e;
    }

    function primary() {
      var x = peek();
      if (x.t === 'num') { next(); return { k: 'lit', v: x.v, flt: x.flt, line: x.line }; }
      if (x.t === 'str') { next(); return { k: 'str', v: x.v, line: x.line }; }
      if (atOp('(')) {
        next();
        if (isTypeStart()) {
          var q = p;
          var ct = parseType();
          if (atOp(')')) { next(); return { k: 'cast', type: ct, e: unary() }; }
          p = q;
        }
        var e = expr();
        expect('op', ')');
        return e;
      }
      if (x.t === 'id') { next(); return { k: 'name', v: x.v, line: x.line }; }
      throw new Error('unexpected "' + x.v + '" on line ' + x.line);
    }

    /* --- statements --- */
    function block() {
      expect('op', '{');
      var body = [];
      while (!atOp('}')) {
        if (at('eof')) throw new Error('missing }');
        body.push(stmt());
      }
      expect('op', '}');
      return { k: 'block', body: body };
    }

    function stmt() {
      if (atOp('{')) return block();
      if (atOp(';')) { next(); return { k: 'empty' }; }

      if (atKw('if')) {
        next(); expect('op', '(');
        var c = expr(); expect('op', ')');
        var th = stmt();
        var el = null;
        if (atKw('else')) { next(); el = stmt(); }
        return { k: 'if', c: c, then: th, els: el };
      }
      if (atKw('while')) {
        next(); expect('op', '(');
        var wc = expr(); expect('op', ')');
        return { k: 'while', c: wc, body: stmt() };
      }
      if (atKw('do')) {
        next();
        var db = stmt();
        expect('kw', 'while'); expect('op', '(');
        var dc = expr(); expect('op', ')'); eat('op', ';');
        return { k: 'dowhile', c: dc, body: db };
      }
      if (atKw('for')) {
        next(); expect('op', '(');
        var init = null;
        if (!atOp(';')) init = isTypeStart() ? decl(true) : { k: 'exprs', e: expr() };
        expect('op', ';');
        var cond = atOp(';') ? null : expr();
        expect('op', ';');
        var step = atOp(')') ? null : expr();
        expect('op', ')');
        return { k: 'for', init: init, cond: cond, step: step, body: stmt() };
      }
      if (atKw('switch')) {
        next(); expect('op', '(');
        var sc = expr(); expect('op', ')'); expect('op', '{');
        var cases = [], deflt = null;
        while (!atOp('}')) {
          if (atKw('case')) {
            next(); var cv = ternary(); expect('op', ':');
            cases.push({ test: cv, body: caseBody() });
            continue;
          }
          if (atKw('default')) { next(); expect('op', ':'); deflt = caseBody(); continue; }
          next();
        }
        expect('op', '}');
        return { k: 'switch', c: sc, cases: cases, deflt: deflt };
      }
      if (atKw('break')) { next(); eat('op', ';'); return { k: 'break' }; }
      if (atKw('continue')) { next(); eat('op', ';'); return { k: 'continue' }; }
      if (atKw('return')) {
        next();
        var rv = atOp(';') ? null : expr();
        eat('op', ';');
        return { k: 'return', e: rv };
      }
      if (atKw('typedef')) {
        next();
        var ty = parseType();
        while (at('id')) { typedefs[next().v] = ty.base; if (atOp('[')) { next(); expect('op', ']'); } }
        expect('op', ';');
        return { k: 'empty' };
      }

      if (isTypeStart()) {
        var save = p;
        var d = decl(false);
        if (d) return d;
        p = save;
      }

      var e = expr();
      expect('op', ';');
      return { k: 'exprs', e: e };
    }

    function caseBody() {
      var b = [];
      while (!atOp('}') && !atKw('case') && !atKw('default')) b.push(stmt());
      return b;
    }

    function decl(inFor) {
      var start = p, ty;
      try { ty = parseType(); } catch (e) { p = start; return null; }
      if (!at('id')) { p = start; return null; }

      var items = [];
      for (;;) {
        if (!at('id')) { p = start; return null; }
        var name = next().v;
        var dims = [];
        while (atOp('[')) {
          next();
          var sz = atOp(']') ? 1 : constVal(expr());
          expect('op', ']');
          dims.push(sz);
        }
        /* "int *a, b" means a is a pointer and b is plain int: the stars
           belong to the declarator, not to the type. */
        var star = atOp('*') ? (next(), 1) : 0;
        var varInit = null;
        if (eat('op', '=')) varInit = atOp('{') ? initList() : assign();
        items.push({ name: name, type: { base: ty.base, ptr: ty.ptr + star }, dims: dims, init: varInit });
        if (eat('op', ',')) continue;
        break;
      }
      if (!atOp(';')) { p = start; return null; }
      if (!inFor) expect('op', ';');
      return { k: 'decl', items: items };
    }

    function initList() {
      expect('op', '{');
      var items = [];
      if (!atOp('}')) do { items.push(atOp('{') ? initList() : assign()); } while (eat('op', ','));
      expect('op', '}');
      return { k: 'initlist', items: items };
    }

    /* --- top level --- */
    var globals = [];
    while (!at('eof')) {
      if (eat('op', ';')) continue;
      if (atKw('typedef')) { stmt(); continue; }

      /* struct definition on its own */
      if (atKw('struct') || atKw('union')) {
        var q = p;
        try { parseType(); } catch (e) { p = q; q = null; }
        if (q !== null && atOp(';')) { expect('op', ';'); continue; }
        if (q !== null) p = q;
      }

      var sp = p;
      var fn = tryFunc();
      if (fn) { globals.push(fn); continue; }
      p = sp;

      var gd = decl(false);
      if (gd) { globals.push(gd); continue; }
      p = sp;
      throw new Error('cannot understand "' + peek().v + '" on line ' + peek().line);
    }

    function tryFunc() {
      var start = p, ret;
      try { ret = parseType(); } catch (e) { p = start; return null; }
      if (ret.ptr !== 0) { p = start; return null; }
      if (!at('id')) { p = start; return null; }
      var name = next().v;
      if (!atOp('(')) { p = start; return null; }
      next();
      var params = [];
      if (!atOp(')')) {
        do {
          if (at('id') && !isTypeStart()) params.push({ name: next().v, type: { base: { kind: 'int' }, ptr: 0 } });
else {
            var pt = parseType();
            var pn = at('id') ? next().v : null;
            /* "T a[]" decays to "T *a": the brackets follow the name. */
            while (atOp('[')) { next(); expect('op', ']'); pt = { base: pt.base, ptr: pt.ptr + 1 }; }
            params.push({ name: pn, type: pt });
          }
        } while (eat('op', ','));
      }
      expect('op', ')');
      if (atOp(';')) { next(); return { k: 'fdecl', name: name, params: params }; }
      if (!atOp('{')) { p = start; return null; }
      return { k: 'func', name: name, params: params, body: block() };
    }

    return { globals: globals, structs: structs, typedefs: typedefs };
  }

  /* ------------------------------------------------------------
     VALUES
     Every value is { t, v }. t is a type tag; v is a number, a
     string, an array of cells, or a map of cells for a struct.
     ------------------------------------------------------------ */
  function scalar(t, v) { return { t: t, v: v }; }
  function raw(x) { return (x && typeof x === 'object' && 'v' in x) ? x.v : x; }
  function isNum(x) { return typeof raw(x) === 'number'; }
  function intOf(x) { var v = raw(x); return typeof v === 'number' ? (v | 0) : (parseInt(v, 10) | 0); }
  function floaty(x) { return raw(x) !== raw(x) | 0 ? false : isFloatCell(x); }
  function isFloatCell(x) {
    var t = x && typeof x === 'object' ? x.t : null;
    return t === 'float' || t === 'double';
  }
  function truthy(x) { var v = raw(x); return !(v === 0 || v === false || v == null); }

  function CSim() {}

  CSim.prototype.run = function (source) {
    this.out = '';
    this.steps = 0;
    this.scopes = [{ vars: {} }];
    try {
      var ast = parse(lex(source));
      this.structs = ast.structs;
      this.funcs = {};
      for (var i = 0; i < ast.globals.length; i++) {
        if (ast.globals[i].k === 'func') this.funcs[ast.globals[i].name] = ast.globals[i];
      }
      this.execBlock({ k: 'block', body: ast.globals.filter(function (g) { return g.k !== 'func'; }) });
if (this.funcs.main) this.call('main', []);
      /* A finished program ends at one newline, like a shell shows it. */
      return { ok: true, out: this.lines().join('\n'), lines: this.lines(), error: null };
    } catch (e) {
      return { ok: false, out: this.lines().join('\n'), lines: this.lines(), error: e && e.message ? e.message : String(e) };
    }
  };

  CSim.prototype.tick = function () {
    if (++this.steps > 3000000) throw new Error('Your program ran too long and was stopped. Look for a loop that never ends.');
  };

/* Scopes are a stack, not one property that push/pop overwrite. That
       distinction is what lets a function call another function: the
       inner call must add to the stack, not replace the outer frame. */
CSim.prototype.push = function () { this.scopes.push({ vars: {} }); };
CSim.prototype.pop = function () { this.scopes.pop(); };
CSim.prototype.lookup = function (name) {
    for (var i = this.scopes.length - 1; i >= 0; i--) {
      if (Object.prototype.hasOwnProperty.call(this.scopes[i].vars, name)) return this.scopes[i].vars[name];
    }
    return undefined;
  };
CSim.prototype.declare = function (name, cell) {
    this.scopes[this.scopes.length - 1].vars[name] = cell;
  };

  /* ---------- type helpers ---------- */
  function tag(type) { return type && type.base ? type.base.kind : 'int'; }

  /* Every field of a struct is a cell, including one that holds a pointer.
       Declaring "struct N *next" must therefore record that field as a
       pointer cell, not a plain int, or `p->next` has nothing to follow. */
  function makeStruct(name, structs) {
    var def = structs[name];
    var fields = {};
    if (def) for (var i = 0; i < def.fields.length; i++) {
      var ft = def.fields[i].type;
      fields[def.fields[i].name] = ft.ptr > 0 ? { ptr: null } : zeroFor(ft, structs);
    }
    return { t: 'struct', v: fields, name: name };
  }

  /* A fresh zero of the given type. Structs and arrays get their shape. */
  function zeroFor(type, structs) {
    var k = tag(type);
    if (k === 'struct') return makeStruct(type.base.name, structs);
    return scalar(k, 0);
  }

  /* An array of `count` fresh cells. */
  function makeArray(type, count, structs) {
    var k = tag(type);
    var items = [];
    for (var i = 0; i < count; i++) items.push(zeroFor(type, structs));
    return { t: 'array', v: items, etype: type };
  }

  /* ---------- declarations ---------- */
  CSim.prototype.exec = function (node) {
    this.tick();
    switch (node.k) {
      case 'empty': return null;
      case 'block': return this.execBlock(node);

      case 'decl':
        for (var i = 0; i < node.items.length; i++) this.declareItem(node.items[i]);
        return null;

      case 'exprs':
        this.eval(node.e);
        return null;

      case 'if':
        if (truthy(this.eval(node.c))) return this.exec(node.then);
        return node.els ? this.exec(node.els) : null;

      case 'while':
        while (truthy(this.eval(node.c))) {
          this.tick();
          var r = this.exec(node.body);
          if (r === 'break') break;
          if (r === 'continue') continue;
          if (r) return r;
        }
        return null;

      case 'dowhile':
        do {
          var r2 = this.exec(node.body);
          if (r2 === 'break') break;
          if (r2 && r2 !== 'continue') return r2;
        } while (truthy(this.eval(node.c)));
        return null;

/* The loop variable lives in the loop's own scope, so it is gone once
       the loop ends, as in C. */
      case 'for': {
        this.push();
        try {
          if (node.init) this.exec(node.init);
          for (;;) {
            this.tick();
            if (node.cond && !truthy(this.eval(node.cond))) break;
            var r3 = this.exec(node.body);
            if (r3 === 'break') break;
            if (r3 !== 'continue' && r3) return r3;
            if (node.step) this.eval(node.step);
          }
          return null;
        } finally {
          this.pop();
        }
      }

      case 'switch': {
        var v = intOf(this.eval(node.c));
        var start = -1, i;
        for (i = 0; i < node.cases.length; i++) {
          if (intOf(this.eval(node.cases[i].test)) === v) { start = i; break; }
        }
        if (start === -1 && node.deflt) {
          for (i = 0; i < node.cases.length; i++) if (node.deflt === node.cases[i].body) { start = i; break; }
        }
        if (start === -1) return null;
        for (i = start; i < node.cases.length; i++) {
          var rr = this.execBlock({ k: 'block', body: node.cases[i].body });
          if (rr === 'break') return null;
          if (rr && rr !== 'continue') return rr;
        }
        return null;
      }

      case 'break': return 'break';
      case 'continue': return 'continue';
      /* The return value is wrapped in an object so that returning 0 or null
       is not mistaken for "no return at all". */
      case 'return': return { ret: node.e ? this.eval(node.e) : scalar('int', 0) };
    }
    throw new Error('cannot run this statement');
  };

  /* Every block owns a scope, and the scope is always popped, including
       when a return or break unwinds out of the middle of it. Without
       that, a function parameter would stay visible after it returns
       and a later declaration of the same name would find the old one. */
  CSim.prototype.execBlock = function (node) {
    this.push();
    try {
      for (var i = 0; i < node.body.length; i++) {
        var r = this.exec(node.body[i]);
        if (r) return r;
      }
      return null;
    } finally {
      this.pop();
    }
  };

  CSim.prototype.declareItem = function (it) {
    var type = it.type;
    var total = it.dims.length ? it.dims.reduce(function (a, b) { return a * b; }, 1) : 0;

    if (total > 0) {
      /* char a[] = "text" first: it is the common beginner case */
      if (it.init && it.init.k === 'str' && tag(type) === 'char') {
        var s = it.init.v;
        var chars = [];
        for (var k = 0; k < Math.max(s.length + 1, total); k++) chars.push(scalar('char', k < s.length ? s.charCodeAt(k) : 0));
        this.declare(it.name, { t: 'array', v: chars, etype: type });
        return;
      }
      var arr = this.buildArray(type, it.dims, it.init);
      this.declare(it.name, arr);
      return;
    }

    if (type.ptr > 0) {
      if (it.init && it.init.k === 'str') {
        var txt = it.init.v;
        var cs = [];
        for (var q = 0; q <= txt.length; q++) cs.push(scalar('char', q < txt.length ? txt.charCodeAt(q) : 0));
        this.declare(it.name, { ptr: { t: 'array', v: cs, etype: { base: { kind: 'char' }, ptr: 1 } } });
        return;
      }
      if (it.init) {
        var initVal = this.eval(it.init);
        /* &x already yields {ptr: cell}; do not wrap it twice. A literal 0
           is the null pointer, so keep it as an empty pointer, not a cell. */
        if (initVal && initVal.ptr !== undefined) this.declare(it.name, initVal);
        else if (initVal && initVal.t !== undefined && typeof raw(initVal) === 'number') {
          this.declare(it.name, raw(initVal) === 0 ? { ptr: null } : { ptr: initVal });
        } else this.declare(it.name, { ptr: initVal });
        return;
      }
      this.declare(it.name, { ptr: null });
      return;
    }

    var cell;
    if (tag(type) === 'struct') {
      cell = it.init && it.init.k === 'initlist'
        ? this.buildStruct(type.base.name, it.init)
        : makeStruct(type.base.name, this.structs);
    } else if (it.init && it.init.k === 'initlist') {
      cell = scalar(tag(type), raw(this.eval(it.init.items[0])));
    } else if (it.init) {
      /* eval returns a cell; scalar wants the plain value inside it. */
      cell = scalar(tag(type), raw(this.eval(it.init)));
    } else {
      cell = zeroFor(type, this.structs);
    }
    this.declare(it.name, cell);
  };

  /* Build a nested array cell from a dimension list and an initialiser. */
  CSim.prototype.buildArray = function (type, dims, init, level, arr) {
    if (level === undefined) level = 0;
    var n = dims[level];
    var items = [];

    if (level === dims.length - 1) {
      var src = init ? (init.k === 'initlist' ? init.items : [init]) : null;
      for (var i = 0; i < n; i++) {
        if (!src) items.push(zeroFor(type, this.structs));
        else if (src[i] === undefined) items.push(zeroFor(type, this.structs));
        else items.push(this.scalarFrom(type, src[i]));
      }
    } else {
      var subs = init ? (init.k === 'initlist' ? init.items : null) : null;
      for (var j = 0; j < n; j++) {
        if (subs && subs[j]) items.push(this.buildArray(type, dims, subs[j], level + 1));
        else items.push(this.buildArray(type, dims, init, level + 1));
      }
    }
    return { t: 'array', v: items, etype: type };
  };

  CSim.prototype.scalarFrom = function (type, node) {
    if (tag(type) === 'struct') {
      if (node && node.k === 'initlist') return this.buildStruct(type.base.name, node);
      return makeStruct(type.base.name, this.structs);
    }
    return scalar(tag(type), raw(this.eval(node)));
  };

  CSim.prototype.buildStruct = function (name, init) {
    var def = this.structs[name];
    var cell = makeStruct(name, this.structs);
    if (!def) return cell;
    for (var i = 0; i < def.fields.length; i++) {
      var f = def.fields[i];
      var item = init.items[i];
      if (item === undefined) continue;
      if (f.type.ptr > 0) {
        var pv = this.eval(item);
        cell.v[f.name] = pv && pv.ptr !== undefined ? pv : { ptr: pv };
      } else {
        cell.v[f.name] = this.scalarFrom(f.type, item);
      }
    }
    return cell;
  };

  /* ---------- expressions ---------- */
  CSim.prototype.eval = function (node) {
    this.tick();
    switch (node.k) {
      case 'lit': return scalar(node.flt ? 'double' : 'int', node.v);
      case 'str': {
        var cs = [];
        for (var i = 0; i <= node.v.length; i++) cs.push(scalar('char', i < node.v.length ? node.v.charCodeAt(i) : 0));
        return { ptr: { t: 'array', v: cs, etype: { base: { kind: 'char' }, ptr: 1 } }, asStr: node.v };
      }

      case 'name': {
        var c = this.lookup(node.v);
        if (c !== undefined) return c;
        if (this.funcs[node.v]) return { func: this.funcs[node.v] };
        throw new Error('"' + node.v + '" is not defined');
      }

      case 'cast': return scalar(tag(node.type), raw(this.eval(node.e)));

      /* &x yields a reference to the cell x lives in. That is what makes
       *p = v and &x interchangeable without any address arithmetic. */
      case 'addr': {
        var target = node.e;
        if (target.k === 'name') {
          var c = this.lookup(target.v);
          if (c === undefined) throw new Error('"' + target.v + '" is not defined');
          /* the cell object itself, so writes through it reach the variable */
          return { ptr: c };
        }
        if (target.k === 'index' || target.k === 'member' || target.k === 'deref') {
          return { ptr: this.eval(target) };
        }
        throw new Error('cannot take the address of that');
      }

      case 'deref': return derefAt(this.eval(node.e));

      case 'index': {
        var arr = this.eval(node.a);
        var ix = intOf(this.eval(node.b));
        var target = arr;
        /* an array reached through a pointer still needs unwrapping once */
        if (target && target.ptr !== undefined) {
          /* reached through a pointer: honour any offset it carries */
          var at2 = target.offset || 0;
          var base2 = target.ptr;
          if (base2 && base2.t === 'array') {
            if (ix < 0 || ix + at2 >= base2.v.length) throw new Error('index out of bounds');
            return base2.v[ix + at2];
          }
          target = base2;
        }
        if (!target || target.t !== 'array') throw new Error('that value cannot be indexed');
        if (ix < 0 || ix >= target.v.length) throw new Error('index ' + ix + ' is out of bounds (size ' + target.v.length + ')');
        return target.v[ix];
      }

      case 'member': {
        var st = this.eval(node.a);
        if (st && st.ptr !== undefined) st = st.ptr;
        if (!st || st.t !== 'struct') throw new Error('cannot read "' + node.name + '": that is not a struct');
        if (!Object.prototype.hasOwnProperty.call(st.v, node.name)) throw new Error('a struct here has no field "' + node.name + '"');
        return st.v[node.name];
      }

      case 'bin': return this.binop(node.op, this.eval(node.a), this.eval(node.b));

      case 'un': {
        var e = this.eval(node.e);
        if (node.op === '!') return scalar('int', raw(e) ? 0 : 1);
        if (node.op === '~') return scalar('int', ~intOf(e));
        var r = raw(e);
        return scalar(isFloatCell(e) ? 'double' : 'int', -r);
      }

      case 'cond': return truthy(this.eval(node.c)) ? this.eval(node.a) : this.eval(node.b);

      case 'assign': {
        var target = this.lvalue(node.l);
        this._rhs = node.r;
        var result = this.write(target, node.op);
        this._rhs = null;
        return result;
      }

      case 'pre': case 'post': {
        /* The step is added, never subtracted: -- is "+= -1", so that a
           postfix -- reports the old value the way C does. */
        var step = node.op === '++' ? 1 : -1;
        var sl = this.lvalue(node.e);
        this._rhs = { k: 'lit', v: step, flt: false, line: node.line };
        var after = raw(this.write(sl, '+='));
        this._rhs = null;
        return scalar(sl.t || 'int', node.k === 'pre' ? after : after - step);
      }

      case 'sizeof': return scalar('int', elemSize(node.type));
      case 'sizeofE': return scalar('int', 4);

      case 'call': {
        if (node.fn.k !== 'name') throw new Error('that is not something you can call');
        var args = [];
        for (var i = 0; i < node.args.length; i++) args.push(this.eval(node.args[i]));
        return this.call(node.fn.v, args);
      }
    }
    throw new Error('cannot evaluate this expression');
  };

  function elemSize(type) {
    if (!type) return 4;
    var k = tag(type);
    if (k === 'char') return 1;
    if (k === 'short') return 2;
    if (k === 'double' || k === 'float') return 8;
    return 4;
  }

  /* Writes into a cell and returns the value stored, so a = b = c chains.
       Writing through a pointer means writing the pointed-at cell's v. */
  CSim.prototype.write = function (cell, op) {
    if (!cell) throw new Error('cannot assign to that');
    if (cell.t === 'array') throw new Error('cannot assign to an array');

    if (op === '=') {
      var v = this.eval(this._rhs);
      cell.v = coerce(v, cell.t);
      return cell;
    }

    var bop = op.slice(0, -1);
    var rhs = this.eval(this._rhs);
    var res = this.binop(bop, scalar(cell.t, raw(cell)), rhs);
    cell.v = coerce(res, cell.t);
    return cell;
  };

  /* Returns the cell a store should write into. */
  CSim.prototype.lvalue = function (node) {
    if (node.k === 'name') {
      var c = this.lookup(node.v);
      if (c === undefined) throw new Error('"' + node.v + '" is not defined');
      if (c.ptr !== undefined) {
        if (c.ptr === null) throw new Error('the program used a null pointer');
        throw new Error('"' + node.v + '" is a pointer: assign to what it points at instead');
      }
      return c;
    }
    if (node.k === 'deref') {
      /* *p on the left of =: the destination is the cell p points at,
         so evaluate the dereference, not the pointer itself. */
      return this.eval(node);
    }
    if (node.k === 'index') return this.eval(node);
    if (node.k === 'member') return this.eval(node);
    throw new Error('cannot assign to that');
  };

  CSim.prototype.readTargetValue = function (slot) {
    if (slot && slot.t === 'array') throw new Error('cannot assign to an array');
    return slot;
  };

  function coerce(v, t) {
    var r = raw(v);
    if (t === 'char') return r & 0xff;
    if (t === 'int' || t === 'short' || t === 'long') return r | 0;
    return r;
  }

  /* Scalars compare by value. Only genuine pointers (objects that carry a
       ptr field pointing at another cell) compare by identity. */
  function sameCell(a, b) {
    var aIsPtr = a && typeof a === 'object' && a.ptr !== undefined && a.ptr !== null;
    var bIsPtr = b && typeof b === 'object' && b.ptr !== undefined && b.ptr !== null;
    if (aIsPtr && bIsPtr) return a.ptr === b.ptr;
    return raw(a) === raw(b);
  }

  CSim.prototype.binop = function (op, a, b) {
    var x = raw(a), y = raw(b);
    var flt = isFloatCell(a) || isFloatCell(b);
    var tagOut = flt ? 'double' : 'int';

    switch (op) {
      case '+':
        if (op === '+' && (a && a.ptr !== undefined)) return shiftPtr(a, y);
        return scalar(tagOut, flt ? x + y : (x + y) | 0);
      case '-':
        if (a && a.ptr !== undefined) return shiftPtr(a, -y);
        return scalar(tagOut, flt ? x - y : (x - y) | 0);
      case '*': return scalar(tagOut, flt ? x * y : Math.imul(x | 0, y | 0));
      case '/':
        if (flt) return scalar('double', x / y);
        if ((y | 0) === 0) throw new Error('division by zero');
        return scalar('int', (x | 0) / (y | 0) | 0);
      case '%':
        if ((y | 0) === 0) throw new Error('remainder by zero');
        return scalar('int', (x | 0) % (y | 0) | 0);
      case '<': return scalar('int', x < y ? 1 : 0);
      case '>': return scalar('int', x > y ? 1 : 0);
      case '<=': return scalar('int', x <= y ? 1 : 0);
      case '>=': return scalar('int', x >= y ? 1 : 0);
      case '==': return scalar('int', sameCell(a, b) ? 1 : 0);
      case '!=': return scalar('int', sameCell(a, b) ? 0 : 1);
      case '&&': return scalar('int', (x && y) ? 1 : 0);
      case '||': return scalar('int', (x || y) ? 1 : 0);
      case '&': return scalar('int', (x | 0) & (y | 0));
      case '|': return scalar('int', (x | 0) | (y | 0));
      case '^': return scalar('int', (x | 0) ^ (y | 0));
      case '<<': return scalar('int', (x | 0) << ((y | 0) & 31));
      case '>>': return scalar('int', (x | 0) >> ((y | 0) & 31));
    }
    throw new Error('unsupported operator ' + op);
  };

  /* Pointer arithmetic moves whole elements. The offset rides along with the
       pointer, so *(p + n) and p[n] mean the same cell. */
  function shiftPtr(p, delta) {
    var a = p.ptr;
    if (!a || a.t !== 'array') return { ptr: a, offset: p.offset || 0 };
    return { ptr: a, offset: (p.offset || 0) + delta };
  }

  function derefAt(p) {
    if (!p || p.ptr === undefined || p.ptr === null) throw new Error('the program used a null pointer');
    var target = p.ptr;
    if (target.t !== 'array') return target;
    var at = p.offset || 0;
    if (at < 0 || at >= target.v.length) throw new Error('pointer went past the end of the array');
    return target.v[at];
  }

  /* ---------- functions ---------- */
/* Each call gets its own stack of scopes. Saving and restoring the
       whole stack is what keeps f(g(x)) and f(n-1) + f(n-2) working:
       the inner call must not disturb the outer frame's variables. */
  CSim.prototype.call = function (name, args) {
    if (name === 'printf') return this.printf(args);
    if (name === 'puts') { this.out += String(raw(args[0])) + '\n'; return scalar('int', 0); }
    if (name === 'putchar') { this.out += String.fromCharCode(intOf(args[0]) & 0xff); return scalar('int', intOf(args[0])); }
    if (name === 'strlen') return scalar('int', this.cstr(args[0]).length);
    if (name === 'strcpy') return scalar('int', this.strcpy(args[0], args[1]));
    if (name === 'strcmp') return scalar('int', cmp(this.cstr(args[0]), this.cstr(args[1])));
    if (name === 'strcat') return scalar('int', this.strcat(args[0], args[1]));
    if (name === 'abs') return scalar('int', Math.abs(intOf(args[0])));
    if (name === 'sqrt') return scalar('double', Math.sqrt(raw(args[0])));
    if (name === 'pow') return scalar('double', Math.pow(raw(args[0]), raw(args[1])));
    if (name === 'floor') return scalar('int', Math.floor(raw(args[0])));
    if (name === 'ceil') return scalar('int', Math.ceil(raw(args[0])));
    if (name === 'malloc') return { ptr: makeArray({ base: { kind: 'char' }, ptr: 1 }, intOf(args[0]) || 1, this.structs) };

    var fn = this.funcs[name];
    if (!fn) throw new Error('"' + name + '" is not a function this program knows');

    var saved = this.scopes;
    this.scopes = [{ vars: {} }];
    try {
      for (var i = 0; i < fn.params.length; i++) {
        var p = fn.params[i];
        if (!p.name) continue;
        var a = args[i];
        if (p.type.ptr > 0) {
          this.declare(p.name, a && a.ptr !== undefined ? a : { ptr: a });
        } else {
          /* by value: a fresh cell, so the caller's variable is untouched */
          this.declare(p.name, scalar(tag(p.type), raw(a)));
        }
      }
      var r = this.execBlock(fn.body);
      if (r && r.ret !== undefined && r.ret !== null) return r.ret;
      return scalar('int', 0);
    } finally {
      this.scopes = saved;
    }
  };

  function cmp(a, b) { return a < b ? -1 : a > b ? 1 : 0; }

  CSim.prototype.cstr = function (x) {
    var c = x && x.ptr !== undefined ? x.ptr : x;
    if (!c || c.t !== 'array') return '';
    var s = '';
    for (var i = 0; i < c.v.length; i++) {
      var n = raw(c.v[i]);
      if (!n) break;
      s += String.fromCharCode(n & 0xff);
    }
    return s;
  };

  CSim.prototype.strcpy = function (d, s) {
    var dc = d && d.ptr !== undefined ? d.ptr : d;
    var src = this.cstr(s);
    for (var i = 0; i < dc.v.length; i++) dc.v[i].v = i < src.length ? src.charCodeAt(i) : 0;
    return 0;
  };

  CSim.prototype.strcat = function (d, s) {
    var dc = d && d.ptr !== undefined ? d.ptr : d;
    var cur = this.cstr(d);
    var add = this.cstr(s);
    var full = cur + add;
    for (var i = 0; i < dc.v.length; i++) dc.v[i].v = i < full.length ? full.charCodeAt(i) : 0;
    return 0;
  };

  /* ---------- printf ---------- */
  CSim.prototype.printf = function (args) {
    var fmt = this.cstr(args[0]);
    var ai = 1, used = 0, s = '';

    for (var i = 0; i < fmt.length; i++) {
      if (fmt[i] !== '%') { s += fmt[i]; continue; }
      i++;
      if (fmt[i] === '%') { s += '%'; continue; }

      var spec = '%', left = false, zero = false, plus = false, space = false;
      while ('-+ #0'.indexOf(fmt[i]) !== -1 && fmt[i] !== undefined) {
        if (fmt[i] === '-') left = true;
        if (fmt[i] === '0') zero = true;
        if (fmt[i] === '+') plus = true;
        if (fmt[i] === ' ') space = true;
        spec += fmt[i]; i++;
      }
      var width = '';
      while (/[0-9]/.test(fmt[i] || '')) { width += fmt[i]; i++; }
      var prec = null;
      if (fmt[i] === '.') { prec = ''; i++; while (/[0-9]/.test(fmt[i] || '')) { prec += fmt[i]; i++; } }
      while ('hlLqjzt'.indexOf(fmt[i] || '') !== -1) i++;

      var conv = fmt[i];
      var a = args[ai++];
      used++;
      var v = raw(a);
      var piece;

      switch (conv) {
        case 'd': case 'i':
          piece = String(Math.trunc(isNum(a) ? v : parseFloat(v)));
          if (prec !== null) piece = new Array(Math.max(0, parseInt(prec, 10) - piece.length) + 1).join('0') + piece;
          if (v >= 0 && plus) piece = '+' + piece;
          else if (v >= 0 && space) piece = ' ' + piece;
          break;
        case 'u': piece = String(v >>> 0); break;
        case 'o': piece = (v >>> 0).toString(8); break;
        case 'x': piece = (v >>> 0).toString(16); break;
        case 'X': piece = (v >>> 0).toString(16).toUpperCase(); break;
        case 'c': piece = String.fromCharCode(intOf(a) & 0xff); break;
        case 's': {
          piece = this.cstr(a);
          if (prec !== null) piece = piece.slice(0, parseInt(prec, 10));
          break;
        }
        case 'f': case 'F': piece = Number(v).toFixed(prec === null ? 6 : parseInt(prec, 10)); break;
        case 'e': piece = Number(v).toExponential(prec === null ? 6 : parseInt(prec, 10)); break;
        case 'E': piece = Number(v).toExponential(prec === null ? 6 : parseInt(prec, 10)).toUpperCase(); break;
        case 'g': case 'G': piece = String(Number(Number(v).toPrecision(prec === null ? 6 : parseInt(prec, 10)))); break;
        case 'p': piece = '0x0'; break;
        default: piece = conv || ''; i--;
      }

      var w = parseInt(width || '0', 10);
      if (w > piece.length) {
        var fill = (zero && !left) ? '0' : ' ';
        piece = left ? piece + new Array(w - piece.length + 1).join(' ') : new Array(w - piece.length + 1).join(fill) + piece;
      }
      s += piece;
    }

/* stdout is one stream: append, never split. A newline is just a byte in
       it, exactly as it is in C. */
    this.out += s;
    return scalar('int', used);
  };

  /* The engine shows output as a list of lines, so hand back what it
     expects rather than one blob. */
  CSim.prototype.lines = function () {
    var text = this.out.replace(/\n+$/, '');
    if (text === '') return [];
    return text.split('\n');
  };
/* ---------- entry ---------- */
  function run(source) { return new CSim().run(source); }

  var g = typeof globalThis !== 'undefined' ? globalThis : root;
  g.CSim = CSim;
  g.runCSource = run;

  /* In a worker the engine asks for a job by id and gets the same shape
     back, so a runaway program can be timed out and killed outside. */
  if (typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined') {
    self.onmessage = function (e) {
      var data = e.data || {};
      var r;
      try { r = run(data.source); }
      catch (err) { r = { ok: false, out: '', lines: [], error: String(err && err.message || err) }; }
      self.postMessage({ id: data.id, result: r });
    };
  }
})(typeof self !== 'undefined' ? self : this);