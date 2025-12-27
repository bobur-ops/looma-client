import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  patchNoteByIdApi,
  type GetNoteByIdApiResponse,
  type ListNotesApiResponse,
} from "./api";
import { notesKeys } from "./queries";

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
        (old: GetNoteByIdApiResponse) => {
          if (!old) return old;

          return {
            ...old,
            data: { ...old.data, ...input, version: old.data.version + 1 },
          };
        }
      );

      queryClient.setQueriesData(
        { queryKey: notesKeys.lists() },
        (old: ListNotesApiResponse) => {
          if (!old.data) return old;
          return {
            ...old,
            data: old.data.map((note) =>
              note.id === input.noteId ? { ...note, ...input } : note
            ),
          };
        }
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
        (old: ListNotesApiResponse) => {
          if (!old?.data) return old;

          const rest = old.data.filter((note) => note.id !== updatedNote.id);

          const pinned = rest.filter((note) => note.isPinned);
          const unpinned = rest.filter((note) => !note.isPinned);

          if (updatedNote.isPinned) {
            return {
              ...old,
              data: [updatedNote, ...pinned, ...unpinned],
            };
          }

          return {
            ...old,
            data: [...pinned, updatedNote, ...unpinned],
          };
        }
      );
    },
  });
};
