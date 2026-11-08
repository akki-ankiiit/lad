# Luxury Antonovich Design — Website

Digital portfolio for **Luxury Antonovich Design** (Katrina Antonovich): luxury architecture, interior design and turnkey project execution. Brand, content and photography come from [antonovich-design.com](https://antonovich-design.com).

## Run locally

```bash
npm install
npm run dev        # Vite dev server
npm run build      # Production output in dist/
npm run preview    # Preview the production build
npm test           # Desktop + mobile Playwright checks
```

Node.js 22.12+ recommended. For browser tests run `npx playwright install chromium` once.

## Configuration

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Public origin used for canonical, Open Graph and JSON-LD URLs (`.env`, default `https://antonovich-design.com`). |
| `VITE_CONTACT_ENDPOINT` | Optional JSON `POST` endpoint for the inquiry form (`.env.local`). Without it, the form opens a pre-filled email to info@antonovich-design.com. |

The inquiry payload includes `name`, `email`, `phone`, `country`, `project_type`, `project_location`, `project_area`, `services` (array) and `message`, plus attribution fields.

## Content and media

- `src/data/studio.js` — company details, regional offices, founder biography, services, differentiators and testimonials (verified items are marked in comments).
- `src/data/antonovich-projects.ts` — **generated** portfolio data; do not edit by hand.
- `src/data/navigation.js` — menu and footer links (About, Services and Our Works are homepage sections: `/#about`, `/#services`, `/#works`).
- `public/assets/antonovich/` — official photography, logo and `asset-manifest.json` (source URL, page, category, dimensions, hash, status).

### Refreshing the media

```bash
python3 -m venv .venv
.venv/bin/pip install playwright beautifulsoup4 requests pillow
.venv/bin/python scripts/scrape_antonovich_assets.py            # reuses scripts/.cache
.venv/bin/python scripts/scrape_antonovich_assets.py --refresh  # re-crawl the official site
```

Options: `--projects-per-category`, `--images-per-project`, `--covers-per-category`, `--max-edge`, `--team-limit`. Existing files are never downloaded twice; inaccessible images are recorded in the manifest, not substituted.

See `docs/antonovich-transformation-audit.md` for the component mapping and audit.

## Deployment

Deploy `dist/` to a static host with all routes rewritten to `index.html` (a Netlify-style `_redirects` file is included) so URLs such as `/projects/<slug>` resolve.
