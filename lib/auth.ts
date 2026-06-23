import { cookies } from 'next/headers';

export const AUTH_COOKIE_NAME = 'auth_token';

type AuthTokenPayload = {
  username?: unknown;
};

export async function getAuthToken() {
  const cookieStore = await cookies();

  return cookieStore.get(AUTH_COOKIE_NAME)?.value;
}

export async function isAuthenticated() {
  return Boolean(await getAuthToken());
}

function decodeAuthTokenPayload(token: string) {
  const [, payload] = token.split('.');

  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8')
    ) as AuthTokenPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUsername() {
  const token = await getAuthToken();

  if (!token) {
    return null;
  }

  const payload = decodeAuthTokenPayload(token);
  const username = payload?.username;

  return username as string;
}
