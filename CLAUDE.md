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

There are no build or lint commands — edit files directly.

## Testing

```
npm test
```

Tests use Jest with jsdom. Test file: `js/main.test.js`. Covers JavaScript behaviors (spinner, sticky navbar, back-to-top, carousel init) and HTML structure validation.

## Key Files

- `index.html` — entire site content and structure (single-page with anchor navigation: `#about`, `#services`, `#contact`)
- `css/style.css` — custom styles
- `js/main.js` — custom JavaScript (sticky navbar, scroll animations, Owl Carousel init)
- `css/bootstrap.min.css` — pre-compiled customized Bootstrap CSS
- `scss/bootstrap.scss` — Bootstrap SCSS variable overrides (must be manually compiled if changed)

## Architecture

Single HTML page with Bootstrap 5 dark theme, jQuery, and scroll-triggered animations (WOW.js + animate.css). All third-party libraries are either CDN-loaded or vendored in `lib/`. No framework, no routing, no state management, no API calls.

## Design Tokens

- Primary: `#EB1616` (red)
- Secondary: `#191C24` (dark blue-gray)
- Dark/Background: `#000000`
- Body text: `#9BA0BF`
- Headings: `#FFFFFF`
- Body font: Roboto (400, 500)
- Heading font: Oswald (600, uppercase)
