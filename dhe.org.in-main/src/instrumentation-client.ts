import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  tracesSampleRate: 0,
  integrations: (integrations) =>
    integrations.filter(
      (integration) =>
        integration.name !== "BrowserTracing" &&
        integration.name !== "Replay" &&
        integration.name !== "Feedback"
    ),
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
