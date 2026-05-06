/**
 * hooks/useAdmisiones.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Hook que encapsula toda la lógica del formulario de interesados.
 * El componente `InteresadosForm` solo se preocupa por el UI.
 *
 * Usa `registrarInteresado` del servicio → cuando el backend esté listo,
 * el servicio cambia pero el hook y el componente NO cambian.
 */

import { useState, useCallback } from 'react';
import { registrarInteresado } from '../services/admisiones.service';
import type { InteresadoFormData } from '../types/admisiones.types';
import type { AsyncState } from '../types/api.types';

interface UseAdmisionesReturn {
  /** Estado de la petición */
  state: AsyncState<true>;
  /** Función que invoca el formulario al hacer submit */
  submitForm: (data: InteresadoFormData) => Promise<void>;
  /** Resetea el estado para enviar un nuevo registro */
  reset: () => void;
}

const INITIAL_STATE: AsyncState<true> = {
  data: null,
  status: 'idle',
  error: null,
};

export function useAdmisiones(): UseAdmisionesReturn {
  const [state, setState] = useState<AsyncState<true>>(INITIAL_STATE);

  const submitForm = useCallback(async (data: InteresadoFormData) => {
    setState({ data: null, status: 'loading', error: null });
    try {
      await registrarInteresado(data);
      setState({ data: true, status: 'success', error: null });
    } catch (err) {
      const message =
        (err as { message?: string })?.message ?? 'Error al enviar el formulario';
      setState({ data: null, status: 'error', error: message });
    }
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return { state, submitForm, reset };
}
