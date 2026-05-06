/**
 * types/vinculacion.types.ts
 */

export interface EmpresaFormData {
  empresa: string;
  contacto: string;
  correo: string;
  telefono: string;
  mensaje: string;
}

export interface VinculacionRequest extends EmpresaFormData {
  id: number;
  createdAt: string;
}
