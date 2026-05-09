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

export const authService = {
  async login(identifier: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/local', {
      identifier,
      password,
    });
    return response;
  },
};
