export const formConstant = {
  signIn: [
    { name: "email", label: "", required: false, placeholder: "이메일을 입력해 주세요" },
    { name: "password", label: "", type: "password", required: false, placeholder: "비밀번호를 입력하세요" },
  ],
  signUp: [
    { name: "username", label: "이름", type: "email", required: true, placeholder: "" },
    { name: "phone", label: "핸드폰번호", type: "phone", required: true, placeholder: "" },
    { name: "email", label: "이메일", type: "email", required: true, placeholder: "" },
    { name: "nickname", label: "닉네임", type: "text", required: true, placeholder: "사용할 닉네임을 작성해 주세요." },
    { name: "password", label: "비밀번호", type: "password", required: true, placeholder: "숫자, 영문, 특수문자 포함 8자 이상 작성해 주세요." },
    { name: "password-check", label: "비밀번호 확인", type: "password", required: true, placeholder: "입력한 비밀번호를 확인해 주세요." },
  ],
  find: [
    { name: "email", label: "이메일", type: "email", required: true, placeholder: "ex) id@pulse.com" },
    { name: "password", label: "비밀번호 재설정", type: "password", required: true, placeholder: "숫자, 영문, 특수문자 포함 8자 이상 작성해 주세요." },
    { name: "password-check", label: "비밀번호 확인", type: "password", required: true, placeholder: "입력한 비밀번호를 확인해 주세요." },
  ],
};
