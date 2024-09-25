import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { createElement, lazy } from "react";

import { LazyLayout, MainLayout } from "@/ui/blocks";

export type Routers = RouteObject[];

const LazyHomeController = lazy(() => import("@/layers/controllerLayer/home/homeController"));

const createRoutes = (): Routers => {
  const routes: Routers = [
    {
      path: "",
      element: createElement(MainLayout),
      children: [
        {
          path: "/",
          element: LazyLayout(LazyHomeController),
        },
      ],
    },
  ];

  return routes;
};
export default createBrowserRouter(createRoutes());
