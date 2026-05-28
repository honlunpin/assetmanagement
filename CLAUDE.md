# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static one-page marketing site for **Red Beacon Asset Management**. No build step, no package manager, no framework — plain HTML/CSS/JS opened directly in a browser.

## Running the site

```powershell
Start-Process "index.html"   # opens in default browser
```

There are no build, lint, or test commands.

## Architecture

Three files, each self-contained:

- **index.html** — all six sections in order: `#navbar`, `#home` (hero), `#why-us` (USP cards), `#testimonials` (carousel), `#contact` (form), `<footer>`. Semantic HTML5 with ARIA attributes throughout.
- **styles.css** — CSS custom properties in `:root` drive the entire theme (colors, shadows, spacing). Mobile-first; breakpoints at `768px` and `1024px`. The `.fade-in` / `.fade-in.visible` pair is the sole animation hook — JS adds `.visible` via IntersectionObserver.
- **script.js** — eight self-invoking sections (IIFE pattern), each independent: navbar scroll, hamburger, smooth scroll, counters, carousel, fade-in observer, form, footer year.

## Key conventions

**Color palette** (defined as CSS vars, never use raw hex elsewhere):
- `--navy: #6b0f0f` — primary brand (deep maroon)
- `--gold: #d4a017` — accent / CTA
- `--gray-100: #f5f7fa` — alternate section background

**Form submission** uses FormSubmit.co's AJAX endpoint (`/ajax/` prefix in the `action` URL). The endpoint returns `{ "success": "true" }` on success. The placeholder `your-email@example.com` in `index.html` must be replaced with a real address and activated via FormSubmit's one-time confirmation email.

**Navbar state**: JS toggles `.scrolled` (solid navy background) when `window.scrollY > 40` and also when the mobile menu is open. The hamburger animates to × via `.active` on `.hamburger`; the menu opens via `.open` on `.nav-links` (max-height slide).

**Carousel**: pure CSS transform (`translateX(-N * 100%)`) on `#carousel-track` inside `.carousel-clip` (the overflow container). State lives in a closure — `currentSlide` integer, `setInterval` handle for auto-rotation.

**Counter animation**: driven by `data-target`, `data-prefix`, `data-suffix`, `data-decimals` attributes on `.stat-number` elements. Uses `requestAnimationFrame` with an ease-out-cubic curve, triggered once by IntersectionObserver at 50% threshold.
