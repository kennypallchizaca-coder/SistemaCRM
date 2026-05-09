/** Combina datos estáticos con contenido remoto de la landing. */

import { useState, useEffect } from 'react';
import { landingService } from '@/features/landing/services/landing.service';
import { env } from '@/lib/config/env';
import {
  HERO_SLIDES,
  GRUPOS_INVESTIGACION,
  AGRUPACIONES,
  ALIANZAS,
  EMPRESAS,
} from '@/features/landing/data/landing.data';

interface RemoteLandingItem {
  id?: number;
  documentId?: string | number;
  titulo?: string;
  nombre?: string;
  descripcion?: string;
  imagen?: { url?: string };
  logo?: { url?: string };
}

interface StrapiListResponse {
  data?: RemoteLandingItem[];
}

function isStrapiListResponse(value: unknown): value is StrapiListResponse {
  return typeof value === 'object' && value !== null && 'data' in value;
}

function settledData(result: PromiseSettledResult<unknown>): RemoteLandingItem[] {
  if (result.status !== 'fulfilled' || !isStrapiListResponse(result.value)) {
    return [];
  }

  return Array.isArray(result.value.data) ? result.value.data : [];
}

export const useLandingData = () => {
  const [state, setState] = useState({
    data: {
      heroSlides: HERO_SLIDES,
      researchGroups: GRUPOS_INVESTIGACION,
      asuGroups: AGRUPACIONES,
      alliances: ALIANZAS,
      companies: EMPRESAS,
    },
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;
    const strapiUrl = env.API_BASE_URL.replace('/api', '');

    const fetchData = async () => {
      try {
        const [
          heroRes,
          researchRes,
          asuRes,
          allianceRes,
          companyRes
        ] = await Promise.allSettled([
          landingService.getHeroSlides(),
          landingService.getResearchGroups(),
          landingService.getAsuGroups(),
          landingService.getAlliances(),
          landingService.getCompanies()
        ]);

        if (!isMounted) return;

        setState(prev => {
          const newData = { ...prev.data };
          const heroData = settledData(heroRes);
          const researchData = settledData(researchRes);
          const asuData = settledData(asuRes);
          const allianceData = settledData(allianceRes);
          const companyData = settledData(companyRes);

          if (heroData.length > 0) {
              newData.heroSlides = heroData.map((item) => ({
                src: item.imagen?.url ? `${strapiUrl}${item.imagen.url}` : prev.data.heroSlides[0]?.src,
                alt: item.titulo || 'UPS Hero Slide',
              }));
          }

          if (researchData.length > 0) {
              newData.researchGroups = researchData.map((item) => ({
                id: item.id ?? Number(item.documentId ?? 0),
                title: item.nombre ?? '',
                description: item.descripcion || '',
                image: item.imagen?.url ? `${strapiUrl}${item.imagen.url}` : prev.data.researchGroups[0]?.image,
              }));
          }

          if (asuData.length > 0) {
              newData.asuGroups = asuData.map((item) => ({
                id: item.id ?? Number(item.documentId ?? 0),
                title: item.nombre ?? '',
                description: item.descripcion || '',
                image: item.imagen?.url ? `${strapiUrl}${item.imagen.url}` : prev.data.asuGroups[0]?.image,
              }));
          }

          if (allianceData.length > 0) {
              newData.alliances = allianceData.map((item) => ({
                id: item.id ?? Number(item.documentId ?? 0),
                name: item.nombre ?? '',
                logo: item.logo?.url ? `${strapiUrl}${item.logo.url}` : prev.data.alliances[0]?.logo,
              }));
          }

          if (companyData.length > 0) {
              newData.companies = companyData.map((item) => ({
                name: item.nombre ?? '',
                image: item.logo?.url ? `${strapiUrl}${item.logo.url}` : prev.data.companies[0]?.image,
              }));
          }

          return { data: newData, isLoading: false };
        });
      } catch {
        // La landing sigue usable con datos estáticos si Strapi no responde.
        if (isMounted) setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data: state.data, isLoading: state.isLoading };
};
