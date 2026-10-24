/* ════════════════════════════════════════════════════════════════════
   KEKULAWALA ADVERTISING — SITE CONFIGURATION
   ★ This is the ONLY file you need to edit to go live. ★
   1) Replace the contact details below with the real ones.
   2) Paste your Firebase web config (step-by-step in README.md).
   ════════════════════════════════════════════════════════════════════ */

export const SITE = {
  name: "Kekulawala Advertising",
  domain: "kekulawala.com",

  /* ── Official contact details (from the company letterhead) ── */
  phoneDisplay: "+94 37 223 4221",          // landline: 037 22 34 221
  phoneLink: "+94372234221",
  mobileDisplay: "+94 71 719 4371",         // mobile / WhatsApp: 071 71 94 371
  whatsapp: "94717194371",                  // WhatsApp number (country code + number, no +)
  email: "kekulawala.advertising@gmail.com",
  salesEmail: "kekulawala.advertising@gmail.com",
  addressHTML: "Colombo Road, Wehera, Kurunegala,<br>North Western Province, Sri Lanka",
  addressShortHTML: "Colombo Road, Wehera, Kurunegala,<br>North Western Province, Sri Lanka",
  mapQuery: "Kekulawala Advertising, Wehera, Kurunegala",
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
