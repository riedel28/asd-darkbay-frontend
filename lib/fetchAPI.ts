import { getAuthToken } from '@/lib/auth';

export async function fetchAPI(path: string, options: RequestInit = {}) {
  const token = await getAuthToken();
  const headers = new Headers(options.headers);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(new URL(path, process.env.DARKBAY_API_URL), {
    ...options,
    headers
  });
}
