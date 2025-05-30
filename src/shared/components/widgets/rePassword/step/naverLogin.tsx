import { userApis } from "@/networks/apis/user.api";
import { BaseButton } from "@/shared/components";
import { Icon } from "@/shared/components";

export const AuthenticationSelectionStep = () => {
  const handleNaverLogin = async () => {
  try {
    const url = await userApis.getNaverLoginUrl();

    if (!url) {
      alert("네이버 로그인 URL을 받아오지 못했습니다.");
      return;
    }

    window.location.href = url; 
  } catch (err) {
    alert("네이버 로그인에 실패했습니다.");
  }
};
  
  return (
    <div className="w-100 flex_r align_center justify_center m-t-40">
      <BaseButton className="w400 border gap_8" size="xl" onClick={handleNaverLogin}>
        <Icon src="logo_naver" alt="네이버 로고" />
        네이버 로그인으로 본인인증
      </BaseButton>
    </div>
  );
};
