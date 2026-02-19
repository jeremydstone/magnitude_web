/**
 * @jest-environment jsdom
 */

let $;

// Helper: set up the DOM fixtures used by main.js
function setupDOM() {
  document.body.innerHTML = `
    <div id="spinner" class="show"></div>
    <nav class="sticky-top" style="top: -100px;"></nav>
    <a href="#" class="back-to-top" style="display: none;"></a>
  `;
}

// Helper: fresh-load jQuery and main.js so all handlers bind to current DOM
function loadMain() {
  jest.resetModules();

  $ = require("jquery");
  global.jQuery = $;
  global.$ = $;

  // Mock WOW.js
  global.WOW = jest.fn().mockImplementation(() => ({
    init: jest.fn(),
  }));

  // Mock easing (jQuery easing plugin adds easeInOutExpo)
  $.easing.easeInOutExpo = function (x) {
    return x;
  };

  require("./main.js");
}

beforeEach(() => {
  jest.useFakeTimers();
  setupDOM();
  loadMain();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("Spinner", () => {
  test("removes 'show' class from #spinner after timeout", () => {
    const spinner = document.getElementById("spinner");
    expect(spinner.classList.contains("show")).toBe(true);

    jest.runAllTimers();

    expect(spinner.classList.contains("show")).toBe(false);
  });
});

describe("WOW.js initialization", () => {
  test("creates and initializes WOW", () => {
    expect(global.WOW).toHaveBeenCalled();
    const instance = global.WOW.mock.results[0].value;
    expect(instance.init).toHaveBeenCalled();
  });
});

describe("Sticky Navbar", () => {
  test("adds shadow-sm and sets top to 0px when scrolled past 300px", () => {
    const nav = document.querySelector(".sticky-top");

    Object.defineProperty(window, "pageYOffset", {
      value: 400,
      writable: true,
      configurable: true,
    });

    $(window).trigger("scroll");

    expect(nav.classList.contains("shadow-sm")).toBe(true);
    expect(nav.style.top).toBe("0px");
  });

  test("removes shadow-sm and sets top to -100px when scrolled below 300px", () => {
    const nav = document.querySelector(".sticky-top");

    // First scroll past 300
    Object.defineProperty(window, "pageYOffset", {
      value: 400,
      writable: true,
      configurable: true,
    });
    $(window).trigger("scroll");

    // Then scroll back up
    Object.defineProperty(window, "pageYOffset", {
      value: 100,
      writable: true,
      configurable: true,
    });
    $(window).trigger("scroll");

    expect(nav.classList.contains("shadow-sm")).toBe(false);
    expect(nav.style.top).toBe("-100px");
  });
});

describe("Back to top button", () => {
  test("is hidden initially", () => {
    const btn = document.querySelector(".back-to-top");
    expect(btn.style.display).toBe("none");
  });

  test("becomes visible when scrolled past 300px", () => {
    const btn = document.querySelector(".back-to-top");
    Object.defineProperty(window, "pageYOffset", {
      value: 400,
      writable: true,
      configurable: true,
    });

    $(window).trigger("scroll");
    jest.runAllTimers(); // fadeIn uses timers

    expect(btn.style.display).not.toBe("none");
  });

  test("click handler triggers scroll-to-top animation", () => {
    const calls = [];
    const origAnimate = $.fn.animate;
    $.fn.animate = function (...args) {
      calls.push(args);
      return this;
    };

    document.querySelector(".back-to-top").click();

    expect(calls.length).toBeGreaterThan(0);
    expect(calls[0][0]).toEqual({ scrollTop: 0 });
    expect(calls[0][1]).toBe(1500);
    expect(calls[0][2]).toBe("easeInOutExpo");

    $.fn.animate = origAnimate;
  });
});

describe("HTML structure", () => {
  beforeEach(() => {
    const fs = require("fs");
    const path = require("path");
    const html = fs.readFileSync(
      path.resolve(__dirname, "..", "index.html"),
      "utf8"
    );
    document.documentElement.innerHTML = html;
  });

  test("has required navigation links", () => {
    const navLinks = document.querySelectorAll(".nav-item.nav-link");
    const hrefs = Array.from(navLinks).map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("index.html");
    expect(hrefs).toContain("#about");
    expect(hrefs).toContain("#services");
    expect(hrefs).toContain("#contact");
  });

  test("has all page sections with correct IDs", () => {
    expect(document.getElementById("about")).not.toBeNull();
    expect(document.getElementById("services")).not.toBeNull();
    expect(document.getElementById("contact")).not.toBeNull();
  });

  test("has the correct page title", () => {
    const title = document.querySelector("title");
    expect(title.textContent).toBe("Magnitude10");
  });

  test("has all portfolio items", () => {
    const portfolioItems = document.querySelectorAll(".team-item");
    expect(portfolioItems.length).toBe(4);
  });

  test("has all service items", () => {
    const serviceItems = document.querySelectorAll(".service-item");
    expect(serviceItems.length).toBe(6);
  });

  test("has the LinkedIn contact link", () => {
    const contactSection = document.getElementById("contact");
    const link = contactSection.querySelector("a");
    expect(link.getAttribute("href")).toBe(
      "https://www.linkedin.com/in/jeremydstone/"
    );
  });

  test("loads required external scripts", () => {
    const scripts = Array.from(document.querySelectorAll("script")).map((s) =>
      s.getAttribute("src")
    );
    expect(scripts).toContain(
      "https://code.jquery.com/jquery-3.4.1.min.js"
    );
    expect(scripts).toContain(
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
    );
    expect(scripts).toContain("js/main.js");
  });
});
