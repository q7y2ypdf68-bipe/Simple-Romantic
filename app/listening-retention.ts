export const LISTENING_CONSENT_VERSION = "2026-08-23-v1";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function addDaysIso(from: Date | string, days: number) {
  const date = typeof from === "string" ? new Date(from) : from;
  return new Date(date.getTime() + days * DAY_IN_MS).toISOString();
}

export function listeningExpiryForStatus(
  status: "new" | "read" | "responded" | "archived",
  from = new Date(),
) {
  if (status === "archived") return addDaysIso(from, 30);
  if (status === "responded") return addDaysIso(from, 90);
  return addDaysIso(from, 180);
}
