import { useQuery } from "@tanstack/react-query";
import { getNoteByIdApi, listNotesApi } from "./api";

export const useGetNotesQuery = () => {
  return useQuery({
    queryKey: ["notes"],
    meta: { persist: true },
    queryFn: () =>
      listNotesApi({
        limit: 20,
        offset: 0,
      }),
  });
};

export const useGetNoteByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["notes", "by-id", id],
    meta: { persist: true },
    queryFn: () => getNoteByIdApi({ id }),
    enabled: !!id,
  });
};
