import { useQuery } from "@tanstack/react-query";
import { listNotesApi } from "./api";

export const useGetNotesQuery = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: () =>
      listNotesApi({
        limit: 20,
        offset: 0,
      }),
  });
};
