import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Minimal OpenAPI 3 document for public API routes (AUD / I5-07). */
export async function GET() {
  return NextResponse.json({
    openapi: "3.0.3",
    info: {
      title: "DHE Public API",
      version: "1.0.0",
      description: "Public endpoints for dhe.org.in",
    },
    servers: [{ url: "https://www.dhe.org.in" }],
    paths: {
      "/api/health": {
        get: {
          summary: "Health check",
          responses: { "200": { description: "Service OK" } },
        },
      },
      "/api/notices": {
        get: { summary: "Published notices", responses: { "200": { description: "Notice list" } } },
      },
      "/api/visitors": {
        get: { summary: "Visitor counter", responses: { "200": { description: "Count" } } },
      },
      "/api/forms/contact": {
        post: { summary: "Contact form (reCAPTCHA required)", responses: { "200": { description: "Accepted" } } },
      },
      "/api/forms/feedback": {
        post: { summary: "Feedback form", responses: { "200": { description: "Accepted" } } },
      },
      "/api/payments/razorpay/create-order": {
        post: { summary: "Create Razorpay order", responses: { "200": { description: "Order created" } } },
      },
    },
  });
}
