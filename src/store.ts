import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "./features/auth/model/auth-slice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { notesSliceReducer } from "./features/notes/model/notes-slice";
import { workspaceSlice } from "./features/workspace/model/workspace-slice";

const rootReducer = combineReducers({
  auth: authSliceReducer,
  notes: notesSliceReducer,
  workspace: workspaceSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
