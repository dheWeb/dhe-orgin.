import { join } from "path";
import { parseEnvFile } from "./lib/parse-env.mjs";

const envPath = join(process.cwd(), process.argv[2] ?? ".env.local");
const env = parseEnvFile(envPath);
if (!env) {
  console.error("Missing:", envPath);
  process.exit(1);
}

const keys = [
  "BREVO_API_KEY",
  "SMTP_API_KEY_NEW",
  "SMTP_KEY_NEW",
  "MCP_API_KEY_NEW",
  "SMTP_PASS",
];
let found = false;
for (const k of keys) {
  const v = env[k]?.trim();
  if (!v) {
    console.log(`${k}: (missing)`);
    continue;
  }
  found = true;
  const kind = v.startsWith("xkeysib-")
    ? "API key (OK for Brevo REST)"
    : v.startsWith("xsmtpsib-")
      ? "SMTP key (NOT for REST API)"
      : "unknown prefix";
  console.log(`${k}: set, ${kind}`);
}

if (!found) {
  console.log("\nAdd BREVO_API_KEY=xkeysib-... to dhe.org.in-main/.env.local");
  console.log("Brevo → Settings → SMTP & API → API keys (not SMTP keys).");
  process.exit(1);
}
