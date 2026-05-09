/** Consulta el contenido dinámico de la landing en la API. */

import { apiClient } from '@/lib/api';
import { ENDPOINTS } from '@/lib/api/endpoints';

export const landingService = {
  getHeroSlides: async () => {
    return apiClient.get(ENDPOINTS.LANDING.HERO_SLIDES);
  },
  
  getResearchGroups: async () => {
    return apiClient.get(`${ENDPOINTS.RESEARCH_GROUPS.LIST}?sort=orden:asc&populate=*`);
  },

  getAsuGroups: async () => {
    return apiClient.get(`${ENDPOINTS.LANDING.ASU_GROUPS}&sort=orden:asc`);
  },

  getAlliances: async () => {
    return apiClient.get(`${ENDPOINTS.LANDING.ALLIANCES}&sort=orden:asc`);
  },

  getCompanies: async () => {
    return apiClient.get(`${ENDPOINTS.LANDING.COMPANIES}&sort=orden:asc`);
  },

  getLandingContent: async () => {
    return apiClient.get(ENDPOINTS.LANDING.CONTENT);
  }
};
