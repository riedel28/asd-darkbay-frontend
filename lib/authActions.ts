'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginSchema, registerSchema } from '@/lib/authSchemas';
import { AUTH_COOKIE_NAME } from '@/lib/auth';
import { fetchAPI } from '@/lib/fetchAPI';

type AuthResponse = {
  token?: string;
  access_token?: string;
};

export async function loginAction(formData: FormData) {
  const credentials = loginSchema.parse({
    username: formData.get('username'),
    password: formData.get('password')
  });

  const response = await fetchAPI('/auth/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials),
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(
      `DarkBay auth request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as AuthResponse;
  const token = data.access_token;

  if (token) {
    const cookieStore = await cookies();

    cookieStore.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    });
  }

  redirect('/');
}

export async function registerAction(formData: FormData) {
  const credentials = registerSchema.parse({
    username: formData.get('username'),
    password: formData.get('password')
  });

  const response = await fetchAPI('/auth/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials),
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(
      `DarkBay auth request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as AuthResponse;
  const token = data.access_token;
  console.log(token);

  if (token) {
    const cookieStore = await cookies();

    cookieStore.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    });
  }

  redirect(token ? '/' : '/login');
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete(AUTH_COOKIE_NAME);
  redirect('/');
}
