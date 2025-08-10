import { FormField, ValidationRules } from "../assets/types";

export const validateField = (field: FormField, value: any): string[] => {
  const errors: string[] = [];
  const rules = field.validation;

  if (!rules) return errors;

  // Required validation
  if (
    field.required &&
    (value === undefined || value === null || value === "")
  ) {
    errors.push(rules.customErrorMessage || "This field is required");
    return errors; // No need to check other validations if required fails
  }

  // Skip further validation if value is empty (but field is not required)
  if (value === undefined || value === null || value === "") {
    return errors;
  }

  // Not empty validation (for strings)
  if (rules.notEmpty && typeof value === "string" && value.trim() === "") {
    errors.push(rules.customErrorMessage || "Field cannot be empty");
  }

  // Length validations
  if (typeof value === "string") {
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(
        rules.customErrorMessage ||
          `Minimum ${rules.minLength} characters required`
      );
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(
        rules.customErrorMessage ||
          `Maximum ${rules.maxLength} characters allowed`
      );
    }
  }

  // Email validation
  if (rules.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errors.push(rules.customErrorMessage || "Invalid email format");
    }
  }

  // Password validation
  if (rules.password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(value)) {
      errors.push(
        rules.customErrorMessage ||
          "Password must be at least 8 characters with at least one letter and one number"
      );
    }
  }

  // Custom regex validation
  if (rules.customRegex) {
    try {
      const regex = new RegExp(rules.customRegex);
      if (!regex.test(value)) {
        errors.push(
          rules.customErrorMessage || "Value does not match required pattern"
        );
      }
    } catch (e) {
      console.error("Invalid custom regex:", rules.customRegex);
    }
  }

  return errors;
};
