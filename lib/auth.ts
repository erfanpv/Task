import { cookies } from 'next/headers';
import { AuthResponse } from '@/types';

const TOKEN_COOKIE_NAME = 'auth_token';
const USER_COOKIE_NAME = 'user_data';

export async function setAuthCookie(authResponse: AuthResponse) {
  const cookieStore = await cookies();
  
  cookieStore.set(TOKEN_COOKIE_NAME, authResponse.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  cookieStore.set(USER_COOKIE_NAME, JSON.stringify(authResponse.user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE_NAME)?.value || null;
}

export async function getUser(): Promise<any | null> {
  const cookieStore = await cookies();
  const userData = cookieStore.get(USER_COOKIE_NAME)?.value;
  
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE_NAME);
  cookieStore.delete(USER_COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return !!token;
}
