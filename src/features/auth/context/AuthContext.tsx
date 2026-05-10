/** Gestiona la sesión autenticada y expone el contexto de auth. */

import React, { useState, useCallback, useEffect } from 'react';
import { authService } from '../services/auth.service';
import type { AuthResponse } from '../services/auth.service';
import { registerUnauthorizedHandler, clearUnauthorizedHandler, setAuthToken } from '@/lib/api';
import { AuthContext } from './auth-context';
import type { AuthState } from './auth-context';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    sessionStatus: 'unknown',
    isAuthenticated: false,
    isLoading: true,
  });
  const [error, setError] = useState<string | null>(null);

  const clearSession = useCallback(() => {
    setAuthToken(null);
    localStorage.removeItem('jwt:v1');
    localStorage.removeItem('jwt');
    localStorage.removeItem('user:v1');
    setState({
      user: null,
      token: null,
      sessionStatus: 'guest',
      isAuthenticated: false,
      isLoading: false,
    });
    setError(null);
  }, []);

  const logout = useCallback(async () => {
    try {
      if (state.token) {
        await authService.logout();
      }
    } catch {
      // Aunque el backend no responda, la sesión local debe cerrarse.
    } finally {
      clearSession();
    }
  }, [clearSession, state.token]);

  useEffect(() => {
    // Permite que cualquier 401 de la API cierre la sesión desde un único punto.
    registerUnauthorizedHandler(clearSession);
    return () => clearUnauthorizedHandler();
  }, [clearSession]);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const refreshed = await authService.refresh();
        setAuthToken(refreshed.jwt);
        const user = await authService.me();

        if (!isMounted) return;

        setState({
          user,
          token: refreshed.jwt,
          sessionStatus: 'authenticated',
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        setAuthToken(null);
        localStorage.removeItem('jwt:v1');
        localStorage.removeItem('jwt');
        localStorage.removeItem('user:v1');
        if (!isMounted) return;

        setState({
          user: null,
          token: null,
          sessionStatus: 'guest',
          isAuthenticated: false,
          isLoading: false,
        });
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (identifier: string, password: string) => {
    setError(null);
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response: AuthResponse = await authService.login(identifier, password);

      setAuthToken(response.jwt);

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
