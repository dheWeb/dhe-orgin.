import { afterEach, describe, expect, it } from "vitest";
import { getBrevoApiKeyInfo, isBrevoApiConfigured } from "@/lib/email/send-via-brevo-api";

describe("Brevo API key detection", () => {
  const original = { ...process.env };

  afterEach(() => {
    process.env = { ...original };
  });

  it("returns null when no xkeysib key is set", () => {
    delete process.env.BREVO_API_KEY;
    delete process.env.SMTP_API_KEY_NEW;
    process.env.SMTP_PASS = "xsmtpsib-not-api-key";
    expect(isBrevoApiConfigured()).toBe(false);
    expect(getBrevoApiKeyInfo().key).toBeNull();
  });

  it("prefers BREVO_API_KEY when it is an API key", () => {
    process.env.BREVO_API_KEY = "xkeysib-test-key";
    const info = getBrevoApiKeyInfo();
    expect(info.key).toBe("xkeysib-test-key");
    expect(info.source).toBe("BREVO_API_KEY");
    expect(isBrevoApiConfigured()).toBe(true);
  });
});
