import { FormField, FormSchema } from "../assets/types";

export const calculateDerivedValue = (
  field: FormField,
  formValues: Record<string, any>,
  allFields: FormField[]
): any => {
  if (!field.isDerived || !field.parentFields || !field.derivationLogic) {
    return null;
  }

  try {
    // Get parent values in order
    const parentValues = field.parentFields.map((id) => formValues[id]);

    // Simple operations
    if (field.derivationLogic === "sum") {
      return parentValues.reduce((a, b) => Number(a) + Number(b), 0);
    }

    if (field.derivationLogic === "concat") {
      return parentValues.join(" ");
    }

    // Age calculation from date of birth
    if (field.derivationLogic === "age") {
      const dob = new Date(parentValues[0]);
      const diff = Date.now() - dob.getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    // Custom formula
    if (field.derivationLogic.startsWith("=")) {
      const formula = field.derivationLogic.substring(1);
      const context: Record<string, any> = {};

      field.parentFields.forEach((id, index) => {
        const field = allFields.find((f) => f.id === id);
        if (field) {
          context[`field${index + 1}`] = parentValues[index];
        }
      });

      // Very simple formula evaluation - in production use a proper parser
      try {
        // This is a simplified approach - consider using a library like math.js for complex formulas
        const func = new Function(...Object.keys(context), `return ${formula}`);
        return func(...Object.values(context));
      } catch (e) {
        console.error("Formula evaluation error:", e);
        return "Error in calculation";
      }
    }

    return field.derivationLogic;
  } catch (error) {
    console.error("Derivation error:", error);
    return "Error in calculation";
  }
};
