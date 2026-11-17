# HashType website

React (Vite) + React Router. Black theme, IBM Plex Mono + IBM Plex Sans (self-hosted).
Deploys on Vercel from `main`.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # must pass before pushing
npm run preview   # test the production build (refresh any page to check routing)
```

## Where things live

| What | Where |
|---|---|
| Approved copy (source of truth) | `content/*.md` |
| The same copy, as data the site renders | `src/content/*.js` |
| Contact details, domain, nav | `src/content/site.js` |
| Photos | `src/assets/photos/` (see below) |
| Styles and brand tokens | `src/styles.css` |
| Pages / shared components | `src/pages/`, `src/components/` |
| SEO files | `public/robots.txt`, `public/sitemap.xml`, `public/og-image.png` |
| Routing on Vercel | `vercel.json` |

**Changing copy:** edit the `.md` in `content/` first, then mirror the change in the
matching `src/content/*.js` file. Components never contain copy.

## Before launch

1. **Placeholders.** Replace every `[...]` value in `src/content/site.js`, and `[DOMAIN]`
   in `index.html`, `public/robots.txt` and `public/sitemap.xml`. Check with:
   `grep -rn "\[[A-Z_]*\]" src index.html public` → should return nothing.
2. **Photos.** Save each photo into `src/assets/photos/` under the exact name in
   `content/images/images.md` (e.g. `industry-fnb.jpg`). It appears automatically at the
   next build; until then a branded circuit graphic fills the slot.

## Adding a project

Open `src/content/projects.js`, copy an entry in `items`, put it first (newest first),
fill it in and set `publish: true` only once the client allows it and every partner
has agreed to be credited. Mirror it in `content/projects.md`.

## Deploy

Vercel → Add New → Project → import this repo → framework preset **Vite**
(build `npm run build`, output `dist`). Every push to `main` redeploys.
