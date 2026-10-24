/* ════════════════════════════════════════════════════════════════════
   KEKULAWALA ADVERTISING — SITE CONFIGURATION
   ★ This is the ONLY file you need to edit to go live. ★
   1) Replace the contact details below with the real ones.
   2) Paste your Firebase web config (step-by-step in README.md).
   ════════════════════════════════════════════════════════════════════ */

export const SITE = {
  name: "Kekulawala Advertising",
  domain: "kekulawala.com",

  /* ── TODO: replace with real contact details ── */
  phoneDisplay: "+94 37 222 0000",          // landline shown on site
  phoneLink: "+94372220000",
  mobileDisplay: "+94 77 123 4567",         // mobile / WhatsApp shown on site
  whatsapp: "94771234567",                  // WhatsApp number (country code + number, no +)
  email: "info@kekulawala.com",
  salesEmail: "sales@kekulawala.com",
  addressHTML: "Colombo Road, Kurunegala,<br>North Western Province 60000, Sri Lanka",
  addressShortHTML: "Colombo Road, Kurunegala,<br>North Western Province, Sri Lanka",
  mapQuery: "Kurunegala, Sri Lanka",
  socials: {
    facebook: "https://facebook.com/",      // TODO: real page URLs
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
    tiktok: "https://tiktok.com/",
  },
};

/* ────────────────────────────────────────────────────────────────────
   FIREBASE  (project: kekulawala-erp)
   Console → https://console.firebase.google.com/project/kekulawala-erp
   Project settings (⚙) → "Your apps" → Web app (</>) → copy the
   firebaseConfig object and paste the values below.

   Until real values are pasted, the site automatically runs in
   DEMO MODE: forms & reviews are stored in the visitor's browser
   (localStorage) so everything still works for preview/testing.
   ──────────────────────────────────────────────────────────────────── */
export const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "kekulawala-erp.firebaseapp.com",
  projectId: "kekulawala-erp",
  storageBucket: "kekulawala-erp.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID",
  // measurementId: "G-XXXXXXXXXX",  // optional — enables Analytics
};

export const isFirebaseConfigured =
  !Object.values(firebaseConfig).some(
    (v) => typeof v === "string" && v.startsWith("PASTE_")
  );
