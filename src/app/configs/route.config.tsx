import { createBrowserRouter, type RouteObject } from "react-router-dom";

// Layouts...
import { AdminLayout, MainLayout } from "@/shared/layouts";
// Controllers
import * as MainController from "@/layers/controllers/main";
import * as AdminController from "@/layers/controllers/admin";

export type Routers = RouteObject[];

const createRoutes = (): Routers => {
  const routes: Routers = [
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <MainController.MainHomeController />,
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
          element: <AdminController.AdminMainController />,
        },
      ],
    },
  ];

  return routes;
};
export const routerConfig = createBrowserRouter(createRoutes());
