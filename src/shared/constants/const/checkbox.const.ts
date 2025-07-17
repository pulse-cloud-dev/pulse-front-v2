export const checkboxConst = {
  SIGN_UP_STEP_1: [
    { id: "all", label: "전체 선택", checked: false, desc: "" },
    { id: "1", label: "이용약관(필수)", checked: false, desc: "" },
    { id: "2", label: "개인정보 수집 이용 안내 (필수)", checked: false, desc: "" },
    { id: "3", label: "정책정보 제공을 위한 수집 및 이용 동의 (선택)", checked: false, desc: "" },
  ],
  SIGN_UP_STEP_2: [
    { id: "1", label: "이메일 수신 동의(선택)", checked: false, desc: "멘토링 매칭 관련한 알림에 대해 이메일 수신을 동의합니다." },
    { id: "2", label: "SMS 수신 동의(선택)", checked: false, desc: "멘토링 매칭 관련한 알림에 대해 SMS 수신을 동의합니다." },
  ],
};
