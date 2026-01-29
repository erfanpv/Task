'use server';

import { api } from '@/lib/api';
import { setAuthCookie, clearAuthCookies } from '@/lib/auth';
import { RegisterData, LoginCredentials, AuthResponse } from '@/types';

export async function registerUser(data: RegisterData) {
  try {
    const response = await api.register(data);
    
    if (response.token && response.user) {
      await setAuthCookie(response as AuthResponse);
    }
    
    return { success: true, data: response };
  } catch (error) {
    console.error('Registration error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Registration failed' 
    };
  }
}

export async function loginUser(credentials: LoginCredentials) {
  try {
    const response = await api.login(credentials);
    
    if (response.token && response.user) {
      await setAuthCookie(response as AuthResponse);
    }
    
    return { success: true, data: response };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Login failed' 
    };
  }
}

export async function logoutUser() {
  try {
    await clearAuthCookies();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Logout failed' 
    };
  }
}
