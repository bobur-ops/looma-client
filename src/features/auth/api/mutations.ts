import { useMutation } from "@tanstack/react-query";
import { loginApi } from "./api";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types/http";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/hooks/redux";
import { setAuthenticated } from "../model/auth-slice";
import { useNavigate } from "react-router";

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      toast.success("Successfully logged in!");
      dispatch(setAuthenticated(true));
      setTimeout(() => {
        navigate("/", {
          replace: true,
        });
      }, 500);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data.error.message || "Login failed");
    },
  });
};
