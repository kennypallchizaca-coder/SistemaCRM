/** Consulta el contenido dinámico de la landing en la API. */

import { apiClient, withPopulate, withSort } from '@/lib/api';
import { ENDPOINTS } from '@/lib/api/endpoints';
import type { StrapiCollectionResponse, StrapiMedia } from '@/lib/api';

export interface LandingRemoteItem {
  id?: number;
  documentId?: string;
  titulo?: string;
  nombre?: string;
  descripcion?: string;
  imagen?: StrapiMedia;
  logo?: StrapiMedia;
}

export const landingService = {
  getHeroSlides: async () => {
    return apiClient.get<StrapiCollectionResponse<LandingRemoteItem>>(
      withPopulate(ENDPOINTS.LANDING.HERO_SLIDES, '*')
    );
  },

  getResearchGroups: async () => {
    return apiClient.get<StrapiCollectionResponse<LandingRemoteItem>>(
      withSort(ENDPOINTS.RESEARCH_GROUPS.LIST, 'orden:asc', { populate: '*' })
    );
  },

  getAsuGroups: async () => {
    return apiClient.get<StrapiCollectionResponse<LandingRemoteItem>>(
      withSort(ENDPOINTS.LANDING.ASU_GROUPS, 'orden:asc', { populate: '*' })
    );
  },

  getAlliances: async () => {
    return apiClient.get<StrapiCollectionResponse<LandingRemoteItem>>(
      withSort(ENDPOINTS.LANDING.ALLIANCES, 'orden:asc', { populate: '*' })
    );
  },

  getCompanies: async () => {
    return apiClient.get<StrapiCollectionResponse<LandingRemoteItem>>(
      withSort(ENDPOINTS.LANDING.COMPANIES, 'orden:asc', { populate: '*' })
    );
  },

  getLandingContent: async () => {
    return apiClient.get<StrapiCollectionResponse<LandingRemoteItem>>(
      withPopulate(ENDPOINTS.LANDING.CONTENT, 'deep')
    );
  },
};
