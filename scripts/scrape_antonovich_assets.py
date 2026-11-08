#!/usr/bin/env python3
"""
Scrape authentic media and project metadata from the official Luxury Antonovich
Design website (https://antonovich-design.com) in one controlled run.

Pipeline
  1. Render seed pages with Playwright, scroll to trigger lazy loading, and
     collect every image candidate (src, srcset, data-src, data-lazy-src,
     data-lazyload, inline + computed CSS background images).
  2. Discover category pages from "Our Works" and the homepage.
  3. Render each category page and read its project cards (title + cover).
  4. Render project pages (capped per category) and read title, description
     and full-size gallery images.
  5. Download each unique URL once, de-duplicate by SHA-256 and a perceptual
     average hash, convert photographs to WebP, and write a manifest.

Outputs
  public/assets/antonovich/<folder>/<descriptive-name>.webp
  public/assets/antonovich/asset-manifest.json
  public/assets/antonovich/projects.json   (verified project metadata)

Only the official domain is crawled. Nothing is fabricated: titles, locations
and descriptions are copied from the source pages; missing data stays empty.

Usage
  .venv/bin/python scripts/scrape_antonovich_assets.py \
      [--projects-per-category 3] [--images-per-project 4] [--max-edge 2000]
  Re-runs reuse the cached crawl (scripts/.cache) and skip existing files.
"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass, field, asdict
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from PIL import Image
from playwright.sync_api import sync_playwright

BASE = "https://antonovich-design.com"
HOST = urlparse(BASE).netloc
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "assets" / "antonovich"
CACHE = Path(__file__).resolve().parent / ".cache" / "antonovich-crawl.json"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36"

FOLDERS = [
    "logo", "hero", "architecture", "residential", "villas", "palaces", "apartments",
    "commercial", "hospitality", "offices", "kitchens", "bathrooms", "bedrooms",
    "living-rooms", "exteriors", "landscapes", "furniture", "lighting", "marble-stone",
    "team", "press", "miscellaneous",
]

SEED_PAGES = {
    "home": f"{BASE}/",
    "about": f"{BASE}/about-us.html",
    "our-works": f"{BASE}/our-works.html",
    "services": f"{BASE}/services.html",
    "portfolio": f"{BASE}/portfolio-1.html",
    "contact": f"{BASE}/contact-us.html",
    "testimonials": f"{BASE}/testimonials.html",
}

# category slug -> (website category, asset folder, human label)
CATEGORIES = {
    "apartment-interior-design": ("residential", "apartments", "Apartment Interior Design"),
    "luxury-interior-design": ("residential", "villas", "Luxury Interior Design"),
    "luxury-interior-design-2": ("residential", "villas", "Luxury Interior Design"),
    "sitting-room-design": ("residential", "living-rooms", "Sitting Room Design"),
    "living-room-decor": ("residential", "living-rooms", "Living Room Decor"),
    "dining-room-decorating-ideas": ("residential", "living-rooms", "Dining Room Design"),
    "entrance-design": ("residential", "living-rooms", "Entrance Design"),
    "bedroom-decoration": ("residential", "bedrooms", "Bedroom Decoration"),
    "childrens-room-design": ("residential", "bedrooms", "Children's Room Design"),
    "dressing-room": ("residential", "bedrooms", "Dressing Room"),
    "kitchen-design": ("residential", "kitchens", "Kitchen Design"),
    "bathroom-decor-ideas": ("residential", "bathrooms", "Bathroom Design"),
    "cinema-home": ("residential", "residential", "Home Cinema"),
    "smart-home": ("residential", "residential", "Smart Home"),
    "portfolio-1": ("residential", "residential", "Smart Home"),
    "decoration-stairs": ("residential", "residential", "Staircase Design"),
    "mastery-in-luxurious-staircase-design-and-execution": ("residential", "residential", "Staircase Design"),
    "office-design": ("commercial", "offices", "Office Design"),
    "clinic-design": ("commercial", "commercial", "Clinic Design"),
    "public-space-design": ("commercial", "commercial", "Public Space Design"),
    "hotel-design": ("hospitality", "hospitality", "Hotel Design"),
    "restaurant-design": ("hospitality", "hospitality", "Restaurant Design"),
    "spa-interior-design": ("hospitality", "hospitality", "Spa Interior Design"),
    "modern-house-architecture": ("architecture", "architecture", "Modern House Architecture"),
    "luxury-house-plan": ("architecture", "architecture", "Luxury House Planning"),
    "master-planning": ("architecture", "architecture", "Master Planning"),
    "construction-fit-out": ("architecture", "architecture", "Construction Fit-Out"),
    "construction-and-renovation": ("architecture", "architecture", "Construction & Renovation"),
    "construction-consulting": ("architecture", "architecture", "Construction & Consulting"),
    "mep": ("architecture", "architecture", "Engineering & MEP"),
    "exterior-design": ("exterior-landscape", "exteriors", "Exterior Design"),
    "finest-villa-exterior-design-and-landscape-expertise-by-antonovich-group": ("exterior-landscape", "exteriors", "Exterior Design"),
    "landscape-design": ("exterior-landscape", "landscapes", "Landscape Design"),
    "swimming-pool-design": ("exterior-landscape", "landscapes", "Swimming Pool Design"),
    "furniture": ("furniture-styling", "furniture", "Furniture Production"),
    "chandeliers-and-lamps": ("furniture-styling", "lighting", "Chandeliers & Lamps"),
    "artistic-stained-glass": ("furniture-styling", "lighting", "Artistic Stained Glass"),
    "king-art-stone": ("furniture-styling", "marble-stone", "King Art Stone"),
    "mosaics": ("furniture-styling", "marble-stone", "Mosaics"),
    "flooring-design": ("furniture-styling", "marble-stone", "Flooring Design"),
    "flooring-marble-wood-ceramic-tiles-carpeting-and-other-modern-materials": ("furniture-styling", "marble-stone", "Flooring Materials"),
    "wood-floors": ("furniture-styling", "marble-stone", "Wood Floors"),
    "curtains": ("furniture-styling", "furniture", "Curtains"),
    "wall-papers": ("furniture-styling", "furniture", "Wallpapers"),
    "decorative-textiles-from-leading-factories": ("furniture-styling", "furniture", "Decorative Textiles"),
}
# Pages that are linked from navigation but are not portfolio categories.
SKIP = re.compile(r"/(blog|pricing|video|testimonials|about-us|contact-us|services|our-works|gallery|branding)(\.html|/|$)|/(es|pt|ru)/")
KNOWN_PLACES = [
    "Dubai Marina", "Downtown Dubai", "Palm Jumeirah", "Emirates Hills", "Jumeirah", "DIFC", "Dubai",
    "Abu Dhabi", "Sharjah", "Riyadh", "Jeddah", "Saudi Arabia", "Miami", "New York", "San Francisco", "Florida",
    "California", "Los Angeles", "London", "Moscow", "Nigeria", "Lagos", "Abuja", "Shanghai",
    "Mussoorie", "Kenya", "Canada", "San Francisco", "Kuwait", "Qatar", "Doha", "Oman", "Bahrain", "USA", "UAE",
]
IMG_ATTRS = ["src", "data-src", "data-lazy-src", "data-lazyload", "data-original", "data-bg", "data-thumb"]
SKIP_IMG = re.compile(r"(loader\.gif|placeholder\.jpg|magnifier\.png|/flags?/|\.svg$|i\.ytimg\.com|facebook|google|pixel|whatsapp)", re.I)


def log(*a):
    print(*a, flush=True)


def slugify(text: str, limit: int = 60) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s[:limit].rstrip("-") or "image"


def absolute(url: str | None, page: str) -> str | None:
    if not url:
        return None
    url = url.strip().strip("'\"")
    if not url or url.startswith(("data:", "javascript:", "#")):
        return None
    full = urljoin(page, url)
    p = urlparse(full)
    if p.netloc and p.netloc != HOST:
        return None  # never crawl or download from unrelated domains
    return full.split("#")[0]


def full_size(url: str) -> str:
    """Category covers use /thumbXXXX.jpg; the original is the same path without 'thumb'."""
    return re.sub(r"/thumb(?=[0-9A-Za-z]{6,})", "/", url, count=1)


def place_from(title: str) -> str:
    """Return only the place named in a source title, e.g. 'Limestone House, DIFC, Dubai' -> 'DIFC, Dubai'."""
    parts = [p.strip() for p in title.split(",")]
    if len(parts) > 1:
        tail = [p for p in parts[1:] if any(re.search(rf"\b{re.escape(k)}\b", p, re.I) for k in KNOWN_PLACES)]
        if tail:
            return ", ".join(tail)
    for place in KNOWN_PLACES:
        m = re.search(rf"\b{re.escape(place)}\b", title, re.I)
        if m:
            return place
    return ""


BOILERPLATE = re.compile(r"See how we can provide your premium furniture|Get free quotes|customised brochure", re.I)
# Supplier catalogues, brand collections and placeholder pages are not Antonovich projects.
NOT_PORTFOLIO = {"furniture", "chandeliers-and-lamps", "flooring-marble-wood-ceramic-tiles-carpeting-and-other-modern-materials",
                 "wall-papers", "mosaics", "mep", "portfolio-1", "curtains", "decorative-textiles-from-leading-factories", "wood-floors", "king-art-stone"}


def clean_paragraphs(paragraphs: list[str]) -> list[str]:
    return [p for p in paragraphs if not BOILERPLATE.search(p)]


# --------------------------------------------------------------------------- crawl
EXTRACT_JS = """
() => {
  const out = [];
  for (const el of document.querySelectorAll('*')) {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg !== 'none') for (const m of bg.matchAll(/url\\(["']?([^"')]+)["']?\\)/g)) out.push(m[1]);
  }
  for (const img of document.images) if (img.currentSrc) out.push(img.currentSrc);
  return out;
}
"""


def render(page, url: str) -> tuple[str, list[str]]:
    page.goto(url, wait_until="domcontentloaded", timeout=60000)
    try:
        page.wait_for_load_state("load", timeout=15000)
    except Exception:
        pass
    # Scroll the complete page in steps so lazy loaders swap data-src -> src.
    height = page.evaluate("document.body.scrollHeight")
    y, steps = 0, 0
    while y < height and steps < 60:  # cap guards against infinite-scroll pages
        steps += 1
        y += 900
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(120)
        height = page.evaluate("document.body.scrollHeight")
    # Expand "show more" style toggles where present.
    for sel in ["text=SHOW MORE", "text=Show more"]:
        try:
            for btn in page.locator(sel).all()[:3]:
                if btn.is_visible() and not btn.evaluate("e => !!e.closest('a[href$=\\'.html\\']')"):
                    btn.click(timeout=1500, no_wait_after=True)
        except Exception:
            pass
    page.wait_for_timeout(300)
    return page.content(), page.evaluate(EXTRACT_JS)


def images_in(soup: BeautifulSoup, page_url: str, computed: list[str]) -> list[dict]:
    found: dict[str, dict] = {}

    def add(url, alt="", context=""):
        u = absolute(url, page_url)
        if u and not SKIP_IMG.search(u) and re.search(r"\.(jpe?g|png|webp|avif|gif)(\?|$)", u, re.I):
            found.setdefault(u, {"url": u, "alt": alt or "", "context": context})

    for img in soup.find_all("img"):
        ctx = ""
        a = img.find_parent("a")
        for attr in IMG_ATTRS:
            add(img.get(attr), img.get("alt"), ctx)
        for attr in ("srcset", "data-srcset"):
            for part in (img.get(attr) or "").split(","):
                add(part.strip().split(" ")[0], img.get("alt"), ctx)
        if a and a.get("href") and re.search(r"\.(jpe?g|png|webp)$", a["href"], re.I):
            add(a["href"], img.get("alt"), "full-size link")
    for el in soup.select("[style*=url]"):
        for m in re.findall(r"url\(([^)]+)\)", el["style"]):
            add(m, "", "inline background")
    for el in soup.select("[data-bg],[data-background],[data-lazyload]"):
        for attr in ("data-bg", "data-background", "data-lazyload"):
            add(el.get(attr), el.get("alt") or el.get("title") or "", "lazy background")
    for u in computed:
        add(u, "", "computed")
    return list(found.values())


def main_soup(html: str) -> BeautifulSoup:
    soup = BeautifulSoup(html, "html.parser")
    for sel in ["header", "footer", "nav", "script", "style", ".modal", ".alert", ".mb-md-3", "noscript"]:
        for t in soup.select(sel):
            t.decompose()
    return soup


def project_cards(html: str, page_url: str) -> list[dict]:
    soup = main_soup(html)
    cards, seen = [], set()
    for img in soup.find_all("img"):
        a = img.find_parent("a")
        href = absolute(a.get("href"), page_url) if a else None
        title = (img.get("alt") or (a.get_text(" ", strip=True) if a else "")).strip()
        src = img.get("data-src") or img.get("src")
        if not href or not title or not src or href in seen or SKIP_IMG.search(src):
            continue
        if not href.endswith(".html") or SKIP.search(href) or href.rstrip("/") == page_url.rstrip("/"):
            continue
        seen.add(href)
        cards.append({"url": href, "title": title, "cover": absolute(src, page_url)})
    return cards


def project_details(html: str, page_url: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    h1 = soup.find("h1")
    title = h1.get_text(" ", strip=True) if h1 else ""
    gallery = []
    for a in soup.select("a[href*='/uploads/gallery/']"):
        u = absolute(a["href"], page_url)
        if u and u not in gallery:
            gallery.append(u)
    body = main_soup(html)
    paras = [re.sub(r"\s+", " ", p.get_text(" ", strip=True)) for p in body.find_all("p")]
    paras = [p for p in paras if len(p) > 80 and "Antonovich" not in p[:0] and "cookie" not in p.lower()]
    return {"title": title, "gallery": gallery, "paragraphs": paras[:4]}


def team_members(html: str, page_url: str) -> list[dict]:
    soup = main_soup(html)
    members = []
    for img in soup.select("img[src*='/uploads/team/'], img[data-src*='/uploads/team/']"):
        box = img
        for _ in range(4):
            box = box.parent
            text = re.sub(r"\s+", " ", box.get_text(" ", strip=True))
            if len(text) > 20:
                break
        members.append({"image": absolute(img.get("data-src") or img.get("src"), page_url), "text": text[:600]})
    return members


def crawl(per_category: int) -> dict:
    data = {"pages": {}, "categories": {}, "projects": {}, "team": []}
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(user_agent=UA, viewport={"width": 1440, "height": 900})
        # Attributes are read from the DOM, so skip binary downloads during the crawl.
        ctx.route(re.compile(r".*\.(jpe?g|png|gif|webp|avif|woff2?|ttf|mp4|webm)(\?.*)?$", re.I), lambda r: r.abort())
        page = ctx.new_page()

        def visit(url):
            for attempt in range(2):
                try:
                    return render(page, url)
                except Exception as exc:  # noqa: BLE001
                    log(f"   ! {url}: {exc.__class__.__name__}")
                    time.sleep(2)
            return None, []

        category_urls: dict[str, str] = {}
        for key, url in SEED_PAGES.items():
            log(f"[seed] {url}")
            html, computed = visit(url)
            if not html:
                data["pages"][key] = {"url": url, "status": "failed", "images": []}
                continue
            soup = BeautifulSoup(html, "html.parser")
            data["pages"][key] = {"url": url, "status": "ok", "images": images_in(soup, url, computed)}
            if key == "about":
                data["team"] = team_members(html, url)
            for a in soup.find_all("a", href=True):
                u = absolute(a["href"], url)
                if not u or not u.endswith(".html"):
                    continue
                slug = Path(urlparse(u).path).stem
                if slug in CATEGORIES:
                    category_urls.setdefault(slug, u)
            time.sleep(0.3)

        for slug, url in category_urls.items():
            log(f"[category] {slug}")
            html, computed = visit(url)
            if not html:
                data["categories"][slug] = {"url": url, "status": "failed", "projects": []}
                continue
            details = project_details(html, url)
            cards = project_cards(html, url)
            data["categories"][slug] = {
                "url": url, "status": "ok", "title": details["title"],
                "paragraphs": details["paragraphs"], "gallery": details["gallery"],
                "projects": cards,
            }
            time.sleep(0.3)

        # Project pages, capped per category, never visited twice.
        for slug, cat in data["categories"].items():
            for card in cat.get("projects", [])[:per_category]:
                if card["url"] in data["projects"] or Path(urlparse(card["url"]).path).stem in CATEGORIES:
                    continue
                log(f"[project] {slug} -> {card['url']}")
                html, _ = visit(card["url"])
                if not html:
                    data["projects"][card["url"]] = {"category": slug, "status": "failed", **card}
                    continue
                d = project_details(html, card["url"])
                data["projects"][card["url"]] = {"category": slug, "status": "ok", "card_title": card["title"], "cover": card["cover"], **d}
                time.sleep(0.3)
        browser.close()
    return data


# ------------------------------------------------------------------------ download
@dataclass
class Asset:
    original_url: str
    local_file: str
    source_page: str
    project_category: str
    project_name: str
    alt: str
    folder: str
    width: int = 0
    height: int = 0
    file_type: str = ""
    bytes: int = 0
    sha256: str = ""
    ahash: str = ""
    download_status: str = "pending"
    duplicate_of: str = ""
    notes: list = field(default_factory=list)


def ahash(img: Image.Image) -> str:
    g = img.convert("L").resize((16, 16), Image.Resampling.LANCZOS)
    px = list(g.tobytes())
    avg = sum(px) / len(px)
    return "".join("1" if v > avg else "0" for v in px)


def hamming(a: str, b: str) -> int:
    return sum(x != y for x, y in zip(a, b))


REPROCESS = False
SESSION = requests.Session()
SESSION.headers["User-Agent"] = UA


def fetch(url: str) -> tuple[bytes | None, str]:
    for candidate in ([full_size(url), url] if full_size(url) != url else [url]):
        try:
            r = SESSION.get(candidate, timeout=60)
            if r.ok and r.headers.get("content-type", "").startswith("image") and len(r.content) > 2000:
                return r.content, candidate
        except requests.RequestException:
            pass
    return None, url


def plan_assets(data: dict, images_per_project: int, covers_per_category: int, team_limit: int = 1) -> list[Asset]:
    plan: list[Asset] = []
    names: dict[str, int] = {}

    def name_for(folder, base):
        key = f"{folder}/{base}"
        names[key] = names.get(key, 0) + 1
        return f"{base}-{names[key]:02d}"

    def add(url, page, folder, category, project, alt):
        if not url:
            return
        plan.append(Asset(url, name_for(folder, slugify(project or alt or "antonovich-design")), page, category, project, alt, folder))

    pages = data["pages"]
    # Brand marks.
    for key in ("home",):
        for im in pages.get(key, {}).get("images", []):
            u = im["url"]
            if "/images/logo" in u or "logo_slider" in u:
                plan.append(Asset(u.split("?")[0], "antonovich-design-logo" if "/images/logo" in u else "antonovich-design-logo-mark", pages[key]["url"], "brand", "", "Luxury Antonovich Design logo", "logo"))
            elif "/uploads/slider/" in u:
                add(u, pages[key]["url"], "hero", "hero", "antonovich-luxury-interior-hero", "Luxury Antonovich Design interior")
            elif "forbs" in u:
                plan.append(Asset(u, "forbes-feature", pages[key]["url"], "press", "", "Forbes feature badge", "press"))
    # Only leadership portraits (the founder appears first on the About page);
    # individual staff headshots are intentionally not collected.
    team_urls = [m["image"] for m in data["team"][:team_limit]]
    for im in pages.get("about", {}).get("images", []):
        if im["url"] in team_urls:
            member = next((m for m in data["team"] if m["image"] == im["url"]), None)
            add(im["url"], pages["about"]["url"], "team", "team", "katrina-antonovich-portrait", (member or {}).get("text", "")[:160])
    for im in pages.get("contact", {}).get("images", []):
        if "/images/contact/" in im["url"]:
            add(im["url"], pages["contact"]["url"], "miscellaneous", "office", "antonovich-office", "Luxury Antonovich Design office location")
    for im in pages.get("services", {}).get("images", []):
        if "/uploads/page/" in im["url"]:
            add(im["url"], pages["services"]["url"], "miscellaneous", "services", "antonovich-services", im.get("alt", ""))

    # Category covers (what the official site uses to present each discipline).
    for slug, cat in data["categories"].items():
        site_cat, folder, label = CATEGORIES[slug]
        for u in cat.get("gallery", [])[:images_per_project]:
            add(u, cat["url"], folder, site_cat, cat.get("title") or label, cat.get("title") or label)
        for card in cat.get("projects", [])[:covers_per_category]:
            proj = data["projects"].get(card["url"], {})
            src = (proj.get("gallery") or [card["cover"]])[0]  # 1920px originals; the card cover is only 640px
            add(src, cat["url"], folder, site_cat, card["title"], card["title"])
    # Project galleries.
    for url, proj in data["projects"].items():
        if proj.get("status") != "ok":
            continue
        site_cat, folder, _ = CATEGORIES[proj["category"]]
        title = proj.get("title") or proj.get("card_title", "")
        if folder in ("villas", "residential", "living-rooms") and re.search(r"palace|royal|mansion", title, re.I):
            folder = "palaces"
        for u in proj["gallery"][:images_per_project]:
            add(u, url, folder, site_cat, title, f"{title} — Luxury Antonovich Design")
    return plan


def process(asset: Asset, max_edge: int) -> Asset:
    target_dir = OUT / asset.folder
    existing = list(target_dir.glob(asset.local_file + ".*"))
    if existing and not REPROCESS:  # never download the same image twice across runs
        raw = existing[0].read_bytes()
        asset.local_file = f"/assets/antonovich/{asset.folder}/{existing[0].name}"
        asset.download_status = "cached"
        asset.bytes = len(raw)
        asset.file_type = existing[0].suffix[1:]
        asset.sha256 = hashlib.sha256(raw).hexdigest()
        with Image.open(existing[0]) as e:
            asset.width, asset.height = e.size
            asset.ahash = ahash(e)
        return asset
    raw, used = fetch(asset.original_url)
    if raw is None:
        asset.download_status = "failed"
        asset.notes.append("not accessible")
        return asset
    if used != asset.original_url:
        asset.notes.append(f"thumbnail upgraded to full-size original: {used}")
        asset.original_url = used
    asset.sha256 = hashlib.sha256(raw).hexdigest()
    try:
        img = Image.open(io.BytesIO(raw))
        img.load()
    except Exception:  # noqa: BLE001
        asset.download_status = "failed"
        asset.notes.append("not a readable image")
        return asset
    asset.ahash = ahash(img)
    asset.width, asset.height = img.size
    keep_png = asset.folder in ("logo", "press") and img.mode in ("RGBA", "LA", "P")
    target_dir.mkdir(parents=True, exist_ok=True)
    if keep_png:
        path = target_dir / f"{asset.local_file}.png"
        path.write_bytes(raw)
    else:
        if img.mode not in ("RGB",):
            img = img.convert("RGB")
        if max(img.size) > max_edge:  # only downscale oversized originals
            img.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
        path = target_dir / f"{asset.local_file}.webp"
        img.save(path, "WEBP", quality=93, method=6)
        asset.width, asset.height = img.size
    asset.local_file = f"/assets/antonovich/{asset.folder}/{path.name}"
    asset.file_type = path.suffix[1:]
    asset.bytes = path.stat().st_size
    asset.download_status = "downloaded"
    return asset


SITE_CATEGORIES = {
    "residential": "Residential", "commercial": "Commercial", "hospitality": "Hospitality",
    "architecture": "Architecture", "exterior-landscape": "Exterior & Landscape", "furniture-styling": "Furniture & Styling",
}


MIN_PORTFOLIO_EDGE = 1600  # longest side required for portfolio photography


def long_edge(local_path: str) -> int:
    """Longest side of a local asset, 0 if missing."""
    path = ROOT / "public" / local_path.lstrip("/")
    if not path.exists():
        return 0
    with Image.open(path) as im:
        return max(im.size)


def write_typescript(projects: list[dict]) -> None:
    """Generate src/data/antonovich-projects.ts from verified scraped metadata only.

    Quality gate: a photo below MIN_PORTFOLIO_EDGE is never shown. Projects whose
    cover is too small are skipped; low gallery images are dropped."""
    rows, seen = [], set()
    skipped = []
    for p in projects:
        if not p["portfolio"] or not p["cover"] or p["cover"] in seen:
            continue
        if long_edge(p["cover"]) < MIN_PORTFOLIO_EDGE:
            skipped.append(p["title"])
            continue
        seen.add(p["cover"])
        images = [img for img in dict.fromkeys([p["cover"], *p["gallery"]]) if long_edge(img) >= MIN_PORTFOLIO_EDGE]
        slug = slugify(p["title"], 70)
        while slug in {r["slug"] for r in rows}:
            slug += "-2"
        rows.append({
            "slug": slug, "name": re.sub(r"\s+", " ", p["title"]).strip(), "category": p["category"],
            "categoryLabel": SITE_CATEGORIES[p["category"]], "discipline": p["source_category"],
            "location": p["location"], "image": p["cover"], "gallery": images,
            "description": p["description"], "source": p["source_url"],
        })
    header = (
        "/**\n * Generated by scripts/scrape_antonovich_assets.py — do not edit by hand.\n"
        " * Every name, location, description and image comes from antonovich-design.com.\n"
        " * Missing metadata is left empty rather than invented.\n */\n"
    )
    body = (
        "export type ProjectCategory = " + " | ".join(f'"{k}"' for k in SITE_CATEGORIES) + ";\n\n"
        "export interface AntonovichProject {\n  slug: string;\n  name: string;\n  category: ProjectCategory;\n"
        "  categoryLabel: string;\n  discipline: string;\n  location: string;\n  image: string;\n"
        "  gallery: string[];\n  description: string[];\n  source: string;\n}\n\n"
        "export const projectCategories: { value: ProjectCategory; label: string }[] = "
        + json.dumps([{"value": k, "label": v} for k, v in SITE_CATEGORIES.items()], indent=2, ensure_ascii=False)
        + ";\n\nexport const projects: AntonovichProject[] = "
        + json.dumps(rows, indent=2, ensure_ascii=False) + ";\n"
    )
    (ROOT / "src" / "data" / "antonovich-projects.ts").write_text(header + body)
    log(f"Wrote src/data/antonovich-projects.ts ({len(rows)} projects)")
    if skipped:
        log(f"Skipped {len(skipped)} projects below {MIN_PORTFOLIO_EDGE}px: " + "; ".join(skipped))


def fetch_favicon() -> dict:
    """The official favicon is declared in <link rel="shortcut icon"> on every page."""
    target = ROOT / "public" / "favicon.ico"
    url = f"{BASE}/favicon.ico"
    if not target.exists():
        try:
            r = SESSION.get(url, timeout=30)
            if r.ok and len(r.content) > 100:
                target.write_bytes(r.content)
        except requests.RequestException:
            pass
    return {"original_url": url, "local_file": "/favicon.ico" if target.exists() else "", "source_page": BASE + "/",
            "project_category": "brand", "project_name": "", "alt": "", "file_type": "ico",
            "download_status": "downloaded" if target.exists() else "failed"}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--projects-per-category", type=int, default=3)
    ap.add_argument("--images-per-project", type=int, default=3)
    ap.add_argument("--covers-per-category", type=int, default=6)
    ap.add_argument("--team-limit", type=int, default=1, help="leadership portraits to keep")
    ap.add_argument("--max-edge", type=int, default=2600)
    ap.add_argument("--refresh", action="store_true", help="ignore cached crawl")
    ap.add_argument("--reprocess-media", action="store_true", help="re-download and re-encode media files")
    ap.add_argument("--min-edge", type=int, default=1200, help="flag images whose short side is below this")
    args = ap.parse_args()
    global REPROCESS
    REPROCESS = args.reprocess_media

    for f in FOLDERS:
        (OUT / f).mkdir(parents=True, exist_ok=True)

    if CACHE.exists() and not args.refresh:
        data = json.loads(CACHE.read_text())
        log(f"Using cached crawl {CACHE.relative_to(ROOT)}")
    else:
        data = crawl(args.projects_per_category)
        CACHE.parent.mkdir(parents=True, exist_ok=True)
        CACHE.write_text(json.dumps(data, indent=1))

    plan = plan_assets(data, args.images_per_project, args.covers_per_category, args.team_limit)
    # Exact-URL de-duplication before any network request.
    unique, by_url, url_dupes = [], {}, []
    for a in plan:
        key = full_size(a.original_url.split("?")[0])
        if key in by_url:
            url_dupes.append((a, by_url[key]))
            continue
        by_url[key] = a
        unique.append(a)
    log(f"Planned {len(plan)} references → {len(unique)} unique URLs")

    with ThreadPoolExecutor(max_workers=6) as pool:
        done = list(pool.map(lambda a: process(a, args.max_edge), unique))

    # Content de-duplication: identical bytes or near-identical perceptual hash.
    kept: list[Asset] = []
    for a in done:
        if a.download_status not in ("downloaded", "cached"):
            continue
        twin = next((k for k in kept if k.sha256 == a.sha256 or (a.ahash and k.ahash and hamming(a.ahash, k.ahash) <= 6 and abs(a.width / max(a.height, 1) - k.width / max(k.height, 1)) < 0.05)), None)
        if twin:
            a.duplicate_of = twin.local_file
            path = ROOT / "public" / a.local_file.lstrip("/")
            if path.exists() and path != ROOT / "public" / twin.local_file.lstrip("/"):
                path.unlink()
            a.download_status = "duplicate-removed"
            a.local_file = twin.local_file
        else:
            kept.append(a)
    for a, original in url_dupes:
        a.duplicate_of = original.local_file
        a.download_status = "duplicate-url"
        a.local_file = original.local_file
        done.append(a)

    manifest = {
        "source": BASE,
        "generated": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "settings": vars(args),
        "summary": {
            "references": len(done),
            "downloaded": sum(a.download_status in ("downloaded", "cached") for a in done),
            "failed": sum(a.download_status == "failed" for a in done),
            "duplicates": sum(a.download_status.startswith("duplicate") for a in done),
        },
        "favicon": fetch_favicon(),
        "assets": [
            {
                "original_url": a.original_url, "local_file": a.local_file if a.download_status != "failed" else "",
                "source_page": a.source_page, "project_category": a.project_category,
                "project_name": a.project_name, "alt": a.alt, "width": a.width, "height": a.height,
                "file_type": a.file_type, "bytes": a.bytes, "sha256": a.sha256,
                "download_status": a.download_status, "duplicate_of": a.duplicate_of, "notes": a.notes,
            }
            for a in done
        ],
    }
    (OUT / "asset-manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False))

    # Verified project metadata for the front end.
    files_by_url = {a.original_url: a.local_file for a in done if a.download_status in ("downloaded", "cached", "duplicate-url", "duplicate-removed")}
    lookup = lambda u: files_by_url.get(full_size(u)) or files_by_url.get(u) or ""  # noqa: E731
    projects = []
    for url, proj in data["projects"].items():
        if proj.get("status") != "ok":
            continue
        site_cat, folder, label = CATEGORIES[proj["category"]]
        title = proj.get("title") or proj.get("card_title", "")
        gallery = [f for f in (lookup(u) for u in proj["gallery"][: args.images_per_project]) if f]
        cover = gallery[0] if gallery else lookup(proj.get("cover") or "")
        projects.append({
            "title": title, "card_title": proj.get("card_title", ""), "source_url": url,
            "source_category": label, "category_slug": proj["category"], "category": site_cat,
            "location": place_from(title) or place_from(proj.get("card_title", "")),
            "description": clean_paragraphs(proj.get("paragraphs", []))[:3], "cover": cover, "gallery": gallery,
            "portfolio": proj["category"] not in NOT_PORTFOLIO and "lorem-ipsum" not in url,
        })
    categories = {
        slug: {"title": c.get("title", ""), "url": c["url"], "label": CATEGORIES[slug][2], "category": CATEGORIES[slug][0],
               "paragraphs": clean_paragraphs(c.get("paragraphs", []))[:3], "project_count": len(c.get("projects", [])),
               "projects": [{"title": p["title"], "url": p["url"], "cover": lookup(p["cover"] or "")} for p in c.get("projects", [])]}
        for slug, c in data["categories"].items()
    }
    (OUT / "projects.json").write_text(json.dumps({"team": data["team"][: args.team_limit], "categories": categories, "projects": projects}, indent=2, ensure_ascii=False))
    write_typescript(projects)
    log(json.dumps(manifest["summary"]))
    failed = [a.original_url for a in done if a.download_status == "failed"]
    if failed:
        log(f"{len(failed)} inaccessible images recorded in the manifest (not replaced).")


if __name__ == "__main__":
    sys.exit(main())
