/**
 * Server-only environment variables (API routes, server components).
 * Never import this module from client components.
 */

import nodemailer from "nodemailer";

export type SmtpConfig = {
  host?: string;
  port?: number;
  service: string;
  user: string;
  pass: string;
  from: string;
};

export function getSmtpConfig(): SmtpConfig | null {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    return null;
  }

  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const port = portRaw ? Number(portRaw) : undefined;

  return {
    host: host || undefined,
    port: port && Number.isFinite(port) ? port : undefined,
    service: process.env.SMTP_SERVICE?.trim() || "gmail",
    user,
    pass,
    from: process.env.SMTP_FROM?.trim() || user,
  };
}

export function createSmtpTransporter(smtp: SmtpConfig) {
  if (smtp.host) {
    return nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port ?? 587,
      secure: false,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  }

  return nodemailer.createTransport({
    service: smtp.service,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });
}

export function isSmtpConfigured(): boolean {
  return getSmtpConfig() !== null;
}
