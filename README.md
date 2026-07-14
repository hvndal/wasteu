# Waste Universe — Full-Stack Web Platform

<div align="center">
  <img src="assets/images/logo.png" alt="Waste Universe Logo" width="280" />
  <br/><br/>

  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
  ![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)

  <h3><strong>A production-grade, full-stack e-commerce platform built from zero for a real local business — wasteuniverse.com</strong></h3>

  <p>
    No frameworks. No templates. No shortcuts.<br/>
    Pure HTML, CSS, Vanilla JS on the frontend — Node.js + Express + Stripe on the backend.
  </p>
</div>

---

## 🧠 Project Summary

Waste Universe is a family-owned dumpster rental company serving Massachusetts and Rhode Island. When I took on this project, the website had **zero organic search traffic** and no way for customers to pay online.

I rebuilt it from the ground up — transforming a static brochure site into a **fully indexed, locally optimized, payment-enabled web platform** that can rank in Google and convert visitors into paying customers.

This project demonstrates full-stack capability without relying on a framework to hide the complexity.

---

## ⚙️ What I Built

### 🛒 Stripe Payment Gateway (Backend)
- Built a secure **Node.js + Express** backend (`server.js`) to handle all payment logic server-side
- Integrated **Stripe Embedded Checkout** — customers complete purchases without leaving the domain
- Engineered a **dynamic pricing engine** that calculates base price + correct state tax (6.25% MA / 7% RI) on the server — price cannot be manipulated from the browser
- Implemented a **Stripe Webhook listener** (`/api/webhooks/stripe`) that silently confirms successful payments and logs orders to disk — zero dropped orders if the browser closes mid-checkout
- Built a **5-step multi-stage checkout UI** in pure Vanilla JS with zip-code validation, date pickers, and real-time order summary

### 🔍 Local SEO Engine
- Wrote a **custom Node.js automation script** (`seo_pages_generator.js`) that programmatically generates unique, hyper-targeted city landing pages
- Created **7 dedicated service-area pages** (Littleton, Stow, Acton, Harvard, Maynard, Concord, Littleton Common) with unique H1s, metadata, hero copy, FAQs, and local context — no duplicate content
- Injected **Google-compliant JSON-LD schemas** (`LocalBusiness` + `FAQPage`) into every page for Rich Snippet eligibility
- Generated and maintained `sitemap.xml` and `robots.txt` to ensure proper Google crawling
- Implemented self-referencing canonical tags to prevent penalty from similar pages

### 🔒 Security Architecture
- All Stripe keys stored in `.env` — **never committed to git**
- Implemented a full **git history purge** (`filter-branch` + `gc --prune`) to scrub any previously exposed credentials from all 77 commits
- **CORS locked** to `wasteuniverse.com` + `localhost` — no external sites can call the payment API
- **Rate limiting** on `/api/checkout` — max 10 requests per 15 minutes per IP to prevent abuse
- **HTTP Security Headers** on every response: `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`
- **Sensitive file blocking** middleware — `server.js`, `.env`, `package.json`, and all scripts return 403 if requested directly
- Stripe Webhook verified via `stripe.webhooks.constructEvent` signature check

### 🎨 Frontend & UI/UX
- **Glassmorphism design system** built entirely in custom CSS — no Tailwind, no Bootstrap
- **Weather advisory banner** with live IP-based geolocation auto-detection
- **Interactive dumpster size visualizer** with human-scale comparison
- Dynamic review carousel, micro-animations, scroll observers, and split-flap number counters
- Fully responsive — tested on mobile, tablet, and widescreen
- Performance optimized: lazy loading, preconnected fonts, zero heavy JS dependencies

---

## 🗂️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3 (custom), Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Payments | Stripe API (Embedded Checkout + Webhooks) |
| SEO | JSON-LD Schema, Sitemap.xml, Canonical Tags |
| Security | CORS lockdown, Rate Limiting, HTTP Headers, .env isolation |
| Dev Tools | dotenv, jsdom, Git |

---

## 🚀 Running Locally

```bash
# 1. Clone the repo
git clone https://github.com/hvndal/wasteu.git
cd wasteu

# 2. Install dependencies
npm install

# 3. Create your .env file (see .env.example)
cp .env.example .env
# Add your Stripe keys to .env

# 4. Start the server
npm start

# 5. Open in browser
# http://localhost:3000
```

> **Note:** The payment gateway requires a real Stripe account and `.env` configured with your keys. See `.env.example` for the required variables.

---

## 📁 Key Files

| File | Purpose |
|---|---|
| `server.js` | Node.js/Express backend — pricing engine, Stripe checkout, webhook handler, security middleware |
| `checkout.html` | Multi-step checkout UI |
| `assets/js/checkout.js` | Checkout state machine, validation, Stripe embedded UI initialization |
| `seo_pages_generator.js` | Automation script — generates unique local SEO city pages |
| `dumpster-rental-*.html` | 7 unique city landing pages (auto-generated) |
| `sitemap.xml` | Auto-generated XML sitemap for all pages |
| `index.html` | Homepage (61KB) — full brand experience |

---

## 📈 Business Impact

| Metric | Before | After |
|---|---|---|
| Organic Search Traffic | 0 | SEO-optimized (indexed) |
| Online Booking | Phone only | Stripe Embedded Checkout |
| Local City Pages | 1 | 8 (+ 7 city-specific) |
| Structured Data | None | LocalBusiness + FAQPage schema |
| Security | None | Full hardened backend |

---

## 👨‍💻 About

Built solo — from initial concept through full-stack implementation and security hardening — for a live production business with real customers.

This project is a direct demonstration of my ability to:
- Architect and deploy a secure backend from scratch
- Integrate third-party payment APIs (Stripe) end-to-end
- Execute a technical SEO strategy programmatically
- Write clean, maintainable code without relying on opinionated frameworks
- Think about security from day one (CORS, rate limiting, credential hygiene, git history sanitization)

---

*Live at [wasteuniverse.com](https://wasteuniverse.com)*
