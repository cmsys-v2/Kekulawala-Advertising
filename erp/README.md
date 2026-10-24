# 🏢 Kekulawala ERP — Internal Management System

**Live address:** `https://kekulawala.com/erp` · **Firebase project:** `kekulawala-erp` · **Access:** authorised staff only

> ⚠ **This is a completely separate system from the public website.**
> The website (repo folder `public/`) and the ERP (this folder, `erp/`) share
> only two things: the domain **kekulawala.com** and the **Firebase project**.
> They are developed, deployed and versioned independently. The public website
> deliberately contains **no links** to `/erp`.

---

## How the two systems fit together

```
                        kekulawala.com
        ┌────────────────────────┬─────────────────────────┐
        │  /        PUBLIC SITE  │  /erp     KEKULAWALA ERP │
        │  (folder: public/)     │  (folder: erp/)          │
        │  Customers browse,     │  Staff manage the        │
        │  estimate & submit     │  business                │
        └───────────┬────────────┴────────────┬─────────────┘
                    │ writes                  │ reads / manages
                    ▼                         ▼
        ┌─────────────────────────────────────────────────┐
        │   Firebase (kekulawala-erp) — Cloud Firestore    │
        │   • inquiries  (quotation requests & inquiries)  │
        │   • reviews    (customer comments / feedback)    │
        └─────────────────────────────────────────────────┘
```

## The website → ERP data contract

The public website only ever **creates** documents in these two collections.
The ERP is the *sole* system that reads and manages them:

### `inquiries` — quotation requests & general inquiries
| Field | Type | Notes |
|---|---|---|
| `name` | string | customer name |
| `phone` | string | phone / WhatsApp |
| `email` | string | may be empty |
| `town` | string | project location |
| `service` | string | e.g. "LED & 3D Sign Boards" |
| `budget` | string | selected LKR range, may be empty |
| `message` | string | details (estimator summary is pasted here when used) |
| `status` | string | always `"new"` from the website — the ERP progresses it (`contacted`, `quoted`, `won`, `lost`…) |
| `source` | string | always `"kekulawala.com"` |
| `createdAt` | timestamp | server time |

### `reviews` — customer comments / feedback
| Field | Type | Notes |
|---|---|---|
| `name` | string | reviewer |
| `business` | string | business / town, may be empty |
| `rating` | int 1–5 | star rating |
| `text` | string | the comment |
| `approved` | bool | website writes `true`; ERP may unpublish |
| `createdAt` | timestamp | server time |

## Security model (`firestore.rules` in repo root)

- **Public / website:** may *create* `inquiries` (validated), may *read + create* `reviews`. Nothing else.
- **ERP staff:** Firebase Authentication users carrying the custom claim **`staff: true`**
  may read/update/delete `inquiries` and moderate `reviews`.
- Until staff accounts exist, the data is effectively console-only — safe by default.

To grant a staff member access once Firebase Auth is enabled (Admin SDK):

```js
await admin.auth().setCustomUserClaims(uid, { staff: true });
```

## Deploying the ERP under `/erp`

Firebase Hosting serves **one** site from `public/`, so the ERP ships as the
`public/erp/` sub-folder (routing + `noindex` headers are already configured
in the root `firebase.json`):

1. Build the ERP with its **base/public path set to `/erp/`**
   (e.g. Vite: `base: '/erp/'`, CRA: `"homepage": "/erp"`).
2. Copy the build output over `public/erp/`:
   ```bash
   # example — replace dist/ with your build folder
   rm -rf ../public/erp/* && cp -r dist/* ../public/erp/
   ```
3. From the repo root: `firebase deploy --only hosting`

Unknown routes under `/erp/**` automatically fall back to `/erp/index.html`
(SPA-ready) without affecting the public website.

> **Current state:** `erp/index.html` in this folder is a standalone staff
> *gateway placeholder* (also copied to `public/erp/index.html`). Replace it
> with the real ERP application when development begins — nothing in the
> public website needs to change.

---
© Kekulawala Advertising · Internal system — do not distribute.
