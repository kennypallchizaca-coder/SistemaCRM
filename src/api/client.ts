/**
 * api/client.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Cliente HTTP centralizado.
 *
 * Actualmente usa fetch nativo. Cuando el backend esté listo:
 *   1. Instala axios: npm install axios
 *   2. Reemplaza el fetch por una instancia de axios con interceptors.
 *
 * Estructura preparada para:
 *   - Base URL configurable por entorno
 *   - Headers de autenticación (JWT Bearer)
 *   - Manejo centralizado de errores
 *   - Timeout
 */

import { env } from '../config/env';
import type { ApiError } from '../types/api.types';

const BASE_URL = env.API_BASE_URL;
const DEFAULT_TIMEOUT_MS = 10_000;

/** Opciones extendidas para las peticiones */
interface RequestOptions extends RequestInit {
  /** Token de autenticación JWT (se agrega automáticamente si se provee) */
  token?: string;
  /** Timeout en ms (por defecto 10 s) */
  timeoutMs?: number;
}

/**
 * Wrapper centralizado sobre fetch.
 * Lanza un `ApiError` tipado si la respuesta no es exitosa.
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, timeoutMs = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options;

  // Construir headers base
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  // Adjuntar token JWT si existe
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Abort controller para timeout
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      // Intentar parsear el error estructurado de la API
      const errorBody = await response.json().catch(() => ({}));
      const apiError: ApiError = {
        status: response.status,
        name: errorBody?.error?.name ?? 'ApiError',
        message: errorBody?.error?.message ?? response.statusText,
        details: errorBody?.error?.details,
      };
      throw apiError;
    }

    // 204 No Content → no parsear body
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  } catch (err) {
    clearTimeout(timer);
    // Re-lanzar errores estructurados
    if ((err as ApiError).status !== undefined) throw err;
    // Convertir errores de red / timeout en ApiError
    throw {
      status: 0,
      name: 'NetworkError',
      message: (err as Error).message ?? 'Error de conexión',
    } satisfies ApiError;
  }
}

/** Métodos HTTP convenientes */
export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
