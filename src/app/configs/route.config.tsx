import { createBrowserRouter, type RouteObject } from "react-router-dom";

// Layouts...
import { AdminLayout, MainLayout } from "@/shared/layouts";
// Controllers
import * as Controller from "@/features";

export type Routers = RouteObject[];

const createRoutes = (): Routers => {
  const routes: Routers = [
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Controller.MainController />,
        },
      ],
    },
    // Admin Page
    {
      path: "admin",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <Controller.AdminMainController />,
        },
      ],
    },
  ];

  return routes;
};
export const routerConfig = createBrowserRouter(createRoutes());
