import { useAppDispatch } from "@/hooks/redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { markNoteClean, markNoteDirty } from "./workspace-slice";

interface UseAutoSaveEditorOptions {
  noteId: string | undefined;
  noteVersion: number | undefined;
  initialBody: string;
  onSave: (params: { noteId: string; version: number; body: string }) => void;
  debounceMs?: number;
}

export function useAutoSaveEditor({
  noteId,
  noteVersion,
  initialBody,
  onSave,
  debounceMs = 1000,
}: UseAutoSaveEditorOptions) {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(initialBody);
  const [debouncedValue] = useDebounceValue(value, debounceMs);

  const lastSavedValue = useRef(initialBody);
  const lastNoteId = useRef(noteId);
  const hasPendingChanges = useRef(false);

  // Handle note switch
  useEffect(() => {
    if (lastNoteId.current !== noteId) {
      lastNoteId.current = noteId;
      lastSavedValue.current = initialBody;
      hasPendingChanges.current = false;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(initialBody);
    }
  }, [noteId, initialBody]);

  // Handle auto-save
  useEffect(() => {
    if (!noteId || noteVersion === undefined) return;
    if (!hasPendingChanges.current) return;
    if (debouncedValue === lastSavedValue.current) return;

    onSave({
      noteId,
      version: noteVersion,
      body: debouncedValue,
    });

    lastSavedValue.current = debouncedValue;
    dispatch(markNoteClean(noteId));
  }, [debouncedValue, noteId, noteVersion, onSave, dispatch]);

  const handleChange = useCallback(
    (newValue: string) => {
      hasPendingChanges.current = true;
      setValue(newValue);
      if (noteId) {
        dispatch(markNoteDirty(noteId));
      }
    },
    [dispatch, noteId]
  );

  useEffect(() => {
    return () => {
      if (noteId && !hasPendingChanges.current) {
        dispatch(markNoteClean(noteId));
      }
    };
  }, [noteId, dispatch]);

  return {
    value,
    onChange: handleChange,
  };
}
