/** Expone el hook de consumo del contexto de autenticación. */

import { use } from 'react';
import { AuthContext } from './auth-context';
import type { AuthContextValue } from './auth-context';

export function useAuth(): AuthContextValue {
  const ctx = use(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return ctx;
}
