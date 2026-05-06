/**
 * services/vinculacion.service.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Lógica de negocio del dominio Vinculación / Empresas.
 *
 * ESTADO ACTUAL: Usa datos simulados (mock).
 */

import type { EmpresaFormData, VinculacionRequest } from '../types/vinculacion.types';

import { apiClient } from '../api';

// ── MOCK ──
const _mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function registrarPropuestaVinculacion(
  data: EmpresaFormData
): Promise<VinculacionRequest> {
  await _mockDelay(1500);
  const mockResult: VinculacionRequest = {
    ...data,
    id: Math.floor(Math.random() * 1000),
    createdAt: new Date().toISOString(),
  };
  console.info('[VinculacionService] Propuesta registrada (MOCK):', mockResult);
  return mockResult;

  if (false as boolean) {
    return apiClient.post('/vinculacion-requests', { data });
  }
}
