import type { ApiResponse } from "@/shared/types/http";

export interface GetMeData {
  user_id: string;
}

export type GetMeApiResponse = ApiResponse<GetMeData>;
