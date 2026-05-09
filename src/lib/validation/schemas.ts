/** Define esquemas de validación para formularios del sistema. */

import { rules } from './rules';
import type { ValidationRule } from './rules';


export const registerSchema: Record<string, ValidationRule[]> = {
  name: [
    rules.required('El nombre es obligatorio'),
    rules.minLength(3, 'Mínimo 3 caracteres'),
  ],
  email: [
    rules.required('El correo es obligatorio'),
    rules.email(),
  ],
  phone: [
    rules.required('El teléfono es obligatorio'),
    rules.digits(10, 'Debe tener 10 dígitos numéricos'),
  ],
  password: [
    rules.required('La contraseña es obligatoria'),
    rules.minLength(6, 'Mínimo 6 caracteres'),
  ],
};


export const admisionesSchema: Record<string, ValidationRule[]> = {
  nombre: [
    rules.required('El nombre es obligatorio'),
    rules.minLength(3, 'Mínimo 3 caracteres'),
  ],
  telefono: [
    rules.required('El teléfono es obligatorio'),
    rules.digits(10, 'Debe tener 10 dígitos numéricos'),
  ],
  correo: [
    rules.required('El correo es obligatorio'),
    rules.email(),
  ],
  evento: [
    rules.required('Selecciona dónde nos conociste'),
  ],
};


export const vinculacionSchema: Record<string, ValidationRule[]> = {
  empresa: [
    rules.required('El nombre de la empresa es obligatorio'),
  ],
  contacto: [
    rules.required('El nombre del contacto es obligatorio'),
  ],
  correo: [
    rules.required('El correo es obligatorio'),
    rules.email(),
  ],
  telefono: [
    rules.required('El teléfono es obligatorio'),
    rules.digits(10, 'Debe tener 10 dígitos numéricos'),
  ],
  mensaje: [
    rules.required('El mensaje es obligatorio'),
    rules.minLength(10, 'Mínimo 10 caracteres'),
  ],
};
