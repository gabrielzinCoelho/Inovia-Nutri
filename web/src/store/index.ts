import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector