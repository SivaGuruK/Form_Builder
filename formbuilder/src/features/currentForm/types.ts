export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date";

export interface ValidationRules {
  required?: boolean;
  minLength?: number | null;
  maxLength?: number | null;
  emailFormat?: boolean;
  passwordRule?: boolean; 
}

export interface DerivedFieldConfig {
  parentFieldIds: string[]; 
  formula?: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  defaultValue?: any;
  options?: string[];
  validations?: ValidationRules;
  derived?: DerivedFieldConfig | null;
}

export interface CurrentFormState {
  id?: string | null;
  name: string;
  fields: FormField[];
  selectedFieldId: string | null;
}
