import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedForm } from './types';

const persisted = (() => {
  try {
    const raw = localStorage.getItem('forms');
    return raw ? (JSON.parse(raw) as SavedForm[]) : [];
  } catch {
    return [];
  }
})();

const initialState: { savedForms: SavedForm[] } = {
  savedForms: persisted,
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    saveForm(state, action: PayloadAction<SavedForm>) {
      state.savedForms.push(action.payload);
      localStorage.setItem('forms', JSON.stringify(state.savedForms));
    },
    deleteForm(state, action: PayloadAction<string>) {
      state.savedForms = state.savedForms.filter(f => f.id !== action.payload);
      localStorage.setItem('forms', JSON.stringify(state.savedForms));
    },
    setForms(state, action: PayloadAction<SavedForm[]>) {
      state.savedForms = action.payload;
      localStorage.setItem('forms', JSON.stringify(state.savedForms));
    }
  }
});

export const { saveForm, deleteForm, setForms } = formsSlice.actions;
export default formsSlice.reducer;