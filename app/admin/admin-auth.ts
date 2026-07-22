import "server-only";

import { getChatGPTUser, requireChatGPTUser } from "../chatgpt-auth";

function isAllowedAdmin(email: string) {
  const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(allowedEmail && email.trim().toLowerCase() === allowedEmail);
}

export async function getAdminUser() {
  const user = await getChatGPTUser();
  return user && isAllowedAdmin(user.email) ? user : null;
}

export async function requireAdminUser(returnTo = "/admin") {
  const user = await requireChatGPTUser(returnTo);
  return isAllowedAdmin(user.email) ? user : null;
}
