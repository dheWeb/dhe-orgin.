import { readFileSync } from "fs";
import { join } from "path";

const envPath = join(process.cwd(), process.argv[2] ?? ".env.local");
const env = {};
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  let val = trimmed.slice(eq + 1).trim();
  if (
    (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
  ) {
    val = val.slice(1, -1);
  }
  env[trimmed.slice(0, eq)] = val;
}

const xkey = [];
const xsmtp = [];
for (const [k, v] of Object.entries(env)) {
  const t = v?.trim();
  if (!t) continue;
  if (t.startsWith("xkeysib-")) xkey.push(k);
  if (t.startsWith("xsmtpsib-")) xsmtp.push(k);
}

console.log("File:", envPath);
console.log("xkeysib vars:", xkey.length ? xkey.join(", ") : "(none)");
console.log("xsmtpsib vars:", xsmtp.length ? xsmtp.join(", ") : "(none)");
