/** Define los tipos del dominio de vinculación. */

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
