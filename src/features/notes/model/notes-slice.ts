import type { RootState } from "@/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PersistConfig } from "redux-persist";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";

interface NotesState {
  editingNoteId: string | null;
}

const initialState: NotesState = {
  editingNoteId: null,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setEditingNoteId(state, payload: PayloadAction<string | null>) {
      state.editingNoteId = payload.payload;
    },
  },
});

export const { setEditingNoteId } = notesSlice.actions;

export const selectEditingNoteId = (state: RootState) => state.notes.editingNoteId;

const persistConfig: PersistConfig<NotesState> = {
  key: "notes",
  storage,
  whitelist: ["editingNoteId"],
};

export const notesSliceReducer = persistReducer(
  persistConfig,
  notesSlice.reducer
);
