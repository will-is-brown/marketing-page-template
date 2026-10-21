# Viktor-Style Marketing Page Template

A clean, standalone, zero-dependency marketing landing page template based on the visual language of **viktor.com**, distilled from the production implementation in [`qr-code-service`](file:///Users/ds/dev/repos/qr-code-service/).

Full design specifications and reproduction guide: [`marketing-page-template.md`](file:///Users/ds/dev/docs/marketing-page-template.md).

## Features

- **Warm Sunrise Sky Gradient:** Transitions smoothly from warm paper (`#f8f4ef`) to sunrise peach and lavender into deep indigo.
- **Floating Pill Navigation & Buttons:** All interactive controls use pill geometry (`border-radius: 999px`).
- **Interactive "Stage" Card:** Side-by-side interactive demo tool with instant reactive result rendering and dynamic state transitions (`.stale` / `.fresh`).
- **Deep Indigo Contrast Band:** Sweeping curved dark band (`border-radius: 0 0 56px 56px`) highlighting key platform guarantees.
- **Copy-Ready Developer Docs:** Tabbed code snippets (cURL, URL, JavaScript, Python) with one-click clipboard copy and parameter definition list.
- **Zero Third-Party Dependencies:** Self-hosted `Outfit` WOFF2 font, inline SVG brand marks and favicons, zero external trackers.
- **Accessible & Responsive:** Polite ARIA live regions, keyboard-accessible tabs, visible focus rings, responsive collapse below 860px.

## Quick Start

Run the built-in preview server:

```bash
npm start
# or: PORT=3000 node server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
marketing-page-template/
├── index.html                # Semantic, fully commented page markup
├── page.css                  # Design tokens, layout grids, animations, and media queries
├── page.js                   # Client interactions (live updates, tabs, clipboard, rate limits)
├── assets/
│   └── outfit-latin.woff2    # Self-hosted variable font (100–900 weight)
├── server.js                 # Zero-dependency local static file & caching server
├── package.json
└── README.md
```

## How to Adapt for a New Microservice

1. **Brand & Metadata:** Replace the title, meta tags, and inline SVG logo in `index.html`.
2. **Hero Copy:** Update the two-part headline (`<h1>...<span class="grad">...</span></h1>`) and lede paragraph.
3. **Stage Tool:** Customize the form fields in `.tool` and the preview container in `.result` to match your service's inputs and outputs.
4. **Code Snippets:** Adjust the `snippets` object in `page.js` to output the exact API invocation strings for your endpoint.
5. **Band Principles:** Tailor the 3 facts in `.facts` for your service's unique selling points.
