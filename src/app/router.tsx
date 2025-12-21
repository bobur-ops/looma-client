import HomePage from "@/pages/home";
import RouteErrorBoundary from "@/shared/ui/route-error-boundary";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
    errorElement: <RouteErrorBoundary />,
  },
]);

export default router;
