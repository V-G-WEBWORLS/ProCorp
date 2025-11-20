# ProCorp — Static Website

This repository contains a small static website for ProCorp (HTML/CSS/JS).

Quick commands:

- Start a quick local server (requires Node.js):

```powershell
npx http-server -c-1 -p 3000
# then open http://localhost:3000
```

- Build a production `dist/` folder (no external deps required):

```powershell
node build.js
# output will be in ./dist
```

The build script creates `dist/` and writes `styles.min.css`, `script.min.js`, and an updated `index.html` that references the minified assets.
