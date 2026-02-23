# CLAUDE.md

This file documents the repository structure, conventions, and workflows for AI assistants working in this codebase.

---

## Repository Overview

This is a **multi-project portfolio repository** containing three distinct, standalone projects:

| Project | Files | Language | Purpose |
|---|---|---|---|
| StayEase | `index.html`, `app.js`, `style.css` | HTML/CSS/JS | Hotel booking web app (SPA) |
| KDDI Presentation | `create_presentation.py` | Python 3 | Corporate PowerPoint generator |
| Concert Flyers | `concert_flyer_A/B/C.html` | HTML/CSS | Print-ready concert flyer designs |

There is no shared build system, package manager, or backend. Each project is self-contained.

---

## Project 1: StayEase Hotel Booking App

### What It Is

A fully client-side Single Page Application (SPA) for hotel booking in Japan. No backend, no API, no npm. Everything runs in the browser using vanilla JavaScript, HTML5, and CSS3.

### File Structure

```
index.html    # Full page markup for all views/pages
app.js        # All application logic (~974 lines)
style.css     # Complete design system (~1,579 lines)
```

### Architecture

The app uses a module-object pattern — plain JavaScript objects act as page controllers:

```
AppState          # Global state singleton; persists bookings to LocalStorage
Router            # Client-side routing; shows/hides page divs
Header            # Navigation, mobile menu toggle
HomePage          # Landing page, featured hotels, hero search
SearchPage        # Filter/search results with sort controls
DetailPage        # Hotel detail view, room listing
BookingPage       # Multi-field booking form with live summary
ConfirmationPage  # Post-booking confirmation screen
BookingsPage      # Booking history with cancellation support
```

**Routing:** Pages are `<div class="page">` elements inside `index.html`. The Router shows/hides them by toggling the `active` class. No URL hash changes.

**State persistence:** Bookings are stored in `localStorage` under the key `stayease_bookings` as a JSON array of booking objects.

**Data:** Hotel data is hardcoded in the `HOTELS` array at the top of `app.js`. There are 9 hotels, each with a `rooms` array. No external data source.

### Key Conventions (JavaScript)

- **Naming:** camelCase for functions/variables; UPPER_CASE for top-level constants (`HOTELS`, `AppState`).
- **Page sections** in `app.js` are separated by `// ---` comment headers in Japanese.
- **No classes** — module pattern only (objects with methods).
- **Event listeners** are attached via `querySelector` and `addEventListener` inside each module's `init()` or `render()` call.
- **DOM coupling:** JavaScript selects elements by `id` (e.g., `#pageHome`) and by `data-page` / `data-hotel-id` attributes.
- **Form validation:** Credit card number, expiry, and CVC are validated client-side in `BookingPage`.
- **Booking IDs:** Generated as `SE-` + random alphanumeric string.

### Key Conventions (CSS)

- **CSS custom properties** defined in `:root`:
  - `--primary: #2563eb` (blue)
  - `--accent: #f59e0b` (orange)
  - Grays: `--gray-50` through `--gray-900`
  - Shadows: `--shadow-sm` through `--shadow-xl`
  - Border radii: `--radius-sm` through `--radius-2xl`
- **BEM-like class names:** e.g., `.hotel-card`, `.hotel-card-image`, `.btn-search`.
- **Responsive breakpoints:** `1024px` (tablet) and `768px` (mobile).
- **Transitions:** Use `0.3s cubic-bezier(0.4, 0, 0.2, 1)` for consistency.
- CSS sections are separated by block comments (e.g., `/* === Header === */`).

### Key Conventions (HTML)

- Language: `lang="ja"` (Japanese).
- All pages are pre-rendered in `index.html`; shown/hidden by JS.
- Page containers: `<div class="page page-home" id="pageHome">`.
- Navigation links use `data-page` attribute for routing: `<a data-page="search">`.
- Hotel/room links use `data-hotel-id` for selection.

### Running the App

No build step required. Open `index.html` directly in a browser, or serve with any static file server:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

### What Not to Do

- Do **not** introduce a bundler, npm, or external JS libraries unless explicitly requested.
- Do **not** add a backend or API calls — this is intentionally client-side only.
- Do **not** change the routing mechanism away from div show/hide without reconsidering the full page structure in `index.html`.

---

## Project 2: KDDI Presentation Generator

### What It Is

A Python 3 script that generates a 10-slide corporate PowerPoint presentation about KDDI's future prospects. Output: `KDDI_将来性_プレゼンテーション.pptx`.

### Dependency

```bash
pip install python-pptx
```

### Running

```bash
python3 create_presentation.py
```

Generates the `.pptx` file in the current directory.

### Key Conventions

- **Color constants** are defined at the module top as `RGBColor` values (e.g., `KDDI_ORANGE`, `ACCENT_BLUE`).
- **Helper functions** handle repetitive shape/text operations: `add_background()`, `add_shape()`, `add_rounded_rect()`, `add_textbox()`, `add_bullet_points()`.
- **Slide dimensions:** 13.333 × 7.5 inches (widescreen 16:9).
- **Procedural construction:** Each slide is built sequentially by calling helper functions. No slide templates.
- Comments and text content are in Japanese.

---

## Project 3: Concert Flyers

### What They Are

Three standalone HTML files, each a self-contained concert flyer design for the "歌の翼に〜" (Song of Wings) concert. Intended for A4 print or browser display.

### Files

- `concert_flyer_A.html` — Blue sky / cloud theme
- `concert_flyer_B.html` — Variant design
- `concert_flyer_C.html` — Variant design

### Conventions

- All CSS is **embedded** in `<style>` tags — no external stylesheets.
- Japanese fonts: Noto Sans JP and Noto Serif JP (loaded from Google Fonts).
- No JavaScript.
- Print-optimized with `@media print` styles.

---

## Git Workflow

### Branch Naming

Feature branches follow the pattern: `claude/<description>-<session-id>`

Example: `claude/add-claude-documentation-9gBOe`

### Commit Style

Commits use plain English imperative descriptions matching the project worked on:

```
StayEase hotel booking app creation
KDDI future prospect PowerPoint creation
Add 3 concert flyer designs for "歌の翼に〜" concert
```

### Remote

The remote is a local proxy:
```
origin  http://local_proxy@127.0.0.1:32124/git/yuu11201120/test
```

### Push Command

Always use:
```bash
git push -u origin <branch-name>
```

Branches must start with `claude/` and end with the matching session ID, otherwise push will fail with HTTP 403.

---

## No CI/CD

There are no automated tests, linters, GitHub Actions workflows, or build pipelines. All testing is manual via browser (for the SPA) or direct script execution (for the Python script).

---

## File Glossary

| File | Description |
|---|---|
| `index.html` | StayEase SPA — full markup for all pages |
| `app.js` | StayEase SPA — all JS logic, state, routing |
| `style.css` | StayEase SPA — complete design system |
| `create_presentation.py` | KDDI PowerPoint generator script |
| `KDDI_将来性_プレゼンテーション.pptx` | Generated output (do not edit manually) |
| `concert_flyer_A.html` | Concert flyer design A |
| `concert_flyer_B.html` | Concert flyer design B |
| `concert_flyer_C.html` | Concert flyer design C |
| `CLAUDE.md` | This file |
