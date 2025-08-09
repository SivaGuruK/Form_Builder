import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentFormState, FormField } from "./types";

const initialState: CurrentFormState = {
  id: null,
  name: "",
  fields: [],
  selectedFieldId: null,
};

const currentFormSlice = createSlice({
  name: "currentForm",
  initialState,
  reducers: {
    setFormName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    addField(state, action: PayloadAction<FormField>) {
      state.fields.push(action.payload);
      state.selectedFieldId = action.payload.id;
    },
    updateField(state, action: PayloadAction<FormField>) {
      const idx = state.fields.findIndex((f) => f.id === action.payload.id);
      if (idx >= 0) state.fields[idx] = action.payload;
    },
    deleteField(state, action: PayloadAction<string>) {
      state.fields = state.fields.filter((f) => f.id !== action.payload);
      if (state.selectedFieldId === action.payload) {
        state.selectedFieldId = state.fields.length ? state.fields[0].id : null;
      }
    },
    reorderFields(state, action: PayloadAction<FormField[]>) {
      state.fields = action.payload;
    },
    selectField(state, action: PayloadAction<string | null>) {
      state.selectedFieldId = action.payload;
    },
    resetForm(state) {
      state.id = null;
      state.name = "";
      state.fields = [];
      state.selectedFieldId = null;
    },
    setForm(state, action: PayloadAction<CurrentFormState>) {
      return action.payload;
    },
  },
});

export const {
  setFormName,
  addField,
  updateField,
  deleteField,
  reorderFields,
  selectField,
  resetForm,
  setForm,
} = currentFormSlice.actions;

export default currentFormSlice.reducer;
