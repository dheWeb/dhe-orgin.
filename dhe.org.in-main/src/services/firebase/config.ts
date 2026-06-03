/**
 * Firebase web app config. Public keys are safe to expose in the client bundle;
 * use env vars so staging/production can differ without code changes.
 */
export const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ??
    "AIzaSyDjxu8tbP-YIF6AuDBZfptry9e-ZUQkDVw",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ??
    "dhe-org-in.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "dhe-org-in",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    "dhe-org-in.appspot.com",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "705897582693",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??
    "1:705897582693:web:8f4e5f81e73d8818cbb68c",
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-VZ55ESSK6V",
} as const;
