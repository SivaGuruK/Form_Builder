import { FormSchema } from "../assets/types";

const STORAGE_KEY = "formBuilderForms";

export const loadFormsFromStorage = (): Record<string, FormSchema> => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : {};
  } catch (error) {
    console.error("Failed to load forms from localStorage:", error);
    return {};
  }
};

export const saveFormToStorage = (form: FormSchema): void => {
  try {
    const forms = loadFormsFromStorage();
    forms[form.id] = form;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
  } catch (error) {
    console.error("Failed to save form to localStorage:", error);
  }
};

export const deleteFormFromStorage = (formId: string): void => {
  try {
    const forms = loadFormsFromStorage();
    delete forms[formId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
  } catch (error) {
    console.error("Failed to delete form from localStorage:", error);
  }
};
