/** Envía propuestas de vinculación empresarial a Strapi. */

import type { EmpresaFormData, VinculacionRequest } from '../types/vinculacion.types';
import { apiClient } from '@/lib/api';
import { ENDPOINTS } from '@/lib/api/endpoints';
import type { StrapiCreatePayload, StrapiEntityBase, StrapiSingleResponse } from '@/lib/api';

export async function registrarPropuestaVinculacion(
  data: EmpresaFormData
): Promise<VinculacionRequest> {
  // Los nombres enviados deben coincidir con el schema de la colección en Strapi.
  const payload: StrapiCreatePayload<EmpresaFormData> = {
    data: {
      empresa: data.empresa,
      contacto: data.contacto,
      correo: data.correo,
      telefono: data.telefono,
      mensaje: data.mensaje,
    },
  };

  const response = await apiClient.post<StrapiSingleResponse<StrapiEntityBase & EmpresaFormData>>(
    ENDPOINTS.VINCULACION.CREATE,
    payload
  );

  return {
    id: response.data.id,
    empresa: data.empresa,
    contacto: data.contacto,
    correo: data.correo,
    telefono: data.telefono,
    mensaje: data.mensaje,
    createdAt: response.data.createdAt,
  };
}
