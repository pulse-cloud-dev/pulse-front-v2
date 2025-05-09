import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";

// Controllers
import * as Controller from "@/features";
// Layouts...
import { AdminLayout, AuthLayout, MainLayout, MentorLayout, WithAuthLayout } from "@/shared/layouts";
// Shared
import { urlConst } from "@/shared/constants";

export type Routers = RouteObject[];

const createRoutes = (): Routers => {
  const routes: Routers = [
    {
      path: urlConst.home.default, // ""
      element: <MainLayout />,
      children: [
        { path: "/", element: <Navigate to={"mentor-find"} /> },

        {
          /**
           * @description Mentee Find (멘티 찾기)
           */
          path: "mentee-find",
          children: [{ path: "", element: <Controller.ChatController /> }],
        },
        /**
         * @description Community (커뮤니티)
         */
        {
          path: "community",
          children: [{ path: "", element: <Controller.CommunityController /> }],
        },

        /**
         * @description Notice (공지사항)
         */
        {
          path: "notice",
          children: [{ path: "", element: <Controller.NoticeController /> }],
        },

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
      element: <MentorLayout />,
      children: [
        {
          /**
           * @description Mentor Find (멘토링 찾기)
           */
          path: "mentor-find",
          children: [{ path: "", element: <Controller.MentorController /> }],
        },

        /**
         * @description 모집글 등록
         */
        {
          path: "posts",
          children: [{ path: "", element: <Controller.PostsController /> }],
        },

        {
          path: "bookmarks",
          children: [{ path: "", element: <Controller.BookmarkController /> }],
        },
      ],
    },

    /**
     * @description Admin (관리자 라우터)
     */
    {
      path: "admin",
      element: <AdminLayout />,
      children: [
        { path: "", element: <Controller.AdminMainController /> },
        { path: "dashboard", element: <>대시보드</> },
        {
          path: "user",
          children: [
            { path: "member", element: <>회원정보관리</> },
            { path: "admin", element: <>관리자정보관리</> },
            { path: "access-log", element: <>회원정보접근이력</> },
          ],
        },
        { path: "permission", element: <>권한관리</> },
        {
          path: "mentoring",
          children: [
            { path: "", element: <>멘토링관리</> },
            { path: "chat", element: <>채팅관리</> },
            { path: "restriction", element: <>활동제한설정</> },
            { path: "review", element: <>멘토평가</> },
          ],
        },
        {
          path: "board",
          children: [
            { path: "knowledge-sharing", element: <>지식공유</> },
            { path: "challenge", element: <>맞춰라 문제</> },
          ],
        },
        {
          path: "report",
          children: [
            { path: "mentoring", element: <>멘토링 신고</> },
            { path: "post", element: <>게시물 신고</> },
          ],
        },
        {
          path: "support",
          children: [
            { path: "announcement", element: <>공지사항</> },
            { path: "faq", element: <>FAQ</> },
          ],
        },
        {
          path: "statistics",
          children: [
            { path: "user", element: <>회원통계</> },
            { path: "mentoring", element: <>멘토링통계</> },
            { path: "payment", element: <>결제통계</> },
            { path: "board", element: <>게시판통계</> },
            { path: "page", element: <>페이지별통계</> },
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
      children: [{ path: "", element: <Controller.UnderConstructionController /> }],
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
        { path: "signUp", element: <Controller.SignUpController /> },
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
