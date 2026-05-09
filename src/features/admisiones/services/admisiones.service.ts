/** Envía y normaliza solicitudes de interesados para Strapi. */

import type { InteresadoFormData, Interesado } from '../types/admisiones.types';
import { apiClient } from '@/lib/api';
import { ENDPOINTS } from '@/lib/api/endpoints';

interface StrapiSingleResponse<T> {
  data: {
    id: number;
    createdAt: string;
    updatedAt: string;
  } & T;
}

export async function registrarInteresado(
  data: InteresadoFormData
): Promise<Interesado> {
  // Los nombres enviados deben coincidir con el schema de la colección en Strapi.
  const payload = {
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

  const response = await apiClient.post<StrapiSingleResponse<InteresadoFormData>>(
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
