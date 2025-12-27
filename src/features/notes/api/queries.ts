import { useQuery } from "@tanstack/react-query";
import { listNotesApi } from "./api";

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
