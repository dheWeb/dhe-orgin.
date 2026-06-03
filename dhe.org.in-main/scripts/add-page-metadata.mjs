import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(__dirname, "..", "src", "app");

const SERVER_PAGE_KEYS = {
  contact: "contact",
  advisory: "advisory",
  committee: "committee",
  messages: "messages",
  people: "people",
  donation: "donation",
  contribute: "contribute",
  Members: "Members",
  registrationForm: "registrationForm",
  accountdetails: "accountdetails",
  logos: "logos",
  books: "books",
  journals: "journals",
  feedback: "feedback",
  residentialcamps: "residentialcamps",
  comingsoon: "comingsoon",
};

const SKIP_DIRS = new Set([
  "noticeboard",
  "noticeboarddata",
  "workshop",
  "upcomingevent",
  "structure",
  "pastevent",
  "donationdatadekh",
  "WD",
  "api",
  "component",
]);

const CELL_SLUGS = [
  "art", "astrology", "atl", "csr", "ecommerce", "environment", "event",
  "foreign", "grievance", "health", "hei", "industry", "ipr", "it", "lms",
  "olympiad", "parenting", "premiumschool", "publication", "rd", "sports",
  "spritual", "super100", "tms", "udyam",
];

function injectMetadata(filePath, importLine, exportLine) {
  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes("export const metadata")) {
    return false;
  }

  const block = `${importLine}\n\n${exportLine}\n\n`;

  if (content.match(/^["']use client["']/)) {
    const nl = content.includes("\r\n") ? "\r\n" : "\n";
    const end = content.indexOf(nl) + nl.length;
    content = content.slice(0, end) + block + content.slice(end);
  } else {
    content = block + content;
  }

  fs.writeFileSync(filePath, content);
  return true;
}

let count = 0;

for (const [folder, key] of Object.entries(SERVER_PAGE_KEYS)) {
  const pagePath = path.join(appDir, folder, "page.tsx");
  if (!fs.existsSync(pagePath)) continue;
  if (
    injectMetadata(
      pagePath,
      `import { createPageMetadata } from "@/lib/seo/build-metadata";`,
      `export const metadata = createPageMetadata("${key}");`
    )
  ) {
    count++;
  }
}

for (const slug of CELL_SLUGS) {
  const pagePath = path.join(appDir, "cells", slug, "page.tsx");
  if (!fs.existsSync(pagePath)) continue;
  if (
    injectMetadata(
      pagePath,
      `import { createCellMetadata } from "@/lib/seo/build-metadata";`,
      `export const metadata = createCellMetadata("${slug}");`
    )
  ) {
    count++;
  }
}

console.log(`Updated ${count} page.tsx files with metadata.`);
