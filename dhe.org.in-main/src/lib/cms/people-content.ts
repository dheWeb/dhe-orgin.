import { getSiteContent } from "@/lib/cms/site-content";
import {
  DEFAULT_ADVISORY,
  DEFAULT_COORDINATORS,
  type AdvisoryMember,
  type CoordinatorMember,
} from "@/data/people/registry";

export type { CoordinatorMember, AdvisoryMember };

function parseMembersJson<T>(raw: string | undefined, fallback: T[]): T[] {
  if (!raw?.trim()) return fallback;
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) && parsed.length ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export async function getCoordinators(): Promise<CoordinatorMember[]> {
  const content = await getSiteContent(["people_json"]);
  return parseMembersJson(content.people_json?.json, DEFAULT_COORDINATORS);
}

export async function getAdvisoryMembers(): Promise<AdvisoryMember[]> {
  const content = await getSiteContent(["advisory_json"]);
  return parseMembersJson(content.advisory_json?.json, DEFAULT_ADVISORY);
}
