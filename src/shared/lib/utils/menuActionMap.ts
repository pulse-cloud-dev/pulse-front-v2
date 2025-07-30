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

      alert('로그인 후 이용가능합니다.');

      navigate("/auth/signIn");
      return;
    }

    

    const isMentorRegistered = await checkMentorRegistered();

    if (isMentorRegistered) {
      alert("이미 멘토로 등록되어있습니다.");
      setTimeout(() => {
        navigate("/mentor-find");
      }, 100); 
    } else {
      navigate(item?.href ?? "/mentor-register");

    }
  },
};

