import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom";

// Controllers
import * as Controller from "@/features";
// Layouts...
import { AdminLayout, MainLayout } from "@/shared/layouts";
// Shared
import { urlConst } from "@/shared/constants";

export type Routers = RouteObject[];

const createRoutes = (): Routers => {
  const routes: Routers = [
    {
      path: urlConst.home.default, // ""
      element: <MainLayout />,
      children: [
        {
          path: urlConst.home.main, // "/"
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
          path: "auth",
          children: [
            { path: "", element: <Navigate to={urlConst.auth.signIn} /> },
            { path: "signIn", element: <Controller.SigInController /> },
            {
              path: "signUp",
              children: [
                { path: "", element: <Controller.SignUpController /> },
                { path: "termsAndCondition", element: <>약관동의</> },
                { path: "identityVerification", element: <>본인인증증</> },
              ],
            },

            { path: "find-password", element: <Controller.FindController /> },
          ],
        },
        {
          // 이용약관
          path: "terms-and-conditions-for-service",
          element: <>이용약관</>,
        },
        {
          // 개인정보 처리방침
          path: "privacy-policy-for-users",
          element: <>개인정보 처리 방침</>,
        },
        {
          // 고객센터
          path: "customer-support-faq",
          element: <>고객센터</>,
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
