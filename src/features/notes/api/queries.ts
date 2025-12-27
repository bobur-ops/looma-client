import { useQuery } from "@tanstack/react-query";
import { getNoteByIdApi, listNotesApi } from "./api";

export const notesKeys = {
  all: ["notes"] as const,
  lists: () => [...notesKeys.all, "list"] as const,
  list: (params?: { limit?: number; offset?: number }) =>
    [...notesKeys.all, "list", params] as const,
  byId: (id: string) => [...notesKeys.all, "by-id", id] as const,
};

export const useGetNotesQuery = () => {
  return useQuery({
    queryKey: notesKeys.list({ limit: 20, offset: 0 }),
    meta: { persist: true },
    queryFn: () =>
      listNotesApi({
        limit: 20,
        offset: 0,
      }),
  });
};

export const useGetNoteByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: notesKeys.byId(id!),
    meta: { persist: true },
    queryFn: () => getNoteByIdApi({ id: id! }),
    enabled: !!id,
    select: (data) => data.data,
  });
};
