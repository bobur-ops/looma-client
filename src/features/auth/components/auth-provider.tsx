import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Navigate, Outlet, useNavigate } from "react-router";
import {
  selectIsAuthenticated,
  setAuthenticated,
  setUser,
} from "../model/auth-slice";
import { useGetMeQuery } from "../api/queries";
import { useEffect } from "react";

export default function AuthProvider() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { isError, data } = useGetMeQuery({
    enabled: !!isAuthenticated,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      dispatch(setAuthenticated(false));
      navigate("/auth/login");
    }
  }, [isError, dispatch, navigate]);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.data));
    }
  }, [data, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to={"/auth/login"} />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
