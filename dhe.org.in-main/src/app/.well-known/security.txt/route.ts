import { dheOfficialContact } from "@/data/institution";

export function GET() {
  const body = [
    "Contact: DHE Security",
    `Email: ${dheOfficialContact.email}`,
    "Policy: https://www.dhe.org.in/privacy-policy",
    "Preferred-Languages: en, hi",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
