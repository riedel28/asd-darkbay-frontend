'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginSchema, registerSchema } from '@/lib/authSchemas';

const AUTH_COOKIE_NAME = 'auth_token';

type AuthResponse = {
  token?: string;
  accessToken?: string;
  access_token?: string;
  [key: string]: unknown;
};

export async function loginAction(formData: FormData) {
  const credentials = loginSchema.parse({
    username: formData.get('username'),
    password: formData.get('password')
  });

  const response = await fetch(
    new URL('/auth/login', process.env.DARKBAY_API_URL),
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
      cache: 'no-store'
    }
  );

  if (!response.ok) {
    throw new Error(
      `DarkBay auth request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as AuthResponse;
  const token = data.token ?? data.accessToken ?? data.access_token;

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

  const response = await fetch(
    new URL('/auth/register', process.env.DARKBAY_API_URL),
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
      cache: 'no-store'
    }
  );

  if (!response.ok) {
    throw new Error(
      `DarkBay auth request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as AuthResponse;
  const token = data.token ?? data.accessToken ?? data.access_token;

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
}
