import { RouterProvider as Provider } from "react-router-dom";

import { routerConfig } from "@/app/configs";

export const RouterProvider = () => {
  return <Provider router={routerConfig} />;
};
