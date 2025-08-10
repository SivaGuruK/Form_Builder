import { FormSchema, FormField } from "../assets/types";

export const CREATE_FORM = "CREATE_FORM";
export const UPDATE_FORM = "UPDATE_FORM";
export const DELETE_FORM = "DELETE_FORM";
export const SET_CURRENT_FORM = "SET_CURRENT_FORM";
export const ADD_FIELD = "ADD_FIELD";
export const UPDATE_FIELD = "UPDATE_FIELD";
export const DELETE_FIELD = "DELETE_FIELD";
export const REORDER_FIELDS = "REORDER_FIELDS";

interface CreateFormAction {
  type: typeof CREATE_FORM;
  payload: FormSchema;
}

interface UpdateFormAction {
  type: typeof UPDATE_FORM;
  payload: FormSchema;
}

interface DeleteFormAction {
  type: typeof DELETE_FORM;
  payload: string; // form ID
}

interface SetCurrentFormAction {
  type: typeof SET_CURRENT_FORM;
  payload: FormSchema | null;
}

interface AddFieldAction {
  type: typeof ADD_FIELD;
  payload: FormField;
}

interface UpdateFieldAction {
  type: typeof UPDATE_FIELD;
  payload: { id: string; updates: Partial<FormField> };
}

interface DeleteFieldAction {
  type: typeof DELETE_FIELD;
  payload: string; // field ID
}

interface ReorderFieldsAction {
  type: typeof REORDER_FIELDS;
  payload: { startIndex: number; endIndex: number };
}

export type FormActionTypes =
  | CreateFormAction
  | UpdateFormAction
  | DeleteFormAction
  | SetCurrentFormAction
  | AddFieldAction
  | UpdateFieldAction
  | DeleteFieldAction
  | ReorderFieldsAction;

export const createForm = (form: FormSchema): FormActionTypes => ({
  type: CREATE_FORM,
  payload: form,
});

export const updateForm = (form: FormSchema): FormActionTypes => ({
  type: UPDATE_FORM,
  payload: form,
});

export const deleteForm = (formId: string): FormActionTypes => ({
  type: DELETE_FORM,
  payload: formId,
});

export const setCurrentForm = (form: FormSchema | null): FormActionTypes => ({
  type: SET_CURRENT_FORM,
  payload: form,
});

export const addField = (field: FormField): FormActionTypes => ({
  type: ADD_FIELD,
  payload: field,
});

export const updateField = (
  id: string,
  updates: Partial<FormField>
): FormActionTypes => ({
  type: UPDATE_FIELD,
  payload: { id, updates },
});

export const deleteField = (fieldId: string): FormActionTypes => ({
  type: DELETE_FIELD,
  payload: fieldId,
});

export const reorderFields = (
  startIndex: number,
  endIndex: number
): FormActionTypes => ({
  type: REORDER_FIELDS,
  payload: { startIndex, endIndex },
});
export const resetForm = (): FormActionTypes => ({
  type: SET_CURRENT_FORM,
  payload: null,
});