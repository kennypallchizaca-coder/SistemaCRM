/** Define reglas reutilizables para validar formularios. */

export type ValidationRule = (value: string) => string | null;


export const rules = {
  required:
    (message = 'Este campo es obligatorio'): ValidationRule =>
    (value) =>
      value.trim().length > 0 ? null : message,

  minLength:
    (min: number, message?: string): ValidationRule =>
    (value) =>
      value.trim().length >= min
        ? null
        : message ?? `Mínimo ${min} caracteres`,

  maxLength:
    (max: number, message?: string): ValidationRule =>
    (value) =>
      value.length <= max
        ? null
        : message ?? `Máximo ${max} caracteres`,

  email:
    (message = 'Correo electrónico inválido'): ValidationRule =>
    (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : message,

  digits:
    (count: number, message?: string): ValidationRule =>
    (value) =>
      new RegExp(`^[0-9]{${count}}$`).test(value)
        ? null
        : message ?? `Debe tener ${count} dígitos numéricos`,

  pattern:
    (regex: RegExp, message = 'Formato inválido'): ValidationRule =>
    (value) =>
      regex.test(value) ? null : message,
} as const;


export function validateField(value: string, fieldRules: ValidationRule[]): string | null {
  for (const rule of fieldRules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
}

export function validateAll<T extends string>(
  schema: Record<T, ValidationRule[]>,
  data: Record<T, string>
): Record<T, string | null> {
  const result = {} as Record<T, string | null>;
  for (const key of Object.keys(schema) as T[]) {
    result[key] = validateField(data[key] ?? '', schema[key]);
  }
  return result;
}

export function hasErrors(errors: Record<string, string | null>): boolean {
  return Object.values(errors).some(Boolean);
}
