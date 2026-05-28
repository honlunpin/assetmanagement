# Red Beacon Asset Management

Static one-page marketing site for Red Beacon Asset Management.

**Live site:** https://honlunpin.github.io/assetmanagement/

## Stack

Plain HTML, CSS, and JavaScript — no build step, no framework, no package manager.

## Files

| File | Purpose |
|------|---------|
| `index.html` | All six sections: navbar, hero, why us, testimonials, contact form, footer |
| `styles.css` | CSS custom properties drive the entire theme; mobile-first, breakpoints at 768 px and 1024 px |
| `script.js` | Eight self-contained IIFEs: navbar scroll, hamburger, smooth scroll, counters, carousel, fade-in observer, form, footer year |

## Design

- **Fonts:** Cormorant Garamond (display serif) + Mulish (body/UI) via Google Fonts
- **Palette:** Deep maroon `#6b0f0f` · Antique gold `#d4a017` · Light grey `#eef0f4`
- **Hero:** Left-aligned, light grey background, staggered CSS reveal animations, RBAM watermark
- **Cards:** Gold top-border, large faint number watermark, dark-maroon hover inversion
- **Testimonials:** Dark maroon section with gold left-border cards and rectangular progress dots
- **Navbar:** Frosted glass (`backdrop-filter: blur`) — always visible against any background

## Running locally

```powershell
Start-Process "index.html"
```

## Deployment

Pushes to `main` deploy automatically to GitHub Pages via GitHub Actions.
