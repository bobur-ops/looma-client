import { useAppSelector } from "@/hooks/redux";
import { Navigate, Outlet } from "react-router";
import { selectIsAuthenticated } from "../model/slice";

export default function AuthProvider() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
