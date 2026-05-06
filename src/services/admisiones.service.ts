/**
 * services/admisiones.service.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Lógica de negocio del dominio Admisiones.
 *
 * ESTADO ACTUAL: Usa datos simulados (mock) mientras no existe backend.
 * CUANDO EL BACKEND ESTÉ LISTO:
 *   1. Descomenta las líneas de `apiClient`.
 *   2. Elimina el bloque "── MOCK ──".
 *   3. El hook `useAdmisiones` y el componente no necesitan cambios.
 */

import type { InteresadoFormData, Interesado } from '../types/admisiones.types';
import type { ApiResponse } from '../types/api.types';
import { apiClient } from '../api';
import { ENDPOINTS } from '../api/endpoints';

// ── MOCK: simula la llamada al backend ─────────────────────────────────────
const _mockDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

let _mockIdCounter = 1;
// ──────────────────────────────────────────────────────────────────────────

/**
 * Registra un nuevo interesado.
 *
 * @param data  Datos del formulario de contacto
 * @returns     El interesado creado con su ID y timestamps
 */
export async function registrarInteresado(
  data: InteresadoFormData
): Promise<Interesado> {
  // ── MOCK ──────────────────────────────────────────────────────────────
  await _mockDelay(1500); // Simula latencia de red
  const mockResult: Interesado = {
    ...data,
    id: _mockIdCounter++,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  console.info('[AdmisionesService] Interesado registrado (MOCK):', mockResult);
  return mockResult;
  // ── FIN MOCK ─────────────────────────────────────────────────────────

  if (false as boolean) {
    const response = await apiClient.post<ApiResponse<Interesado>>(
      ENDPOINTS.ADMISIONES.CREATE,
      { data }
    );
    return response.data;
  }
}
