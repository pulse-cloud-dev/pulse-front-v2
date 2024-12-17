import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";

// Layouts...
import { AdminLayout, MainLayout } from "@/shared/layouts";
// Controllers
import * as Controller from "@/features";
import { urlConst } from "@/shared/constants";

export type Routers = RouteObject[];

const createRoutes = (): Routers => {
  const routes: Routers = [
    {
      path: urlConst.home.default,
      element: <MainLayout />,
      children: [
        {
          path: urlConst.home.main,
          element: <Navigate to={urlConst.mentor.main} />,
        },
        /**
         * @description Mentor
         */
        {
          path: urlConst.mentor.main,
          children: [
            {
              path: urlConst.mentor.default,
              element: <Controller.MentorController />,
            },
          ],
        },

        /**
         * @description Chat
         */
        {
          path: urlConst.chat.main,
          children: [
            {
              path: urlConst.chat.default,
              element: <Controller.ChatController />,
            },
          ],
        },
        /**
         * @description Community
         */
        {
          path: urlConst.community.main,
          children: [
            {
              path: urlConst.community.default,
              element: <Controller.CommunityController />,
            },
          ],
        },
        /**
         * @description Notice
         */
        {
          path: urlConst.notice.main,
          children: [
            {
              path: urlConst.notice.default,
              element: <Controller.NoticeController />,
            },
          ],
        },
        /**
         * @description Auth
         */
        {
          path: urlConst.auth.main,
          children: [
            {
              path: urlConst.auth.default,
              element: <Navigate to={urlConst.auth.signIn} />,
            },
            {
              path: urlConst.auth.signIn,
              element: <Controller.SigInController />,
            },
            {
              path: urlConst.auth.signUp,
              element: <Controller.SignUpController />,
            },
          ],
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
    // Error Pages
    /**
     * @description The page is displayed when a user enters an wrong url page.
     */
    {
      path: "*",
      element: <Controller.NotFoundController />,
    },
    /**
     * @description The page is displayed when a user enters an unauthorized page.
     */
    {
      path: "unauthorized",
      element: <Controller.UnAuthorizedController />,
    },
  ];

  return routes;
};
export const routerConfig = createBrowserRouter(createRoutes());
