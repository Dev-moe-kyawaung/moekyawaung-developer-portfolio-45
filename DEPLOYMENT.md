# Deployment Guide

This project builds to a **single, self-contained HTML file** (via
`vite-plugin-singlefile`), which makes deployment extremely flexible — the
output can be hosted on virtually any static file service.

**Current live deployment:**
[01a04ff1-4207-704a-b042-ac78b44d1695.arena.site](https://01a04ff1-4207-704a-b042-ac78b44d1695.arena.site/)

---

## Build Output

```bash
npm install
npm run build
```

This generates a `dist/` folder containing a single `index.html` with all JS
and CSS inlined. There are no external asset files to configure paths for —
just upload/serve `dist/index.html` (or the full `dist/` folder) as-is.

Preview the production build locally before deploying:

```bash
npm run preview
```

---

## Deployment Options

### 1. GitHub Pages

1. Build the project: `npm run build`
2. Push the contents of `dist/` to a `gh-pages` branch, e.g. using
   [`gh-pages`](https://www.npmjs.com/package/gh-pages):
   ```bash
   npm install --save-dev gh-pages
   npx gh-pages -d dist
   ```
3. In the repo settings, set **Pages** source to the `gh-pages` branch.

### 2. Vercel

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy — Vercel handles the rest automatically on every push to `main`.

### 3. Netlify

1. Import the repo at [app.netlify.com](https://app.netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy.

### 4. Any Static Host

Since the build is a single-file bundle, you can drop `dist/index.html`
directly into:

- Cloudflare Pages
- Firebase Hosting
- An S3 bucket / static website
- Any basic web server (Nginx, Apache, etc.)

No routing configuration, base-path setup, or asset-path rewriting is needed —
the file is fully portable.

---

## Environment / Configuration Notes

- **Node version**: use Node.js 18+ for building.
- **No environment variables** are currently required for the build.
- The build target and plugins are configured in [`vite.config.ts`](./vite.config.ts).

---

## Continuous Deployment (Optional)

To auto-deploy on every push to `main`, connect the repository to Vercel or
Netlify (both support automatic Git-based deployments with zero extra config
beyond the build command/output directory above). For GitHub Pages, a GitHub
Actions workflow can be added to automate the `gh-pages` publish step instead
of running it manually.

---

## Rollbacks

Because the production artifact is a single static file:

- **Vercel/Netlify**: use their dashboard's "Redeploy previous deployment"
  feature.
- **GitHub Pages**: revert the `gh-pages` branch to a prior commit and push.
- **Manual hosting**: keep a copy of the previous `dist/index.html` before
  overwriting, or deploy from a tagged Git commit.

---

## Verifying a Deployment

After deploying, confirm:

- [ ] Page loads with no console errors
- [ ] Hero typewriter animation runs correctly
- [ ] Scroll-triggered section animations fire as expected
- [ ] Site is responsive on mobile/tablet/desktop
- [ ] All icons render (no missing `react-icons` glyphs)
