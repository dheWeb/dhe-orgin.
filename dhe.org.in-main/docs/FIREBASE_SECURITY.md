# Firebase security guidelines (DHE website)

Client-side checks (e.g. `isNoticeAdmin()` on `/noticeboarddata`) only hide UI. **Firestore and Storage rules must enforce access on the server.**

## Recommended rules (adjust in Firebase Console)

### Firestore `events` collection

- **read:** `true` (public notices on homepage and `/noticeboard`)
- **write:** `request.auth != null && request.auth.token.email in ['admin@example.com']`

Replace with your admin emails or custom claims.

### Firestore `visitors`, `contactMessages`, donations

- **read:** admin only or disabled from client
- **create:** authenticated or rate-limited anonymous writes as required
- **update/delete:** admin only

### Storage `files/*`

- **read:** public if notice images must be hot-linked
- **write:** admin auth only

## Environment variables

- `NEXT_PUBLIC_NOTICE_ADMIN_EMAILS` — UI allowlist for notice admin panel
- Firebase config via `NEXT_PUBLIC_FIREBASE_*` — use separate projects for dev/staging/prod

## Operational checklist

1. Rotate any credentials that were committed to git (SMTP app password).
2. Enable Firebase App Check for production.
3. Review Firebase Authentication authorized domains.
4. Audit Storage download URLs for sensitive uploads.
