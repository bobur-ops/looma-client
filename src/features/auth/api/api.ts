import { apiClient } from "@/config/axios";

type LoginBodyInterface = {
  email: string;
  password: string;
};

type LoginResponse = {
  session_id: string;
  user: {
    email: string;
    id: string;
  };
};

export const loginApi = async (
  body: LoginBodyInterface
): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login", body);

  return response.data;
};

type GetMeApiResponse = {
  user_id: string;
};

export const getMeApi = async () => {
  const response = await apiClient.get<GetMeApiResponse>("/me");

  return response.data;
};
