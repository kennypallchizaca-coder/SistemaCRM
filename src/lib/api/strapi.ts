/** Define utilidades y tipos reutilizables para respuestas de Strapi. */

export interface StrapiEntityBase {
  id: number;
  documentId?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface StrapiMedia extends StrapiEntityBase {
  url?: string;
  alternativeText?: string | null;
  name?: string;
  mime?: string;
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type StrapiCreatePayload<T> = {
  data: T;
};

function withQuery(endpoint: string, params: Record<string, string | number | boolean>): string {
  const query = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );

  return `${endpoint}?${query.toString()}`;
}

export function withPopulate(endpoint: string, populate: string): string {
  return withQuery(endpoint, { populate });
}

export function withSort(endpoint: string, sort: string, extraParams: Record<string, string | number | boolean> = {}): string {
  return withQuery(endpoint, { ...extraParams, sort });
}

function strapiUrl(apiBaseUrl: string): string {
  return apiBaseUrl.replace(/\/api\/?$/, '');
}

export function strapiMediaUrl(apiBaseUrl: string, url?: string): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;

  return `${strapiUrl(apiBaseUrl)}${url}`;
}
