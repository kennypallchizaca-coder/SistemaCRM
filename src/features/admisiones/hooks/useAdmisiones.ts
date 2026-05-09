/** Gestiona el envío y estado del formulario de admisiones. */

import { useState, useCallback } from 'react';
import { registrarInteresado } from '@/features/admisiones/services/admisiones.service';
import type { InteresadoFormData } from '../types/admisiones.types';
import type { AsyncState } from '@/lib/types/api.types';

interface UseAdmisionesReturn {
  state: AsyncState<true>;
  submitForm: (data: InteresadoFormData) => Promise<void>;
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
