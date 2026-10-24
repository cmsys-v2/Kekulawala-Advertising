/* ════════════════════════════════════════════════════════════════════
   Firebase layer — Firestore for quote inquiries & customer reviews.
   • If real keys are present in config.js → live Cloud Firestore.
   • Otherwise → DEMO MODE backed by localStorage (same API surface),
     so the whole site stays fully functional before setup.
   SDK is loaded lazily from the official CDN — no build step needed.
   ════════════════════════════════════════════════════════════════════ */
import { firebaseConfig, isFirebaseConfigured } from "./config.js";

const SDK = "https://www.gstatic.com/firebasejs/10.12.2";
let db = null;
let fs = null; // firestore module functions

export const backendMode = isFirebaseConfigured ? "firebase" : "demo";

async function initFirebase() {
  if (!isFirebaseConfigured || db) return db;
  try {
    const appMod = await import(`${SDK}/firebase-app.js`);
    fs = await import(`${SDK}/firebase-firestore.js`);
    const app = appMod.initializeApp(firebaseConfig);
    db = fs.getFirestore(app);
    // Analytics is optional and must never break the site
    if (firebaseConfig.measurementId) {
      import(`${SDK}/firebase-analytics.js`)
        .then((a) => a.getAnalytics(app))
        .catch(() => {});
    }
    console.info("🔥 Kekulawala: connected to Firebase project", firebaseConfig.projectId);
  } catch (err) {
    console.warn("Firebase failed to initialise — falling back to demo mode.", err);
    db = null;
  }
  return db;
}

/* ── Demo-mode local storage helpers ── */
const demoRead = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
};
const demoWrite = (key, rows) => {
  try { localStorage.setItem(key, JSON.stringify(rows)); } catch {}
};
const demoListeners = { reviews: [] };

/* ── Public API used by main.js ── */

/** Save a quote/contact inquiry → Firestore collection "inquiries". */
export async function saveInquiry(data) {
  const row = { ...data, status: "new", source: "kekulawala.com", createdAt: new Date().toISOString() };
  const database = await initFirebase();
  if (database) {
    await fs.addDoc(fs.collection(database, "inquiries"), {
      ...row,
      createdAt: fs.serverTimestamp(),
    });
    return { mode: "firebase" };
  }
  const rows = demoRead("kw_inquiries");
  rows.unshift(row);
  demoWrite("kw_inquiries", rows);
  return { mode: "demo" };
}

/** Save a customer review → Firestore collection "reviews". */
export async function saveReview(data) {
  const row = { ...data, approved: true, createdAt: new Date().toISOString() };
  const database = await initFirebase();
  if (database) {
    await fs.addDoc(fs.collection(database, "reviews"), {
      ...row,
      createdAt: fs.serverTimestamp(),
    });
    return { mode: "firebase" };
  }
  const rows = demoRead("kw_reviews");
  rows.unshift(row);
  demoWrite("kw_reviews", rows);
  demoListeners.reviews.forEach((cb) => cb(rows));
  return { mode: "demo" };
}

/**
 * Subscribe to the latest reviews (live updates).
 * cb receives an array of {name, business, rating, text, createdAt}.
 * Returns an unsubscribe function. In demo mode it fires with
 * locally-stored reviews immediately and on every new submission.
 */
export async function subscribeReviews(cb) {
  const database = await initFirebase();
  if (database) {
    const q = fs.query(
      fs.collection(database, "reviews"),
      fs.orderBy("createdAt", "desc"),
      fs.limit(60)
    );
    return fs.onSnapshot(
      q,
      (snap) => cb(snap.docs.map((d) => normalise(d.data()))),
      (err) => {
        console.warn("Review stream error — using demo data.", err);
        cb(demoRead("kw_reviews"));
      }
    );
  }
  demoListeners.reviews.push(cb);
  cb(demoRead("kw_reviews"));
  return () => {
    demoListeners.reviews = demoListeners.reviews.filter((f) => f !== cb);
  };
}

function normalise(d) {
  let when = d.createdAt;
  if (when && typeof when.toDate === "function") when = when.toDate().toISOString();
  return {
    name: String(d.name || "Anonymous").slice(0, 60),
    business: String(d.business || "").slice(0, 60),
    rating: Math.min(5, Math.max(1, Number(d.rating) || 5)),
    text: String(d.text || "").slice(0, 500),
    createdAt: when || new Date().toISOString(),
  };
}
