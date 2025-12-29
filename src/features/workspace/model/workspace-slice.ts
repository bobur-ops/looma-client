import type { RootState } from "@/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WorkspaceState {
  dirtyNoteIds: string[];
}

const initialState: WorkspaceState = {
  dirtyNoteIds: [],
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    markNoteDirty(state, action: PayloadAction<string>) {
      if (!state.dirtyNoteIds.includes(action.payload)) {
        state.dirtyNoteIds.push(action.payload);
      }
    },
    markNoteClean(state, action: PayloadAction<string>) {
      state.dirtyNoteIds = state.dirtyNoteIds.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { markNoteClean, markNoteDirty } = workspaceSlice.actions;

export const selectDirtyNoteIds = (state: RootState) =>
  state.workspace.dirtyNoteIds;
export const selectIsNoteDirty = (noteId: string) => (state: RootState) =>
  state.workspace.dirtyNoteIds.includes(noteId);
