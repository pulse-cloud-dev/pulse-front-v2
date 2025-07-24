import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";

// Controllers
import * as Controller from "@/features";
// Layouts...
import { AuthLayout, MainLayout, WithAuthLayout, MenteeLayout, NoFooterLayout } from "@/shared/layouts";
// Shared
import { urlConst } from "@/shared/constants";
import { ModalProvider } from "@/shared/modules";

export type Routers = RouteObject[];

const createRoutes = (): Routers => {
  const routes: Routers = [
    {
      path: urlConst.home.default, // ""
      element: <MainLayout />,
      children: [
        { path: "/", element: <Controller.MainController /> },
        { path: "/mentor-register", element: <Controller.RegisterContainer /> },
        /**
         * @description Notice (공지사항)
         */
        {
          path: "notice",
          children: [{ path: "", element: <Controller.NoticeController /> }],
        },

        /**
         * @description 이용약관
         */
        {
          path: "terms-and-conditions-for-service",
          element: <Controller.UnderConstructionController />,
        },

        /**
         * @description 개인정보 처리방침
         */
        {
          path: "privacy-policy-for-users",
          element: <Controller.UnderConstructionController />,
        },

        /**
         * @description 고객센터
         */
        {
          path: "customer-support-faq",
          element: <Controller.UnderConstructionController />,
        },
      ],
    },

    {
      path: urlConst.home.default, // ""
      element: <MenteeLayout />,
      children: [
        {
          /**
           * @description Mentee Find (멘티 찾기)
           */
          path: "mentee-find",
          children: [{ path: "", element: <Controller.MeteeController /> }],
        },
        {
          /**
           * @description 멘티 상세페이지
           */
          path: "mentee-detail/:id",
          children: [{ path: "", element: <Controller.DetailController /> }],
        },
        {
          /**
           * @description Mentor Find (멘티 찾기)
           */
          path: "mentor-find",
          children: [{ path: "", element: <Controller.MentorFindController /> }],
        },
        {
          /**
           * @description 멘토 상세페이지
           */
          path: "mentor-detail/:id",
          children: [{ path: "", element: <Controller.DetailController /> }],
        },

        {
          path: "bookmarks",
          children: [{ path: "", element: <Controller.BookmarkController /> }],
        },
        {
          path: "chat",
          children: [{ path: "/chat", element: <Controller.ChatController /> }],
        },
        {
          /**
           * @description Mentor Find (멘토링 찾기)
           */
          path: "mentee-find",
          children: [{ path: "", element: <Controller.MeteeController /> }],
        },
        {
          /**
           * @description 멘토링 상세페이지
           */
          path: "mentee-detail/:id",
          children: [{ path: "", element: <Controller.DetailController /> }],
        },
      ],
    },
    {
      path: urlConst.home.default, // ""
      element: <NoFooterLayout />,
      children: [
        {
          /**
           * @description Mentor Register (멘토 등록)
           */
          path: "mentor-register",
          children: [
            {
              path: "",
              element: (
                <ModalProvider>
                  <Controller.RegisterContainer />
                </ModalProvider>
              ),
            },
          ],
        },
        {
          /**
           * @description Mentee Find (멘티 찾기)
           */
          path: "posts",
          children: [
            {
              path: "",
              element: (
                <ModalProvider>
                  <Controller.ProtectedPostsController />
                </ModalProvider>
              ),
            },
          ],
        },
      ],
    },

    /**
     * @description My-Pages
     */
    {
      path: "my-page",
      element: <WithAuthLayout />,
      children: [{ path: "", element: <Controller.MyPageController /> }],
    },
    /**
     * @description Auth
     */
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        { path: "", element: <Navigate to={urlConst.auth.signIn} /> },
        { path: "signIn", element: <Controller.SigInController /> },
        { path: "sign-up", element: <Controller.SignUpController /> },
        {
          path: "find-password",
          element: <Controller.FindController />,
        },
      ],
    },

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
