/** Minimal JSON logs for server routes (AUD-216). */
export function logStructured(
  level: "info" | "warn" | "error",
  event: string,
  data?: Record<string, unknown>
): void {
  const line = JSON.stringify({
    level,
    event,
    service: "dhe.org.in",
    ts: new Date().toISOString(),
    ...data,
  });
  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
}
