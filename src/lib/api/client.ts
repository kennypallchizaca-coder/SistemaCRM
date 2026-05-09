/** Define el cliente HTTP compartido para consumir la API. */

import { env } from '@/lib/config/env';
import type { ApiError } from '@/lib/types/api.types';

const BASE_URL = env.API_BASE_URL;
const DEFAULT_TIMEOUT_MS = 10_000;
const TOKEN_STORAGE_KEY = 'jwt:v1';
const LEGACY_TOKEN_STORAGE_KEY = 'jwt';

let onUnauthorized: (() => void) | null = null;

export function registerUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

export function clearUnauthorizedHandler() {
  onUnauthorized = null;
}

interface RequestOptions extends RequestInit {
  token?: string;
  timeoutMs?: number;
}

function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY) ?? localStorage.getItem(LEGACY_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, timeoutMs = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options;

  const resolvedToken = token !== undefined ? token : (getStoredToken() ?? undefined);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (resolvedToken) {
    headers['Authorization'] = `Bearer ${resolvedToken}`;
  }

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
      // AuthContext inyecta este handler para cerrar sesión sin acoplar el cliente HTTP a React.
      if (response.status === 401 && onUnauthorized) {
        onUnauthorized();
      }

      const errorBody = await response.json().catch(() => ({}));
      const apiError: ApiError = {
        status: response.status,
        name: errorBody?.error?.name ?? 'ApiError',
        message: errorBody?.error?.message ?? response.statusText,
        details: errorBody?.error?.details,
      };
      throw apiError;
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  } catch (err) {
    clearTimeout(timer);

    if ((err as ApiError).status !== undefined) throw err;

    throw {
      status: 0,
      name: 'NetworkError',
      message: (err as Error).message ?? 'Error de conexión con el servidor',
    } satisfies ApiError;
  }
}

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
