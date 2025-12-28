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

export type ListNotesApiResponse = ApiResponse<NoteListItemInterface[]>;

export const listNotesApi = async (params: ListNotesApiParams) => {
  const response = await apiClient.get<ListNotesApiResponse>("notes", {
    params: cleanParams(params),
  });

  return response.data;
};

type GetNoteByIdApiParams = {
  id: string;
};

export type GetNoteByIdApiResponse = ApiResponse<NoteDetailsInterface>;

export const getNoteByIdApi = async (params: GetNoteByIdApiParams) => {
  const response = await apiClient.get<GetNoteByIdApiResponse>(
    `notes/${params.id}`
  );

  return response.data;
};

export type PatchNoteInput = {
  noteId: string;
  version: number;
} & Partial<{ title: string; isPinned: boolean; body: string }>;

export type PatchNoteByIdApiResponse = ApiResponse<NoteDetailsInterface>;

export const patchNoteByIdApi = async (input: PatchNoteInput) => {
  const { noteId, ...body } = input;
  const response = await apiClient.patch<PatchNoteByIdApiResponse>(
    `notes/${noteId}`,
    body
  );

  return response.data;
};

export const deleteNoteByIdApi = async (noteId: string) => {
  const response = await apiClient.delete<undefined>(`notes/${noteId}`);

  return response.data;
};
