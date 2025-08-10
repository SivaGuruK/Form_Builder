import { FormState, FormSchema, FormField } from "../assets/types";
import {
  CREATE_FORM,
  UPDATE_FORM,
  DELETE_FORM,
  SET_CURRENT_FORM,
  ADD_FIELD,
  UPDATE_FIELD,
  DELETE_FIELD,
  REORDER_FIELDS,
  FormActionTypes,
} from "./actions";

const initialState: FormState = {
  forms: {},
  currentForm: null,
};

export default function formReducer(
  state = initialState,
  action: FormActionTypes
): FormState {
  switch (action.type) {
    case CREATE_FORM:
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.payload.id]: action.payload,
        },
      };

    case UPDATE_FORM:
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.payload.id]: action.payload,
        },
      };

    case DELETE_FORM: {
      const newForms = { ...state.forms };
      delete newForms[action.payload];
      return {
        ...state,
        forms: newForms,
      };
    }

    case SET_CURRENT_FORM:
      return {
        ...state,
        currentForm: action.payload,
      };

    case ADD_FIELD:
      if (!state.currentForm) return state;
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          fields: [...state.currentForm.fields, action.payload],
        },
      };

    case UPDATE_FIELD:
      if (!state.currentForm) return state;
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          fields: state.currentForm.fields.map((field) =>
            field.id === action.payload.id
              ? { ...field, ...action.payload.updates }
              : field
          ),
        },
      };

    case DELETE_FIELD:
      if (!state.currentForm) return state;
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          fields: state.currentForm.fields.filter(
            (field) => field.id !== action.payload
          ),
        },
      };

    case REORDER_FIELDS:
      if (!state.currentForm) return state;
      const fields = [...state.currentForm.fields];
      const [removed] = fields.splice(action.payload.startIndex, 1);
      fields.splice(action.payload.endIndex, 0, removed);
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          fields,
        },
      };

    default:
      return state;
  }
}
export const resetForm = (): FormActionTypes => ({
  type: SET_CURRENT_FORM,
  payload: null,
});