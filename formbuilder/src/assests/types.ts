export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date";

export interface ValidationRules {
  notEmpty?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  password?: boolean;
  customRegex?: string;
  customErrorMessage?: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue: string | number | boolean;
  validation?: ValidationRules;
  options?: string[];
  isDerived?: boolean;
  parentFields?: string[];
  derivationLogic?: string;
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string;
  fields: FormField[];
}

export interface FormState {
  forms: Record<string, FormSchema>;
  currentForm: FormSchema | null;
}

// Redux action types
export type FormActionTypes =
  | { type: "CREATE_FORM"; payload: FormSchema }
  | { type: "UPDATE_FORM"; payload: FormSchema }
  | { type: "DELETE_FORM"; payload: string }
  | { type: "SET_CURRENT_FORM"; payload: FormSchema | null }
  | { type: "ADD_FIELD"; payload: FormField }
  | {
      type: "UPDATE_FIELD";
      payload: { id: string; updates: Partial<FormField> };
    }
  | { type: "DELETE_FIELD"; payload: string }
  | {
      type: "REORDER_FIELDS";
      payload: { startIndex: number; endIndex: number };
    };
