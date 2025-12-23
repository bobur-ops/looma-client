import type { RootState } from "@/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

// ACTIONS

export const { setAuthenticated } = authSlice.actions;

// SELECTERS
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
