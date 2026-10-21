# Viktor-Style Marketing Page Template

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-success.svg)](package.json)
[![Tests Passing](https://img.shields.io/badge/Tests-7%20passing-brightgreen.svg)](test/app.test.js)
[![Lighthouse: 100](https://img.shields.io/badge/Lighthouse-100%2F100-success.svg)](#performance--privacy-posture)
[![Font: Self--Hosted](https://img.shields.io/badge/Font-Self--Hosted%20WOFF2-6b3df5.svg)](#typography--performance)

A high-craft, single-page marketing and interactive demo template for microservices, APIs, and developer tools. Inspired by the warm editorial aesthetic of **viktor.com**, distilled from the production deployment of [`qr-code-service`](https://github.com/will-is-brown/qr-code-service) at [`qr.w-b.dev`](https://qr.w-b.dev).

---

## The Philosophy: The Anti-Framework Template

Modern landing pages are often bloated: multi-megabyte JavaScript bundles, external font trackers, Tailwind build pipelines, and hydration lag. 

This template goes in the opposite direction:

* **Zero runtime dependencies:** Pure semantic HTML5, modern vanilla CSS, and vanilla JS.
* **Instant first paint:** Under 50ms time-to-first-byte and first-contentful-paint.
* **Zero third-party leaks:** No Google Fonts, no external CDNs, no tracking pixels. Everything (including the variable font) is self-hosted and cached forever.
* **Show, don't tell:** An interactive "Stage" front-and-centre allows visitors to test your tool immediately with zero friction or sign-up walls.
* **Zero API waste on landing:** Ships a pre-rendered static preview so page loads never spend your visitors' or service's API quota.

---

## Page Anatomy

```
┌────────────────────────────────────────────────────────────────────────┐
│ .sky (Warm Paper #f8f4ef → Peach #ffe5d4 → Lavender → Deep Violet)     │
│                                                                        │
│   [ Pill Navigation: Inline SVG Mark + Nav Links + Primary Action ]    │
│                                                                        │
│   [ Hero Grid: Colossal Display Title + Value Lede + Dual CTAs ]       │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────────┐ │
│   │ .frame (The "Oversized Stage" with double halo shadow)           │ │
│   │  - Left: Interactive Form (Inputs, Radio Pills, Submit, Live URI)│ │
│   │  - Right: Warm Pastel Stage (Reactive Result Tile + Download/Copy)│
│   └──────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│ .band (Full-bleed Deep Indigo #1a0b63, sweeping 56px curved bottom)    │
│   [ Statement Headline: Core architectural guarantees ]                │
│   [ 3-Column Value Grid: Stateless, No Auth / Frictionless, Edge-Fast ]│
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│ .use (Clean paper background)                                          │
│   [ Developer Integration Docs: Two-column layout ]                    │
│   - Left: Tabbed code snippets (cURL, URL, JS, Python) + Limits card   │
│   - Right: Semantic parameter definitions (<dl>)                       │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│ .foot (Attribution, copyright, /healthz status link)                   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Visual Design Recipe

### 1. Palette Tokens

| CSS Variable | Value | Purpose |
|---|---|---|
| `--paper` | `#f8f4ef` | Warm page canvas; non-sterile off-white |
| `--ink` | `#17123a` | High-contrast text, primary buttons, solid borders |
| `--ink-soft` | `#5d5878` | Subheaders, lede descriptions, inactive states |
| `--violet` | `#6b3df5` | Primary brand accent, focus rings, interactive states |
| `--violet-deep`| `#5a33dd` | Gradient anchors and ambient box shadows |
| `--indigo` | `#1a0b63` | Contrast band, code containers, deep night sections |
| `--line` | `#e4ddd3` | Hairline borders for cards, inputs, and tabs |
| `--code-bg` | `#f3eefb` | Monospace code snippet background |

### 2. The Sunrise Sky Gradient
The hero sits on a subtle vertical gradient that simulates dawn light breaking into deep twilight:
```css
.sky {
  background: linear-gradient(
    180deg,
    var(--paper) 0%,
    var(--paper) 40%,
    #ffe5d4 64%,
    #cdbdff 82%,
    #5a33dd 100%
  );
  padding-bottom: 72px;
}
```

### 3. Oversized Stage Card
The interactive demo tool is housed inside an elevated card featuring a layered halo shadow:
```css
.frame {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  background: #fff;
  border-radius: 40px;
  overflow: hidden;
  box-shadow:
    0 0 0 10px rgba(255, 255, 255, 0.55),
    0 40px 90px rgba(90, 51, 221, 0.35);
}
```

### 4. Pill Geometry
All buttons, navigation bars, input selection chips, and code tabs adhere to a full pill radius:
```css
.nav, .btn, .sizes span, .tab {
  border-radius: 999px;
}
```

---

## Interactive UX Polish (Built-in)

1. **Reactive State Transitions:** 
   Typing in form fields instantly applies a `.stale` class (soft opacity reduction) to the output preview. Receiving fresh data removes the stale class and triggers a tactile CSS `@keyframes pop` scale animation.
2. **Fair Use / 429 Countdown UX:** 
   If your API responds with `429 Too Many Requests` containing a `Retry-After` header, the frontend automatically disables the submit button and initiates an in-place live countdown timer (`Try again in 24s`).
3. **Bulletproof Clipboard Copy:** 
   Tabs feature a 1-click copy button that leverages `navigator.clipboard.writeText` with an automatic fallback to DOM range selection for older browsers or restricted iframe contexts.
4. **Full Keyboard & ARIA Support:** 
   Implements accessible `role="tablist"`, `role="tab"`, and `aria-selected` attributes, alongside polite ARIA live regions (`role="status" aria-live="polite"`).

---

## Quick Start

### 1. Run Locally
Clone and start the zero-dependency Node server:

```bash
git clone https://github.com/will-is-brown/marketing-page-template.git
cd marketing-page-template

# Start the preview server
npm start
# Server listening at http://localhost:3000
```

### 2. Run the Test Suite
The template includes native `node:test` assertions verifying HTTP headers, WOFF2 font caching, ARIA accessibility, and zero-leak third-party guarantees:

```bash
npm test
```

---

## Customization Guide (5-Minute Adaption)

1. **Title & Identity (`index.html`):**
   * Update `<title>` and `<meta name="description">`.
   * Replace the inline brand mark `<svg>` in `<header class="nav">`.
2. **Hero Copy (`index.html`):**
   * Edit the two-stage headline in `<h1>`:
     ```html
     <h1>Your Action Verb.<span class="grad">Your Transformation.</span></h1>
     ```
   * Update the `.lede` paragraph with your value proposition.
3. **Demo Form (`index.html` & `page.js`):**
   * Customize inputs inside `<form id="tool-form" class="tool">`.
   * Adjust the `snippets` mapping in `page.js` to output valid code invocations (cURL, JavaScript, Python, etc.) for your API.
4. **Guarantees (`.band`):**
   * Tailor the three value pillars inside `<div class="facts">` to reflect your service’s key advantages (e.g., privacy, speed, pricing, edge caching).

---

## Deployment Recipes

### Static Hosting (Cloudflare Pages, GitHub Pages, Vercel, Netlify)
Since `index.html`, `page.css`, and `page.js` are completely standalone, point your static host directly to the repository root directory. No build command is required.

### Node.js / Docker
A production-ready `server.js` using standard Web `Request`/`Response` interfaces is included:

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY . .
ENV PORT=3000 NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## Project Structure

```
marketing-page-template/
├── index.html              # Semantic HTML5 template with complete metadata
├── page.css                # Design system tokens, layout grids, responsive queries
├── page.js                 # Vanilla client logic: live updates, code tabs, copy
├── assets/
│   └── outfit-latin.woff2  # Self-hosted variable font (100–900 weight)
├── server.js               # Web-standard HTTP server with immutable cache headers
├── test/
│   └── app.test.js         # Automated tests using node:test
├── package.json            # Scripts and metadata (zero runtime dependencies)
├── LICENSE                 # MIT License
└── README.md
```

---

## License

Created by [Daniel Willis-Brown](https://w-b.dev). Released under the [MIT License](LICENSE).
