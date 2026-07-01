/**
 * Pull Vercel env vars — defaults to production (not development).
 * Usage: node scripts/pull-vercel-env.mjs [production|preview|development]
 */
import { execSync } from "child_process";
import { join } from "path";

const target = process.argv[2] ?? "production";
const outfile = `.env.vercel-${target}`;
const monorepoRoot = join(process.cwd(), "..");

console.log(`Pulling ${target} → ${outfile}`);
console.log("Merge into .env.local manually — do not overwrite without a backup.");

execSync(
  `npx vercel env pull ${outfile} --environment=${target} --yes`,
  { cwd: monorepoRoot, stdio: "inherit" }
);

console.log(`Done. Review ${outfile} and copy needed keys into .env.local`);
