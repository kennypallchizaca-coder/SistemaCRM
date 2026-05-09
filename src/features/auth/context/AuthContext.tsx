/** Gestiona la sesión autenticada y expone el contexto de auth. */

import React, { useState, useCallback, useEffect } from 'react';
import { authService } from '../services/auth.service';
import type { AuthResponse } from '../services/auth.service';
import { registerUnauthorizedHandler, clearUnauthorizedHandler } from '@/lib/api';
import { AuthContext, STORAGE_KEYS } from './auth-context';
import type { AuthState, AuthUser } from './auth-context';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const rawUser = localStorage.getItem(STORAGE_KEYS.USER);

      if (token && rawUser) {
        const user: AuthUser = JSON.parse(rawUser);
        return {
          user,
          token,
          sessionStatus: 'authenticated',
          isAuthenticated: true,
          isLoading: false,
        };
      }
    } catch {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    }

    return {
      user: null,
      token: null,
      sessionStatus: 'guest',
      isAuthenticated: false,
      isLoading: false,
    };
  });
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setState({
      user: null,
      token: null,
      sessionStatus: 'guest',
      isAuthenticated: false,
      isLoading: false,
    });
    setError(null);
  }, []);

  useEffect(() => {
    // Permite que cualquier 401 de la API cierre la sesión desde un único punto.
    registerUnauthorizedHandler(logout);
    return () => clearUnauthorizedHandler();
  }, [logout]);

  const login = useCallback(async (identifier: string, password: string) => {
    setError(null);
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response: AuthResponse = await authService.login(identifier, password);

      localStorage.setItem(STORAGE_KEYS.TOKEN, response.jwt);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

      setState({
        user: response.user,
        token: response.jwt,
        sessionStatus: 'authenticated',
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err: unknown) {
      const message = err instanceof Error
        ? err.message
        : 'Error al iniciar sesión. Verifica tus credenciales.';

      setError(message);
      setState((prev) => ({ ...prev, isLoading: false }));

      // La página conserva el control del error inline después de actualizar el contexto.
      throw err;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};
