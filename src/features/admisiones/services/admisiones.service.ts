/** Envía y normaliza solicitudes de interesados para Strapi. */

import type { InteresadoFormData, Interesado } from '../types/admisiones.types';
import { apiClient, ENDPOINTS } from '@/lib/api';
import type { StrapiCreatePayload, StrapiEntityBase, StrapiSingleResponse } from '@/lib/api';
import { sanitizeEmail, sanitizePhone, sanitizeText } from '@/lib/security/sanitize';

type InteresadoPayload = {
  nombre_completo: string;
  telefono: string;
  correo: string;
  institucion_educativa: string;
  evento: string;
  interes_principal: string;
  observaciones: string;
};

export async function registrarInteresado(
  data: InteresadoFormData
): Promise<Interesado> {
  // Los nombres enviados deben coincidir con el schema de la colección en Strapi.
  const payload: StrapiCreatePayload<InteresadoPayload> = {
    data: {
      nombre_completo: sanitizeText(data.nombre, 120),
      telefono: sanitizePhone(data.telefono),
      correo: sanitizeEmail(data.correo),
      institucion_educativa: sanitizeText(data.institucion, 160),
      evento: data.evento,
      interes_principal: data.interes,
      observaciones: sanitizeText(data.observaciones, 1000),
    },
  };

  const response = await apiClient.post<StrapiSingleResponse<StrapiEntityBase & InteresadoPayload>>(
    ENDPOINTS.ADMISIONES.CREATE,
    payload
  );

  return {
    id: response.data.id,
    nombre: payload.data.nombre_completo,
    telefono: payload.data.telefono,
    correo: payload.data.correo,
    institucion: payload.data.institucion_educativa,
    evento: data.evento,
    interes: data.interes,
    observaciones: payload.data.observaciones,
    createdAt: response.data.createdAt,
    updatedAt: response.data.updatedAt,
  };
}
