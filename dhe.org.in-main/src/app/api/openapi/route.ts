import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const jsonResponse = {
  description: "JSON response body",
  content: { "application/json": { schema: { type: "object" } } },
};

/** OpenAPI 3 document for public API routes (AUD / I5-07). */
export async function GET() {
  return NextResponse.json({
    openapi: "3.0.3",
    info: {
      title: "DHE Public API",
      version: "1.1.0",
      description:
        "Public endpoints for dhe.org.in. Admin routes require session cookie and are not listed here.",
    },
    servers: [{ url: "https://www.dhe.org.in" }],
    paths: {
      "/api/health": {
        get: {
          summary: "Service health (Razorpay auth, Brevo, Supabase)",
          tags: ["Ops"],
          responses: { "200": jsonResponse },
        },
      },
      "/api/notices": {
        get: {
          summary: "Published notices (marquee + noticeboard)",
          tags: ["Content"],
          responses: { "200": jsonResponse },
        },
      },
      "/api/content": {
        get: {
          summary: "CMS content keys (public site copy)",
          tags: ["Content"],
          parameters: [
            {
              name: "keys",
              in: "query",
              schema: { type: "string" },
              description: "Comma-separated content keys",
            },
          ],
          responses: { "200": jsonResponse },
        },
      },
      "/api/visitors": {
        get: {
          summary: "Visitor counter increment/read",
          tags: ["Analytics"],
          responses: { "200": jsonResponse },
        },
      },
      "/api/receipts/verify": {
        get: {
          summary: "Verify donation receipt by number + email",
          tags: ["Donations"],
          parameters: [
            { name: "receipt_number", in: "query", required: true, schema: { type: "string" } },
            { name: "email", in: "query", required: true, schema: { type: "string", format: "email" } },
          ],
          responses: { "200": jsonResponse, "404": jsonResponse },
        },
      },
      "/api/forms/contact": {
        post: {
          summary: "Contact form submission",
          tags: ["Forms"],
          description: "Requires valid reCAPTCHA token in body.",
          responses: { "200": jsonResponse, "400": jsonResponse },
        },
      },
      "/api/forms/feedback": {
        post: {
          summary: "Feedback form submission",
          tags: ["Forms"],
          responses: { "200": jsonResponse, "400": jsonResponse },
        },
      },
      "/api/forms/workshop": {
        post: {
          summary: "Workshop registration",
          tags: ["Forms"],
          responses: { "200": jsonResponse, "400": jsonResponse },
        },
      },
      "/api/forms/membership": {
        post: {
          summary: "Membership application",
          tags: ["Forms"],
          responses: { "200": jsonResponse, "400": jsonResponse },
        },
      },
      "/api/payments/razorpay/create-order": {
        post: {
          summary: "Create Razorpay order for donation",
          tags: ["Payments"],
          responses: { "200": jsonResponse, "502": jsonResponse },
        },
      },
      "/api/payments/razorpay/verify": {
        post: {
          summary: "Verify Razorpay payment signature after checkout",
          tags: ["Payments"],
          description: "Persists donation, sends receipt email when configured.",
          responses: { "200": jsonResponse, "400": jsonResponse },
        },
      },
      "/api/payments/razorpay-webhook": {
        post: {
          summary: "Razorpay webhook (server-to-server)",
          tags: ["Payments"],
          description: "HMAC-verified; not for browser use.",
          responses: { "200": jsonResponse },
        },
      },
      "/api/cron/health": {
        get: {
          summary: "Cron health ping (Vercel cron every 15 min)",
          tags: ["Ops"],
          description: "Requires Authorization: Bearer CRON_SECRET when set.",
          responses: { "200": jsonResponse },
        },
      },
    },
  });
}
