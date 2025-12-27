import { apiClient } from "@/config/axios";
import type { ApiResponse } from "@/shared/types/http";
import type { NoteDetailsInterface, NoteListItemInterface } from "../types";
import { cleanParams } from "@/lib/clean-params";

type ListNotesApiParams = {
  limit: number;
  offset: number;
  pinned?: boolean;
  q?: string;
};

export const listNotesApi = async (params: ListNotesApiParams) => {
  const response = await apiClient.get<ApiResponse<NoteListItemInterface[]>>(
    "notes",
    {
      params: cleanParams(params),
    }
  );

  return response.data;
};

type GetNoteByIdApiParams = {
  id: string;
};

export const getNoteByIdApi = async (params: GetNoteByIdApiParams) => {
  const response = await apiClient.get<ApiResponse<NoteDetailsInterface>>(
    `notes/${params.id}`
  );

  return response.data;
};
