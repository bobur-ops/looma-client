import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  patchNoteByIdApi,
  type GetNoteByIdApiResponse,
  type ListNotesApiResponse,
} from "./api";
import { notesKeys } from "./queries";
import { produce, type Draft } from "immer";
import type { NoteListItemInterface } from "../types";
import { findLastPinnedIndex } from "@/lib/utils";

export const usePatchNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchNoteByIdApi,

    onMutate: async (input) => {
      await queryClient.cancelQueries({
        queryKey: notesKeys.byId(input.noteId),
      });

      const previousNote = queryClient.getQueryData<GetNoteByIdApiResponse>(
        notesKeys.byId(input.noteId)
      );
      const previousLists = queryClient.getQueriesData<ListNotesApiResponse>({
        queryKey: notesKeys.lists(),
      });

      queryClient.setQueryData(
        notesKeys.byId(input.noteId),
        (old: GetNoteByIdApiResponse) =>
          produce(old, (draft) => {
            if (!draft) return;
            Object.assign(draft.data, input);
            draft.data.version += 1;
          })
      );

      // queryClient.setQueryData(
      //   notesKeys.byId(input.noteId),
      //   (old: GetNoteByIdApiResponse) => {
      //     if (!old) return old;

      //     return {
      //       ...old,
      //       data: { ...old.data, ...input, version: old.data.version + 1 },
      //     };
      //   }
      // );

      queryClient.setQueriesData(
        { queryKey: notesKeys.lists() },
        (old: ListNotesApiResponse) =>
          produce(old, (draft) => {
            if (!draft?.data) return;
            const note = draft.data.find((n) => n.id === input.noteId);
            if (note) Object.assign(note, input);
          })
      );

      return { previousNote, previousLists };
    },

    onError: (_error, input, context) => {
      if (context?.previousNote) {
        queryClient.setQueryData(
          notesKeys.byId(input.noteId),
          (current: GetNoteByIdApiResponse) => {
            if (!current) return context.previousNote;

            return {
              ...current,
              data: {
                ...current.data,
                isPinned: context.previousNote?.data.isPinned,
                version: context.previousNote?.data.version,
              },
            };
          }
        );
      }

      context?.previousLists?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSuccess: (response, input) => {
      const updatedNote = response.data;

      queryClient.setQueryData(notesKeys.byId(input.noteId), response);

      queryClient.setQueriesData(
        { queryKey: notesKeys.lists() },
        (old: ListNotesApiResponse) =>
          produce(old, (draft) => {
            upsertAndReorder(draft, updatedNote);
          })
      );
    },
  });
};

function upsertAndReorder(
  draft: Draft<ListNotesApiResponse>,
  updatedNote: NoteListItemInterface
) {
  if (!draft.data) return;

  const index = draft.data.findIndex((n) => n.id === updatedNote.id);

  if (index !== -1) {
    draft.data.splice(index, 1);
  }

  if (updatedNote.isPinned) {
    draft.data.unshift(updatedNote);
  } else {
    const lastPinnedIndex = findLastPinnedIndex(draft.data);
    draft.data.splice(lastPinnedIndex + 1, 0, updatedNote);
  }
}
