/** Encapsula las peticiones de autenticación contra la API. */

import { apiClient } from '@/lib/api/client';

export interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider?: string;
    confirmed?: boolean;
    blocked?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface RefreshResponse {
  jwt: string;
}

export const authService = {
  async login(identifier: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/local', {
      identifier,
      password,
    }, {
      headers: {
        'X-Strapi-Refresh-Cookie': 'httpOnly',
      },
    });
    return response;
  },

  async refresh(): Promise<RefreshResponse> {
    return apiClient.post<RefreshResponse>('/auth/refresh', {}, {
      auth: false,
      headers: {
        'X-Strapi-Refresh-Cookie': 'httpOnly',
      },
    });
  },

  async me(): Promise<AuthResponse['user']> {
    return apiClient.get<AuthResponse['user']>('/users/me');
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout', {});
  },
};
