export const formConstant = {
  signIn: [
    { name: "email", label: "", required: false, placeholder: "이메일을 입력해주세요" },
    { name: "password", label: "", type: "password", required: false, placeholder: "비밀번호를 입력하세요" },
  ],
  signUp: [
    { name: "email", label: "이메일", type: "email", required: true, placeholder: "이메일을 입력해주세요." },
    { name: "username", label: "닉네임", type: "text", required: true, placeholder: "사용자 이름을 입력하세요" },
    { name: "password", label: "비밀번호", type: "password", required: true, placeholder: "비밀번호를 입력하세요" },
    { name: "password-check", label: "비밀번호 확인", type: "password", required: true, placeholder: "비밀번호을 확인해주세요." },
  ],
  find: [
    { name: "email", label: "이메일", type: "email", required: true, placeholder: "이메일을 입력해주세요." },
    { name: "password", label: "비밀번호", type: "password", required: true, placeholder: "비밀번호를 입력하세요" },
    { name: "password-check", label: "비밀번호 확인", type: "password", required: true, placeholder: "비밀번호을 확인해주세요." },
  ],
};
