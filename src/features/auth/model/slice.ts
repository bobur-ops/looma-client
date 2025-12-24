import type { RootState } from "@/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type PersistConfig } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

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

const persistConfig: PersistConfig<AuthState> = {
  key: "auth",
  storage,
  whitelist: ["isAuthenticated"],
};

export const authSliceReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);
