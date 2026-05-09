/** Envía y normaliza solicitudes de interesados para Strapi. */

import type { InteresadoFormData, Interesado } from '../types/admisiones.types';
import { apiClient } from '@/lib/api';
import { ENDPOINTS } from '@/lib/api/endpoints';
import type { StrapiCreatePayload, StrapiEntityBase, StrapiSingleResponse } from '@/lib/api';

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
      nombre_completo: data.nombre,
      telefono: data.telefono,
      correo: data.correo,
      institucion_educativa: data.institucion ?? '',
      evento: data.evento,
      interes_principal: data.interes,
      observaciones: data.observaciones ?? '',
    },
  };

  const response = await apiClient.post<StrapiSingleResponse<StrapiEntityBase & InteresadoPayload>>(
    ENDPOINTS.ADMISIONES.CREATE,
    payload
  );

  return {
    id: response.data.id,
    nombre: data.nombre,
    telefono: data.telefono,
    correo: data.correo,
    institucion: data.institucion,
    evento: data.evento,
    interes: data.interes,
    observaciones: data.observaciones,
    createdAt: response.data.createdAt,
    updatedAt: response.data.updatedAt,
  };
}
