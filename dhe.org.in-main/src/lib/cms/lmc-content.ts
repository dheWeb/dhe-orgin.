import { getSiteContent } from "@/lib/cms/site-content";
import {
  lmcCurrentMembers,
  lmcCurrentPatrons,
  type LmcMember,
} from "@/data/institution";

export type LmcTableMember = {
  name: string;
  designation: string;
  contact: string;
};

function toTableRow(m: LmcMember): LmcTableMember {
  return {
    name: m.name,
    designation: m.designation,
    contact: m.contact,
  };
}

function parseLmcJson(
  raw: string | undefined,
  fallback: LmcTableMember[]
): LmcTableMember[] {
  if (!raw?.trim()) return fallback;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || !parsed.length) return fallback;
    return parsed as LmcTableMember[];
  } catch {
    return fallback;
  }
}

export async function getLmcPatrons(): Promise<LmcTableMember[]> {
  const content = await getSiteContent(["lmc_patrons_json"]);
  const fallback = lmcCurrentPatrons.map(toTableRow);
  return parseLmcJson(content.lmc_patrons_json?.json, fallback);
}

export async function getLmcMembers(): Promise<LmcTableMember[]> {
  const content = await getSiteContent(["lmc_members_json"]);
  const fallback = lmcCurrentMembers.map(toTableRow);
  return parseLmcJson(content.lmc_members_json?.json, fallback);
}
