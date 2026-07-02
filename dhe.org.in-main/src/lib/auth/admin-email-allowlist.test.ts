import { describe, expect, it, afterEach } from "vitest";
import {
  getAdminEmailAllowlist,
  isEmailAdminAllowed,
} from "@/lib/auth/admin-email-allowlist";

describe("admin email allowlist", () => {
  const prev = process.env.ADMIN_EMAIL_ALLOWLIST;

  afterEach(() => {
    if (prev === undefined) delete process.env.ADMIN_EMAIL_ALLOWLIST;
    else process.env.ADMIN_EMAIL_ALLOWLIST = prev;
  });

  it("parses comma-separated emails", () => {
    process.env.ADMIN_EMAIL_ALLOWLIST = "Admin@Example.com, other@test.org";
    expect(getAdminEmailAllowlist()).toEqual(["admin@example.com", "other@test.org"]);
    expect(isEmailAdminAllowed("admin@example.com")).toBe(true);
    expect(isEmailAdminAllowed("unknown@test.org")).toBe(false);
  });

  it("returns false when allowlist empty", () => {
    delete process.env.ADMIN_EMAIL_ALLOWLIST;
    delete process.env.NEXT_PUBLIC_NOTICE_ADMIN_EMAILS;
    expect(isEmailAdminAllowed("admin@example.com")).toBe(false);
  });
});
