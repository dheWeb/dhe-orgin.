/**
 * Remove NEXT_PUBLIC_FIREBASE_* lines from dhe.org.in-main/.env.local
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const envPath = join(process.cwd(), ".env.local");
if (!existsSync(envPath)) {
  console.log("No .env.local found");
  process.exit(0);
}

const lines = readFileSync(envPath, "utf8").split("\n");
const kept = lines.filter((line) => !/^NEXT_PUBLIC_FIREBASE_/i.test(line.trim()));
const removed = lines.length - kept.length;

writeFileSync(envPath, kept.join("\n").replace(/\n?$/, "\n"), "utf8");
console.log(`Removed ${removed} Firebase env line(s) from .env.local`);
