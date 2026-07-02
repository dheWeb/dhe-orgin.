import { getSiteContent } from "@/lib/cms/site-content";
import {
  PROGRAMS as DEFAULT_PROGRAMS,
  type ProgramDefinition,
} from "@/data/programs/registry";

function parseProgramsJson(
  raw: string | undefined,
  fallback: ProgramDefinition[]
): ProgramDefinition[] {
  if (!raw?.trim()) return fallback;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || !parsed.length) return fallback;
    return parsed as ProgramDefinition[];
  } catch {
    return fallback;
  }
}

export async function getPrograms(): Promise<ProgramDefinition[]> {
  const content = await getSiteContent(["programs_json"]);
  return parseProgramsJson(content.programs_json?.json, DEFAULT_PROGRAMS);
}

export async function getProgramBySlug(
  slug: string
): Promise<ProgramDefinition | undefined> {
  const programs = await getPrograms();
  return programs.find((p) => p.slug === slug);
}

export async function getAllProgramSlugs(): Promise<string[]> {
  const programs = await getPrograms();
  return programs.map((p) => p.slug);
}
