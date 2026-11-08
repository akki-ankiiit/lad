# Azure Interiors → Luxury Antonovich Design — Transformation Audit

## 1. Technical foundation (preserved)

| Item | Finding |
| --- | --- |
| Framework / build | React 19 + Vite 7, npm (`package-lock.json`), React Router 7 |
| Animation | GSAP 3 + ScrollTrigger + SplitText/CustomEase, Lenis smooth scroll, Swiper, Lottie — all driven by `src/animations/referenceEngine.js` via `useSiteExperience` |
| Styles | `reference.css` (design tokens, typography, breakpoints 991/767/479), `interactions.css`, `app.css`, `studio.css` |
| Fonts | Adobe Typekit kit `pig8glj` (display/accent) + local Maison Neue Extended — unchanged |
| Colours | `--_colors---*` tokens (navy `#17233b`, brand blue, plum footer) — unchanged |
| Page transitions | GSAP fade in `App.jsx`, preloader arch reveal, footer clip reveal — unchanged |
| Live vs. repo | The live site had one extra section (`section.studio-founders`) missing from the repo. Its markup and CSS were recovered from the live bundle and restored as `CreativeLeadership.jsx`. |

No new libraries were added to the app. Python tooling (Playwright, BeautifulSoup, Requests, Pillow) lives in a git-ignored `.venv`.

## 2. Component mapping

| Azure component | Azure content | Antonovich content |
| --- | --- | --- |
| `HomeHeader` / `Navigation` / `HeaderLogo` | Seal + star symbol, "Selected Projects", "Let's talk" | Official medallion (`logo/antonovich-design-logo-mark.png`), seal text "Luxury Antonovich Design · Architecture & Interiors", "Our Works", "Inquire now" |
| `MenuModal` (×3 → 1 shared) | Home, Projects, Let's talk, Contact | Home, About, Services, Our Works, Portfolio, Inquire Now, Contact (`src/data/navigation.js`) |
| `Preloader` | "Made in Azure Interiors India" | "Architecture · Luxury Antonovich Design · Interiors" |
| `Hero` | Azure Interiors / India, day/night | Luxury Antonovich / *Design*, "Where architecture becomes art", interior/exterior scenes, supporting copy |
| `ArchitecturalTooltips` (hero pins) | 3 material tips | Marble & stone, Thoughtful lighting, Bespoke craftsmanship |
| `CoastalIntroduction` | "Made in India", circle text | "Architecture · Interiors", circle text "Where architecture becomes art" |
| `ThreeReasons` (slider) | 3 reasons | 6 differentiators ("Why choose") — data-driven |
| `CommunityQuote` | Design-philosophy quote | Core brand message |
| `CreativeLeadership` (restored founders) | Two co-founders | Katrina Antonovich — official role & verbatim biography; Katrina & Elena named as on the About page |
| `ConceptAndLocation` | The studio / An Indian Soul / process path | The company (About) / Design Without Borders (markets) / 7-step integrated journey SVG |
| `CoastalPanorama` | "Across India" | "Dubai · Miami · Riyadh" |
| `ResidenceTypes` (slider) | Villas / City homes / Hospitality | Residential / Commercial / Hospitality (Our Works, filter deep links) |
| `ResidenceIntroduction` | Studio statement | "A complete design ecosystem" |
| `Amenities` (tabs) | 5 interior topics | 6 grouped services (8 capability areas) — data-driven |
| `LivingSpaces` | "The space to live in" | "The art of living" — residential spaces gallery |
| `Architecture` | "Our craft" | "Bespoke" — furniture production & showroom |
| `Development` (accordion) | Approach / makers / process / 2026 | Philosophy + 3 verbatim client testimonials |
| `SeaViews` (CTA) | "A home with soul" | "Start your design journey" |
| `Footer` | Raipur phone & address | +971 line, 4 separate regional offices with emails, site links, Instagram |
| `Portfolio` / `ProjectCard` | 12 illustrative "design studies" | 77 verified projects; filters Category / Location / Sort (name) |
| `ProjectPage` | Area, BHK, year | Category, discipline, verified location, source description + link |
| `ContactPageContent` | Single studio | Emails, 4 regional offices, UAE phone line, WhatsApp, showroom photo |
| `CallModal` form | Name, email, phone, project | + Country, project type, location, area, services; mailto fallback |
| `index.html` | Azure metadata | Title/description, OG/Twitter, canonical, JSON-LD (InteriorDesigner + regional departments), official favicon, hero preload |

## 3. Media pipeline

`scripts/scrape_antonovich_assets.py` (one controlled run, cached in `scripts/.cache/`):

- 7 seed pages + 45 category pages + 99 project pages rendered with Playwright (scrolled, lazy loaders triggered; binary requests blocked during crawl).
- Reads `src`, `srcset`, `data-src`, `data-lazy-src`, `data-lazyload`, inline + computed CSS backgrounds, and full-size gallery links.
- Thumbnails are upgraded to originals; WebP at q84, max edge 1800 px; logos kept as PNG.
- SHA-256 + perceptual-hash de-duplication; re-runs never re-download.
- Outputs `public/assets/antonovich/asset-manifest.json`, `projects.json`, and `src/data/antonovich-projects.ts`.

Result: 521 images, 19 duplicates removed, 1 inaccessible image recorded (not replaced). Supplier catalogues (Cappellini, Swarovski, wallpaper brands, etc.) and placeholder pages are excluded from the portfolio; only the founder portrait is kept from the team page.

## 4. Verified vs. original copy

- **Verified (from antonovich-design.com):** contact details, biography, testimonials, markets, project names/locations/descriptions, all photography.
- **Original marketing copy:** headlines ("Where architecture becomes art", etc.), service and differentiator descriptions, 7-step journey presentation (a presentation of capabilities, not a published workflow).
- **Not stated anywhere:** awards, client counts, project years, budgets, areas.

## 5. Open items

- Inquiry backend: set `VITE_CONTACT_ENDPOINT`; without it, the form opens a pre-filled email to info@antonovich-design.com.
- Set `VITE_SITE_URL` (in `.env`) to the production origin for canonical/OG URLs.
- Many source photos carry the company's own watermark; higher-resolution originals would improve the hero and contact images (official files top out at 1800 px; the showroom photo is 799 px).
