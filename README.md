# Abdullah Afsar - Portfolio

Static portfolio plus **Code Quest**, a browser-based coding game with
210 levels across four tracks.

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
| `learn/engine.js` | Sandboxed runners for JS, HTML/CSS, SQL, and block logic |
| `learn/levels*.js` | Level data: 60 JS, 50 Logic, 50 HTML/CSS, 50 SQL |

## Notes

- The contact form posts to Formspree.
- The SQL track compiles SQLite in the browser via sql.js from a CDN, so
  that one track needs an internet connection. The other three run fully
  offline.
- Progress is kept in `localStorage`; nothing is sent anywhere.