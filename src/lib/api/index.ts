/** Agrupa las exportaciones públicas de la capa API. */

export { apiClient, registerUnauthorizedHandler, clearUnauthorizedHandler, setAuthToken } from './client';
export { ENDPOINTS } from './endpoints';
export {
  strapiMediaUrl,
  strapiData,
  strapiMediaPath,
  withPopulate,
  withSort,
} from './strapi';
export type {
  StrapiCollectionResponse,
  StrapiCreatePayload,
  StrapiEntityBase,
  StrapiMedia,
  StrapiSingleResponse,
} from './strapi';
