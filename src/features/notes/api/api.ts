import { apiClient } from "@/config/axios";
import type { ApiResponse } from "@/shared/types/http";
import type { NoteListItemInterface } from "../types";
import { cleanParams } from "@/lib/clean-params";
import { sleep } from "@/lib/utils";

type ListNotesApiParams = {
  limit: number;
  offset: number;
  pinned?: boolean;
  q?: string;
};

export const listNotesApi = async (params: ListNotesApiParams) => {
  await sleep(3000);
  const response = await apiClient.get<ApiResponse<NoteListItemInterface[]>>(
    "notes",
    {
      params: cleanParams(params),
    }
  );

  return response.data;
};
