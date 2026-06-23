import { cookies } from 'next/headers';

export const AUTH_COOKIE_NAME = 'auth_token';

export async function getAuthToken() {
  const cookieStore = await cookies();

  return cookieStore.get(AUTH_COOKIE_NAME)?.value;
}

export async function isAuthenticated() {
  return Boolean(await getAuthToken());
}
