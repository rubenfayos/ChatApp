import { ZodError, ZodSchema } from "zod";

/**
 * Comprueba si un formulario es correcto
 * @param schema el esquema a validar
 * @param formData datos del formulario
 */
export const checkFormErrors = (schema: ZodSchema, formData: object) => {
  try {
    schema.parse(formData);
  } catch (error: any) {
    if (error instanceof ZodError) {
      const formErrors = {};
      const errors = error.flatten().fieldErrors;
      Object.keys(errors).forEach((key) => {
        if (errors[key]) {
          // @ts-ignore
          formErrors[key] = errors[key][0];
        }
      });
      return formErrors;
    }
  }
};
