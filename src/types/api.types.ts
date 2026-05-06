/**
 * types/api.types.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Tipos genéricos para las respuestas de la API.
 * Basado en la estructura de respuesta estándar de Strapi v4,
 * pero adaptable a cualquier backend REST.
 */

/** Envoltura genérica de respuesta exitosa */
export interface ApiResponse<T> {
  data: T;
  meta?: ApiMeta;
}

/** Paginación estándar */
export interface ApiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

/** Error estructurado de la API */
export interface ApiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, unknown>;
}

/** Estado genérico para cualquier petición asíncrona */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  status: RequestStatus;
  error: string | null;
}
