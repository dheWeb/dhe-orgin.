# Supabase bootstrap (replaces retired Firebase)

Firestore data was not recoverable after project/database deletion.
Use the bootstrap script to seed starter notices and CMS keys:

```powershell
cd dhe.org.in-main
npm run seed:bootstrap
```

Safe to re-run — only fills empty tables / missing CMS keys.
