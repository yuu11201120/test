# CLAUDE.md

This file provides guidance for AI assistants working in this repository.

## Repository Overview

This is a general-purpose web development repository used to create standalone frontend projects. Each deliverable is typically a self-contained web application built with **vanilla HTML, CSS, and JavaScript** — no build tools, no package managers, no frameworks. Content is primarily in **Japanese**.

Projects created in this repo have included:
- Web applications (shift management, hotel booking, news aggregation)
- Corporate/marketing websites
- Print-ready HTML designs (A4 flyers)
- Python scripts for generating Office documents (using `python-pptx`)

## Repository Conventions

### Branch Naming

All development branches follow the pattern:
```
claude/<short-description>-<alphanumeric-id>
```
Examples: `claude/hotel-booking-app-eL7kt`, `claude/concert-flyer-design-2MuDV`

**Always develop on the designated branch. Never push to `master` directly.**

### Commit Messages

- Use imperative or descriptive Japanese or English subject lines
- `feat:` prefix for new features/deliverables
- Describe the deliverable clearly, e.g. `feat: ホテル予約アプリ「StayEase」を作成`

### File Structure

Each project uses a flat file structure at the repository root:

```
index.html      # Main HTML entry point
style.css       # All styles (single file)
app.js          # All JavaScript (single file)
```

For multi-page or multi-asset deliverables (e.g. flyers), files are named descriptively:
```
concert_flyer_A.html
concert_flyer_B.html
concert_flyer_C.html
```

Python-based deliverables include a generation script alongside the output:
```
create_presentation.py
output_file.pptx
```

## Technology Stack

### Frontend Applications (primary)
- **HTML5** — semantic markup, `lang="ja"`, UTF-8
- **CSS3** — CSS custom properties (`--var`), flexbox, grid, no preprocessors
- **Vanilla JavaScript** — ES6+, no frameworks, no bundlers

### Python Scripts (occasional)
- **python-pptx** — for generating PowerPoint (`.pptx`) files
- Standard library only where possible

### No build tooling
There is no `package.json`, `Makefile`, `webpack.config.js`, or similar. Files are served directly as static HTML.

## Coding Conventions

### HTML
- Always set `<!DOCTYPE html>`, `<html lang="ja">`, `<meta charset="UTF-8">`
- Use semantic elements (`<header>`, `<main>`, `<section>`, `<aside>`, `<nav>`, `<footer>`)
- Inline SVG icons are preferred over icon fonts or external icon libraries
- Styles and scripts are linked via `<link rel="stylesheet" href="style.css">` and `<script src="app.js"></script>`

### CSS
- Define all design tokens as CSS custom properties in `:root`
- Common variable naming pattern:
  ```css
  :root {
    --primary: #6366f1;
    --primary-light: #818cf8;
    --primary-dark: #4f46e5;
    --bg: #f8fafc;
    --bg-card: #ffffff;
    --text: #1e293b;
    --text-secondary: #64748b;
    --border: #e2e8f0;
    --radius: 10px;
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  }
  ```
- File header: always include a comment block identifying the project name and section
  ```css
  /* ============================================
     ProjectName - Section Description
     ============================================ */
  ```
- Responsive design via media queries; mobile-first is encouraged

### JavaScript
- File header comment block matching the CSS style
- Use a top-level `Store` object pattern for state management with `localStorage` persistence:
  ```js
  const Store = {
    _data: { ... },
    init() { /* load from localStorage */ },
    save() { localStorage.setItem('key', JSON.stringify(this._data)); },
    // getters and mutators
  };
  ```
- Use `const` / `let`; avoid `var`
- DOM manipulation with vanilla `document.querySelector` / `addEventListener`
- Keep all logic in `app.js`; avoid inline `<script>` blocks in HTML

### Print/Flyer HTML
- Target A4 dimensions: `210mm × 297mm`
- Use `@page { size: A4 portrait; margin: 0; }` in CSS
- Load Japanese fonts via Google Fonts (`Noto Serif JP`, `Noto Sans JP`)

## Development Workflow

1. **Check out the designated branch** before making any changes
2. **Build the deliverable** — all files at the repository root
3. **Test locally** by opening `index.html` in a browser (no server needed for most apps)
4. **Commit** with a descriptive message
5. **Push** with `git push -u origin <branch-name>`
6. **Open a Pull Request** targeting `master`

### Git Push Command
```bash
git push -u origin claude/<description>-<id>
```

## Previous Projects (git history)

| PR | Branch | Deliverable |
|----|--------|-------------|
| #1 | `claude/telecom-news-app-wRw1t` | TelecomWatch — 通信キャリアニュース確認アプリ |
| #2 | `claude/create-kddi-homepage-3ZZUf` | KDDIコーポレートホームページ |
| #3 | `claude/hotel-booking-app-eL7kt` | StayEase — ホテル予約アプリ |
| #4 | `claude/kddi-presentation-z7I6I` | KDDIの将来性プレゼンテーション (.pptx) |
| #5 | `claude/concert-flyer-design-2MuDV` | 歌の翼に〜 コンサートチラシ (A, B, C) |
| #6 | `claude/clear-all-deliverables-RpqE5` | 全ての成果物ファイルを削除 |

All previously created files were deleted in PR #6. The repository is currently empty (only `.git`).

## Notes for AI Assistants

- **No tests, no linter, no CI** — there is no automated test suite or lint config. Validate output visually.
- **Japanese content** — UI labels, data, and commit messages are often in Japanese. Use appropriate Japanese text.
- **Self-contained deliverables** — each project should work by simply opening `index.html` in a browser with no additional setup.
- **Sample data** — apps should include realistic Japanese sample data (names, places, dates) to demonstrate functionality.
- **Accessibility** — use `aria-label` attributes on icon-only buttons and interactive SVG elements.
- **Color schemes** — use cohesive color palettes defined via CSS variables; avoid hardcoded colors scattered through the stylesheet.
