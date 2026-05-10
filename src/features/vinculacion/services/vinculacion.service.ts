/** Envía propuestas de vinculación empresarial a Strapi. */

import type { EmpresaFormData, VinculacionRequest } from '../types/vinculacion.types';
import { apiClient } from '@/lib/api';
import { ENDPOINTS } from '@/lib/api/endpoints';
import type { StrapiCreatePayload, StrapiEntityBase, StrapiSingleResponse } from '@/lib/api';
import { sanitizeEmail, sanitizePhone, sanitizeText } from '@/lib/security/sanitize';

export async function registrarPropuestaVinculacion(
  data: EmpresaFormData
): Promise<VinculacionRequest> {
  // Los nombres enviados deben coincidir con el schema de la colección en Strapi.
  const payload: StrapiCreatePayload<EmpresaFormData> = {
    data: {
      empresa: sanitizeText(data.empresa, 160),
      contacto: sanitizeText(data.contacto, 120),
      correo: sanitizeEmail(data.correo),
      telefono: sanitizePhone(data.telefono),
      mensaje: sanitizeText(data.mensaje, 1500),
    },
  };

  const response = await apiClient.post<StrapiSingleResponse<StrapiEntityBase & EmpresaFormData>>(
    ENDPOINTS.VINCULACION.CREATE,
    payload
  );

  return {
    id: response.data.id,
    empresa: payload.data.empresa,
    contacto: payload.data.contacto,
    correo: payload.data.correo,
    telefono: payload.data.telefono,
    mensaje: payload.data.mensaje,
    createdAt: response.data.createdAt,
  };
}
