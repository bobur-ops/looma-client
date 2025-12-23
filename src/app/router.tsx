import AuthProvider from "@/features/auth/components/auth-provider";
import LoginPage from "@/pages/auth/login";
import HomePage from "@/pages/home";
import RouteErrorBoundary from "@/shared/ui/route-error-boundary";
import { createBrowserRouter, Navigate } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        Component: AuthProvider,
        children: [
          {
            index: true,
            Component: HomePage,
          },
        ],
      },

      {
        path: "auth",

        children: [
          {
            index: true,
            element: <Navigate to={"login"} replace />,
          },
          {
            path: "login",
            Component: LoginPage,
          },
        ],
      },
    ],
  },
]);

export default router;
