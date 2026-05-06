/**
 * types/admisiones.types.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Tipos del dominio "Admisiones / Interesados".
 * Representan los datos del formulario de contacto y el modelo
 * que se enviará a la API cuando el backend esté listo.
 */

/** Fuente de captación del interesado */
export type EventoOrigen =
  | 'Feria'
  | 'Recorrido UPS'
  | 'Redes sociales'
  | 'Visita a colegio'
  | 'Otro';

/** Área de interés del aspirante */
export type InteresArea =
  | 'Información general'
  | 'Malla curricular'
  | 'Campo laboral'
  | 'Laboratorios'
  | 'Admisión'
  | 'Becas'
  | 'Acreditación';

/** Payload del formulario (lo que envía el usuario) */
export interface InteresadoFormData {
  nombre: string;
  telefono: string;
  correo: string;
  institucion?: string;
  evento: EventoOrigen;
  interes: InteresArea;
  observaciones?: string;
}

/** Modelo completo guardado en la base de datos */
export interface Interesado extends InteresadoFormData {
  id: number;
  createdAt: string;
  updatedAt: string;
}
