# Kekulawala Advertising — Official Website

🌐 **Domain:** [kekulawala.com](https://kekulawala.com) · 🔥 **Backend:** Firebase project **`kekulawala-erp`** · 🇱🇰 North Western Province, Sri Lanka — *Since 1982*

An interactive, single-page marketing website for Kekulawala Advertising with a live
**quote estimator**, **filterable project gallery**, **customer-review wall** and a
**quotation request system** — all backed by **Cloud Firestore**.

---

## ✨ Features

| Area | What's included |
|---|---|
| **Hero** | Animated CMYK ink-droplet canvas that reacts to the mouse, rotating project showcase, animated counters, trilingual touch (සිංහල · தமிழ் · English) |
| **Services** | 8 services (hoardings, LED/3D signage, digital printing, CNC, laser, offset printing, fabrication, interiors) with 3-D tilt cards + detail pop-ups |
| **Smart Estimator** | Pick a product, slide the size (with a to-scale live preview), toggle LED/installation/double-side, quantity bulk discounts → instant LKR budget range → one tap sends it into the quote form |
| **Portfolio** | 16 real project photos, category filters, full-screen lightbox (keyboard + swipe) |
| **Reviews** | Live rating summary + auto-playing carousel; visitors can **publish a review instantly** (stored in Firestore `reviews`) |
| **Quote form** | Validated form saved to Firestore `inquiries` for the sales team / future ERP |
| **Extras** | WhatsApp float button, Google Map, scroll-spy nav, SEO + OpenGraph + LocalBusiness schema, PWA manifest, custom 404 |

---

## 📁 Project structure

```
Kekulawala-Advertising/
├── public/                  ← Firebase Hosting root (the website)
│   ├── index.html
│   ├── 404.html
│   ├── css/style.css
│   ├── js/
│   │   ├── config.js        ★ EDIT THIS: contact details + Firebase keys
│   │   ├── firebase.js      Firestore layer (auto demo-mode fallback)
│   │   └── main.js          All interactivity & content data
│   └── assets/img/          Logo, icons, portfolio photos
├── firebase.json            Hosting + Firestore config
├── .firebaserc              → project: kekulawala-erp
├── firestore.rules          Security rules (public submit, team-only read)
├── firestore.indexes.json
└── storage.rules
```

---

## 🚀 Going live — 3 steps

### 1️⃣ Connect Firebase (5 minutes)
1. Open the console: <https://console.firebase.google.com/project/kekulawala-erp>
2. **Build → Firestore Database → Create database** (production mode) — if not already created.
3. **⚙ Project settings → Your apps → Web `</>`** → register app `kekulawala-web`, copy the `firebaseConfig` values.
4. Paste them into **`public/js/config.js`** (replace the `PASTE_…` placeholders).

> Until this is done the site runs in **demo mode** (data kept in the visitor's browser) so every feature still works while previewing.

### 2️⃣ Update contact details
In the same `public/js/config.js`, replace the placeholder phone/WhatsApp/address/social links with the real ones. The whole site updates automatically.

### 3️⃣ Deploy
```bash
npm install -g firebase-tools   # once
firebase login
firebase deploy                 # hosting + firestore rules
```
Then add the custom domain in **Firebase Console → Hosting → Add custom domain → `kekulawala.com`** and point the domain's DNS records as instructed (free SSL is automatic).

### Run locally
```bash
firebase emulators:start        # full local stack  → http://localhost:5000
# …or simply:
npx serve public                # static preview
```

---

## 🗄️ Firestore data model

**`inquiries`** — every quote/contact submission
`name, phone, email, town, service, budget, message, status:"new", source:"kekulawala.com", createdAt`
→ Read/manage them in the Firebase Console (or later from the Kekulawala ERP). The website itself can **only create** — never read — these records.

**`reviews`** — public customer feedback
`name, business, rating (1–5), text, approved, createdAt`
→ The site streams the latest 60 live. To moderate, edit/delete documents in the Console.

---

## 🎨 Customising content

- **Services, prices, portfolio items, seed reviews** live at the top of `public/js/main.js` (`SERVICES`, `EST_PRODUCTS`, `WORKS`, `SEED_REVIEWS`) — plain arrays, easy to edit.
- **Portfolio photos**: drop higher-resolution originals into `public/assets/img/portfolio/` keeping the same filenames, or add new entries to `WORKS`.
- **Colours/fonts**: CSS variables at the top of `public/css/style.css`.

---

## 📄 License
© Kekulawala Advertising. All rights reserved.
