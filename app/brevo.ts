import "server-only";

import { env } from "cloudflare:workers";

type BrevoContact = {
  email: string;
};

/**
 * Keeps the mailing provider behind a server-only boundary. The API key is
 * supplied as the BREVO_API_KEY runtime secret and is never sent to browsers.
 */
export async function syncGuideSubscriberToBrevo(contact: BrevoContact) {
  const apiKey = env.BREVO_API_KEY?.trim();
  if (!apiKey) {
    console.warn("Brevo sync skipped: BREVO_API_KEY is not configured.");
    return;
  }

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({ email: contact.email, updateEnabled: true }),
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);
    throw new Error(`Brevo contact sync failed (${response.status}): ${detail}`);
  }
}
