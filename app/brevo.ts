import "server-only";

import { env } from "cloudflare:workers";

type BrevoContact = {
  email: string;
};

type BrevoNotification = {
  subject: string;
  text: string;
  html: string;
};

const siteUrl = "https://simple-and-romantic.simple-and-romantic.workers.dev";

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

/** Sends private, operational notices to the site administrator. */
export async function sendBrevoNotification(notification: BrevoNotification) {
  const apiKey = env.BREVO_API_KEY?.trim();
  const recipient = env.ADMIN_EMAIL?.trim();
  const sender = env.BREVO_SENDER_EMAIL?.trim() || recipient;

  if (!apiKey || !recipient || !sender) {
    console.warn("Brevo notification skipped: email configuration is incomplete.");
    return;
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { email: sender, name: "Simple & Romantic" },
      to: [{ email: recipient }],
      subject: notification.subject,
      textContent: notification.text,
      htmlContent: notification.html,
      tags: ["site-notification"],
    }),
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);
    throw new Error(`Brevo notification failed (${response.status}): ${detail}`);
  }
}

export function escapeEmailHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

export const adminLinks = {
  contacts: `${siteUrl}/admin/contatos`,
  community: `${siteUrl}/admin`,
  listening: `${siteUrl}/admin/escuta`,
};
