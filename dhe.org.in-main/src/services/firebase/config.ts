/**
 * Firebase web app config. Public keys are safe in the client bundle.
 * Set NEXT_PUBLIC_FIREBASE_* in .env.local / Vercel to override defaults per environment.
 */
const defaultConfig = {
  apiKey: "AIzaSyDjxu8tbP-YIF6AuDBZfptry9e-ZUQkDVw",
  authDomain: "dhe-org-in.firebaseapp.com",
  projectId: "dhe-org-in",
  storageBucket: "dhe-org-in.appspot.com",
  messagingSenderId: "705897582693",
  appId: "1:705897582693:web:8f4e5f81e73d8818cbb68c",
  measurementId: "G-VZ55ESSK6V",
} as const;

function envOrDefault(
  envValue: string | undefined,
  fallback: string
): string {
  const trimmed = envValue?.trim();
  return trimmed || fallback;
}

export const firebaseConfig = {
  apiKey: envOrDefault(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    defaultConfig.apiKey
  ),
  authDomain: envOrDefault(
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    defaultConfig.authDomain
  ),
  projectId: envOrDefault(
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    defaultConfig.projectId
  ),
  storageBucket: envOrDefault(
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    defaultConfig.storageBucket
  ),
  messagingSenderId: envOrDefault(
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    defaultConfig.messagingSenderId
  ),
  appId: envOrDefault(
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    defaultConfig.appId
  ),
  measurementId: envOrDefault(
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    defaultConfig.measurementId
  ),
} as const;

export function isFirebaseEnvConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim() &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim()
  );
}
