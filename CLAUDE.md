# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page marketing website for Magnitude10 (Jeremy Stone's fractional CTO / AI consultancy). No build system, no server-side code.

## Development

To preview locally, serve the directory with any static file server:
```
python3 -m http.server 8080
```
Then open http://localhost:8080 in a browser.

Edit files directly — no build step required.

## Linting

```
npm run lint          # run all linters
npm run lint:html     # html-validate on index.html
npm run lint:css      # stylelint on css/style.css
```

## Testing

```
npm test
```

Tests use Jest with jsdom. Test file: `js/main.test.js`. Covers JavaScript behaviors (spinner, sticky navbar, back-to-top) and HTML structure validation.

## CI

GitHub Actions workflow (`.github/workflows/ci.yml`) runs `npm run lint` and `npm test` on pushes to main and PRs.

## Key Files

- `index.html` — entire site content and structure (single-page with anchor navigation: `#about`, `#services`, `#contact`)
- `css/style.css` — custom styles, includes mobile-specific overrides via `@media (max-width: 767.98px)`
- `js/main.js` — custom JavaScript (sticky navbar, back-to-top button, spinner, WOW.js init)
- `css/bootstrap.min.css` — pre-compiled customized Bootstrap CSS
- `scss/bootstrap.scss` — Bootstrap SCSS variable overrides (must be manually compiled if changed)
- `.htmlvalidate.json` — html-validate config (inline styles allowed)
- `.stylelintrc.json` — stylelint config (standard, with exceptions for Font Awesome and browser compat)

## Architecture

Single HTML page with Bootstrap 5 dark theme, jQuery 3.4.1, and scroll-triggered animations (WOW.js + animate.css). All third-party libraries are either CDN-loaded or vendored in `lib/`. No framework, no routing, no state management, no API calls.

## Mobile Layout

The About section uses a show/hide approach (`d-none d-lg-block` / `d-lg-none`) to reorder content on mobile vs desktop — the headshot and "30+ Years" block appear between the title and experience text on mobile, but in a separate left column on desktop. Portfolio items use `col-6` for two-per-row on mobile with square images and auto-height text boxes.

## Design Tokens

- Primary: `#EB1616` (red)
- Secondary: `#191C24` (dark blue-gray)
- Dark/Background: `#000000`
- Body text: `#9BA0BF`
- Headings: `#FFFFFF`
- Body font: Roboto (400, 500)
- Heading font: Oswald (600, uppercase)
