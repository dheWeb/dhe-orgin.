import { readFileSync, existsSync } from "fs";
import { join } from "path";

/** Parse .env file; strips optional surrounding quotes (matches dotenv behavior). */
export function parseEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return null;
  }
  const env = {};
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

export function loadEnvLocal(cwd = process.cwd()) {
  return parseEnvFile(join(cwd, ".env.local")) ?? {};
}
