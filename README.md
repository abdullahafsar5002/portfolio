# Abdullah Afsar - Portfolio

Static portfolio plus **Code Quest**, a browser-based coding game with
260 levels across five tracks.

## Deploy

Pure static files. No build step, no dependencies. Any static host works.

```bash
git push                 # GitHub Pages serves the root of main
```

## Layout

| Path | What |
|---|---|
| `index.html` | Home: work, stack, contact |
| `project-*.html` | Four case studies |
| `style.css`, `script.js` | Dark/light theme, command palette, contact form |
| `learn/learn.html` | Track picker, XP and streak |
| `learn/play.html` | Level player |
| `learn/engine.js` | Sandboxed runners for JS, HTML/CSS, SQL, C, and block logic |
| `learn/c-sim.js` | The C interpreter the C track runs on |
| `learn/levels*.js` | Level data: 60 JS, 50 C, 50 Logic, 50 HTML/CSS, 50 SQL |

## Notes

- The contact form posts to Formspree.
- The SQL track compiles SQLite in the browser via sql.js from a CDN, so
  that one track needs an internet connection. The other four run fully
  offline.
- The C track parses and evaluates C in the browser rather than shipping a
  compiler, so it needs no download and no network. It is an interpreter
  for the subset the 50 levels teach, not a full C toolchain.
- Progress is kept in `localStorage`; nothing is sent anywhere.
