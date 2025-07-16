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
    } catch (err: any) {
      if (err.response) {
        const status = err.response.status;

        if (status === 401 || status === 403) {
          alert("로그인이 필요하거나 권한이 없습니다. 다시 로그인해 주세요.");
        } else {
          alert("서버 오류로 인해 네이버 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        }
      } else {
        alert("네트워크 오류로 로그인 요청을 처리할 수 없습니다.");
      }
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
