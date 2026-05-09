/** Define el contexto y tipos compartidos de autenticación. */

import { createContext } from 'react';

export const STORAGE_KEYS = {
  TOKEN: 'jwt:v1',
  USER: 'user:v1',
} as const;

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  confirmed?: boolean;
}

type SessionStatus = 'unknown' | 'authenticated' | 'guest';

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  sessionStatus: SessionStatus;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextValue extends AuthState {
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
