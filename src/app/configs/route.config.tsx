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
                { path: "identityVerification", element: <>본인인증</> },
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
