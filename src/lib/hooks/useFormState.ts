/** Gestiona estado, validación y envío de formularios. */

import { useState, useCallback, useRef } from 'react';
import { validateField, validateAll, hasErrors } from '@/lib/validation/rules';
import type { ValidationRule } from '@/lib/validation/rules';

interface UseFormStateOptions<T extends Record<string, string>> {
  onSubmit?: (values: T) => void | Promise<void>;
}

interface UseFormStateReturn<T extends Record<string, string>> {
  values: T;
  errors: Record<keyof T, string | null>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  setFieldValue: (name: keyof T, value: string) => void;
  fieldError: (name: keyof T) => string | null;
  handleSubmit: (e: React.FormEvent) => void;
  reset: () => void;
  hasErrors: boolean;
  setSubmitting: (v: boolean) => void;
}

export function useFormState<T extends Record<string, string>>(
  initialValues: T,
  schema: Partial<Record<keyof T, ValidationRule[]>>,
  options?: UseFormStateOptions<T>
): UseFormStateReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string | null>>(() => {
    const initial = {} as Record<keyof T, string | null>;
    for (const key of Object.keys(initialValues) as (keyof T)[]) {
      initial[key] = null;
    }
    return initial;
  });
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(() => {
    const initial = {} as Record<keyof T, boolean>;
    for (const key of Object.keys(initialValues) as (keyof T)[]) {
      initial[key] = false;
    }
    return initial;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLockRef = useRef(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      const fieldRules = schema[name as keyof T];
      if (fieldRules) {
        setErrors((prev) => ({ ...prev, [name]: validateField(value, fieldRules) }));
      }
    },
    [schema]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const fieldRules = schema[name as keyof T];
      if (fieldRules) {
        setErrors((prev) => ({ ...prev, [name]: validateField(value, fieldRules) }));
      }
    },
    [schema]
  );

  const setFieldValue = useCallback(
    (name: keyof T, value: string) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      const fieldRules = schema[name];
      if (fieldRules) {
        setErrors((prev) => ({ ...prev, [name]: validateField(value, fieldRules) }));
      }
    },
    [schema]
  );

  const fieldError = useCallback(
    (name: keyof T): string | null => {
      return touched[name] ? errors[name] : null;
    },
    [touched, errors]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (submitLockRef.current) return;

      const allTouched = {} as Record<keyof T, boolean>;
      for (const key of Object.keys(values) as (keyof T)[]) {
        allTouched[key] = true;
      }
      setTouched(allTouched);

      const allErrors = validateAll(
        schema as Record<string, ValidationRule[]>,
        values as Record<string, string>
      ) as Record<keyof T, string | null>;
      setErrors(allErrors);

      if (hasErrors(allErrors)) return;

      submitLockRef.current = true;
      setIsSubmitting(true);

      const result = options?.onSubmit?.(values);
      if (result instanceof Promise) {
        result.finally(() => {
          submitLockRef.current = false;
          setIsSubmitting(false);
        });
      } else {
        submitLockRef.current = false;
        setIsSubmitting(false);
      }
    },
    [values, schema, options]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    const initialErrors = {} as Record<keyof T, string | null>;
    const initialTouched = {} as Record<keyof T, boolean>;
    for (const key of Object.keys(initialValues) as (keyof T)[]) {
      initialErrors[key] = null;
      initialTouched[key] = false;
    }
    setErrors(initialErrors);
    setTouched(initialTouched);
    setIsSubmitting(false);
    submitLockRef.current = false;
  }, [initialValues]);

  const currentHasErrors = Object.values(errors).some(Boolean);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    setFieldValue,
    fieldError,
    handleSubmit,
    reset,
    hasErrors: currentHasErrors,
    setSubmitting: setIsSubmitting,
  };
}
