import type { RootState } from "@/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type PersistConfig } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import type { UserInterface } from "../types";

interface AuthState {
  isAuthenticated: boolean;
  user: UserInterface | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action: PayloadAction<UserInterface | null>) {
      state.user = action.payload;
    },
  },
});

// ACTIONS

export const { setAuthenticated, setUser } = authSlice.actions;

// SELECTERS
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;

const persistConfig: PersistConfig<AuthState> = {
  key: "auth",
  storage,
  whitelist: ["isAuthenticated", "user"],
};

export const authSliceReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);
