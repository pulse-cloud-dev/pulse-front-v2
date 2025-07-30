import { checkMentorRegistered } from "@/features/mentor-check/mentor-check.service";
import { NavigateFunction } from "react-router-dom";

export interface MenuActionContext {
  isLogin: boolean;
}

type MenuAction = (
  navigate: NavigateFunction, 
  context: MenuActionContext, 
  item?: { href?: string }
) => void | Promise<void>;

export const menuActionMap: Record<string, MenuAction> = {
  handleMentorInfo: async (navigate, context, item) => {
    if (!context.isLogin) {
      alert('로그인을 하고 오십시오');
      navigate("/auth/signIn");
      return;
    }

    // 멘토 등록 여부 확인 로직은 여기에 나중에 추가
    const isMentorRegistered = await checkMentorRegistered();

    if (!isMentorRegistered) {
      navigate(item?.href ?? "/mentor-register");
    } else {
      alert("등록이 되어있습니다.");
    }
  },
};

