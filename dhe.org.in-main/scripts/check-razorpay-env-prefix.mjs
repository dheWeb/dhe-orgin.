import { readFileSync } from "fs";
import { join } from "path";

const envPath = join(process.cwd(), ".env.local");
const text = readFileSync(envPath, "utf8");

for (const key of [
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_ID_NEW",
  "RAZORPAY_KEY_SECRET",
  "RAZORPAY_KEY_SECRET_NEW",
  "RAZORPAY_WEBHOOK_SECRET",
  "RAZORPAY_WEBHOOK_SECRET_NEW",
  "NEXT_PUBLIC_RAZORPAY_KEY_ID",
]) {
  const line = text.split("\n").find((l) => l.startsWith(`${key}=`));
  if (!line) {
    console.log(key, "MISSING");
    continue;
  }
  const value = line.slice(key.length + 1).replace(/^"|"$/g, "").trim();
  console.log(
    key,
    value ? `set len=${value.length} prefix=${value.slice(0, 12)}` : "EMPTY"
  );
}
