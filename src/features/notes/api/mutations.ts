import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNoteApi,
  deleteNoteByIdApi,
  patchNoteByIdApi,
  type GetNoteByIdApiResponse,
  type ListNotesApiResponse,
} from "./api";
import { notesKeys } from "./queries";
import { produce, type Draft } from "immer";
import type { NoteListItemInterface } from "../types";
import { findLastPinnedIndex } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectEditingNoteId, setEditingNoteId } from "../model/notes-slice";

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

export const useDeleteNoteById = () => {
  const queryClient = useQueryClient();
  const editingNoteId = useAppSelector(selectEditingNoteId);
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: deleteNoteByIdApi,

    onMutate: async (noteId) => {
      await queryClient.cancelQueries({
        queryKey: notesKeys.byId(noteId),
      });

      if (editingNoteId === noteId) {
        dispatch(setEditingNoteId(null));
      }

      const previousList = queryClient.getQueriesData<ListNotesApiResponse>({
        queryKey: notesKeys.lists(),
      });

      queryClient.setQueriesData(
        { queryKey: notesKeys.lists() },
        (old: ListNotesApiResponse) =>
          produce(old, (draft) => {
            if (!draft.data) return;

            draft.data = draft.data.filter((note) => note.id !== noteId);
          })
      );

      return { previousList };
    },

    onError: (_error, _noteId, context) => {
      context?.previousList.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNoteApi,

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: notesKeys.all,
      });

      const tempId = `temp-${crypto.randomUUID()}`;

      const previousLists = queryClient.getQueriesData<ListNotesApiResponse>({
        queryKey: notesKeys.lists(),
      });

      const optimisticNote: NoteListItemInterface = {
        id: tempId,
        title: "",
        isPinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
        version: 1,
      };

      queryClient.setQueriesData(
        {
          queryKey: notesKeys.lists(),
        },
        (old: ListNotesApiResponse) => {
          return produce(old, (draft) => {
            if (!draft.data) return;
            draft.data.unshift(optimisticNote);
          });
        }
      );

      const optimisticDetails: GetNoteByIdApiResponse = {
        code: 200,
        message: "Success",
        success: true,
        time: new Date().toISOString(),
        data: {
          ...optimisticNote,
          body: "",
        },
      };

      queryClient.setQueryData(notesKeys.byId(tempId), optimisticDetails);

      return { previousLists, tempId };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousLists) {
        context.previousLists.forEach(([queryKey, data]) => {
          if (data) queryClient.setQueryData(queryKey, data);
        });
      }

      if (context?.tempId) {
        queryClient.removeQueries({
          queryKey: notesKeys.byId(context.tempId),
        });
      }
    },
    onSuccess: (response, _variables, context) => {
      const realId = response.data.id;
      const tempId = context.tempId;
      queryClient.setQueryData(notesKeys.byId(realId), response);

      if (tempId) {
        queryClient.removeQueries({ queryKey: notesKeys.byId(tempId) });
      }

      queryClient.setQueriesData<ListNotesApiResponse>(
        { queryKey: notesKeys.lists() },
        (old) => {
          return produce(old, (draft) => {
            if (!draft?.data) return;

            draft.data = draft.data.filter((note) => note.id !== tempId);
            draft.data.unshift(response.data);
          });
        }
      );
    },
  });
};
