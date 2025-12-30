import type { ApiResponse } from "@/shared/types/http";

export interface UserInterface {
  id: string;
  email: string;
  createdAt: string;
}

export type GetMeApiResponse = ApiResponse<UserInterface>;
