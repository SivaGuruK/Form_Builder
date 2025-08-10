// src/store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Dispatch } from "redux";
import { FormActionTypes } from "../store/actions"; // adjust path if needed

// Dispatch now accepts only FormActionTypes
export const useAppDispatch = () => useDispatch<Dispatch<FormActionTypes>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
