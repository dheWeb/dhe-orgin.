# Firestore legacy export files (optional)

Place JSON exports here, then run:

```bash
node scripts/import-firestore-export.mjs
```

Expected files:
- `events.json` — notice board events
- `Donation.json` — donation form submissions
- `Workshop.json` — workshop registrations

Export from Firebase Console → Firestore → Import/Export, or use `gcloud firestore export`.
