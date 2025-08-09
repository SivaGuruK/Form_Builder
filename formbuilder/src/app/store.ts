import { configureStore } from "@reduxjs/toolkit";
import currentFormReducer from "../features/currentForm/currentFormSlice";
import formsReducer from "../features/forms/formsSlice";

export const store = configureStore({
  reducer: {
    currentForm: currentFormReducer,
    forms: formsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
