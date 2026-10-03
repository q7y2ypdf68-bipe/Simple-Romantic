import { ADMIN_COOKIE } from "../../../admin/admin-auth";

export async function POST(request: Request) {
  const headers = new Headers({ location: new URL("/", request.url).toString() });
  headers.append("set-cookie", `${ADMIN_COOKIE}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict`);
  return new Response(null, { status: 303, headers });
}
