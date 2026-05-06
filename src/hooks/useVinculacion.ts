/**
 * hooks/useVinculacion.ts
 */

import { useState, useCallback } from 'react';
import { registrarPropuestaVinculacion } from '../services/vinculacion.service';
import type { EmpresaFormData } from '../types/vinculacion.types';
import type { AsyncState } from '../types/api.types';

export function useVinculacion() {
  const [state, setState] = useState<AsyncState<true>>({
    data: null,
    status: 'idle',
    error: null,
  });

  const submitForm = useCallback(async (data: EmpresaFormData) => {
    setState({ data: null, status: 'loading', error: null });
    try {
      await registrarPropuestaVinculacion(data);
      setState({ data: true, status: 'success', error: null });
    } catch (err) {
      setState({ 
        data: null, 
        status: 'error', 
        error: (err as Error).message || 'Error al enviar la solicitud' 
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, status: 'idle', error: null });
  }, []);

  return { state, submitForm, reset };
}
