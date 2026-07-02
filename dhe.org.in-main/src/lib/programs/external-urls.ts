import { PROGRAMS, type ProgramDefinition } from "@/data/programs/registry";

/** Official SMK / RASE URLs — prefer CMS `programs_json` when present. */
export const SMK_PROGRAM_SLUG = "shiksha-mahakumbh";

export const DEFAULT_SMK_SITE_URL = "https://www.rase.co.in/";
export const DEFAULT_SMK_REGISTRATION_URL =
  "https://www.rase.co.in/registration/Single_Registration";

export function resolveProgramUrls(
  program: ProgramDefinition | undefined
): { siteUrl: string; registrationUrl: string } {
  const registrationUrl =
    program?.externalRegistrationUrl?.trim() ||
    (program?.external && program.href?.startsWith("http") ? program.href : undefined) ||
    DEFAULT_SMK_REGISTRATION_URL;
  const siteUrl =
    program?.externalSiteUrl?.trim() || DEFAULT_SMK_SITE_URL;
  return { siteUrl, registrationUrl };
}

export function getSmkUrlsFromPrograms(
  programs: ProgramDefinition[]
): { siteUrl: string; registrationUrl: string } {
  const smk = programs.find((p) => p.slug === SMK_PROGRAM_SLUG);
  return resolveProgramUrls(smk);
}

export function getDefaultSmkUrls() {
  return resolveProgramUrls(PROGRAMS.find((p) => p.slug === SMK_PROGRAM_SLUG));
}
