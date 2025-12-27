import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "./api";
import type { QueryCustomOptions } from "@/shared/types/http";

export const useGetMeQuery = (options?: QueryCustomOptions) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
    retry: false,
    meta: { persist: true },
    ...options,
  });
};
