import { describe, expect, it, beforeEach, afterEach } from "vitest";
import {
  isAdminAuthorized,
  isAdminGateConfigured,
} from "./admin-gate";

describe("admin-gate", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
    process.env.ADMIN_USERNAME = "admin";
    process.env.ADMIN_PASSWORD = "secret-pass";
    delete process.env.VERCEL;
  });

  afterEach(() => {
    process.env = env;
  });

  it("requires basic auth with username and password", () => {
    const token = Buffer.from("admin:secret-pass").toString("base64");
    expect(isAdminAuthorized(`Basic ${token}`)).toBe(true);
    expect(isAdminAuthorized("Basic wrong")).toBe(false);
  });

  it("rejects bearer-only password auth", () => {
    expect(isAdminAuthorized("Bearer secret-pass")).toBe(false);
  });

  it("reports configured when credentials exist", () => {
    expect(isAdminGateConfigured()).toBe(true);
  });
});
