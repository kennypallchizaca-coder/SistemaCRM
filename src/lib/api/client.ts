/** Define el cliente HTTP compartido para consumir la API. */

import { env } from '@/lib/config/env';
import type { ApiError } from '@/lib/types/api.types';

const BASE_URL = env.API_BASE_URL;
const DEFAULT_TIMEOUT_MS = 10_000;

let onUnauthorized: (() => void) | null = null;
let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function registerUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

export function clearUnauthorizedHandler() {
  onUnauthorized = null;
}

interface RequestOptions extends RequestInit {
  auth?: boolean;
  token?: string;
  timeoutMs?: number;
}

class HttpApiError extends Error implements ApiError {
  status: number;
  name: string;
  details?: Record<string, unknown>;

  constructor(error: ApiError) {
    super(error.message);
    this.status = error.status;
    this.name = error.name;
    this.details = error.details;
  }
}

function getStoredToken(): string | null {
  return authToken;
}

function buildUrl(endpoint: string): string {
  if (/^https?:\/\//i.test(endpoint)) return endpoint;

  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${BASE_URL}${normalizedEndpoint}`;
}

async function readResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined;

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { auth = true, token, timeoutMs = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options;

  const resolvedToken = auth
    ? (token !== undefined ? token : (getStoredToken() ?? undefined))
    : undefined;

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
    const response = await fetch(buildUrl(endpoint), {
      ...fetchOptions,
      headers,
      credentials: 'include',
      referrerPolicy: 'strict-origin-when-cross-origin',
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      // AuthContext inyecta este handler para cerrar sesión sin acoplar el cliente HTTP a React.
      if (response.status === 401 && onUnauthorized) {
        onUnauthorized();
      }

      const errorBody = await readResponseBody(response).catch(() => ({}));
      const strapiError = typeof errorBody === 'object' && errorBody !== null && 'error' in errorBody
        ? (errorBody as { error?: { name?: string; message?: string; details?: Record<string, unknown> } }).error
        : undefined;
      const apiError: ApiError = {
        status: response.status,
        name: strapiError?.name ?? 'ApiError',
        message: strapiError?.message ?? response.statusText,
        details: strapiError?.details,
      };
      throw new HttpApiError(apiError);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return readResponseBody(response) as Promise<T>;
  } catch (err) {
    clearTimeout(timer);

    if ((err as ApiError).status !== undefined) throw err;

    throw new HttpApiError({
      status: 0,
      name: 'NetworkError',
      message: (err as Error).message ?? 'Error de conexión con el servidor',
    });
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
