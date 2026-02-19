# Magnitude10

Marketing website for [Magnitude10](https://www.linkedin.com/in/jeremydstone/) — fractional CTO and AI consultancy services by Jeremy Stone.

## Tech Stack

- **Bootstrap 5** (dark theme with custom SCSS variables)
- **jQuery 3.4.1**
- **WOW.js + animate.css** for scroll-triggered animations
- **Owl Carousel** for testimonials
- **Google Fonts** — Roboto (body), Oswald (headings)

## Project Structure

```
index.html          # Entire site (single-page, anchor navigation)
css/
  style.css         # Custom styles
  bootstrap.min.css # Pre-compiled customized Bootstrap
scss/
  bootstrap.scss    # Bootstrap SCSS variable overrides
js/
  main.js           # Sticky navbar, back-to-top, spinner, carousel init
lib/                # Vendored third-party libraries
img/                # Static image assets
```

## Getting Started

No build step required. Serve the directory with any static file server:

```sh
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

## Testing

```sh
npm install
npm test
```

Tests use [Jest](https://jestjs.io/) with jsdom. The test suite (`js/main.test.js`) covers:

- JavaScript behaviors — spinner dismissal, sticky navbar, back-to-top button, carousel initialization
- HTML structure — navigation links, page sections, service and portfolio item counts, external script loading

## Customizing Bootstrap

Bootstrap is customized via SCSS variables in `scss/bootstrap.scss`. If you modify the SCSS, you'll need to recompile it to `css/bootstrap.min.css` manually (e.g. using `sass`).

## License

ISC
