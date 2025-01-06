/**
 * SignInRequestDTO는 로그인 요청에 필요한 데이터를 정의하는 인터페이스입니다.
 * 사용자가 로그인할 때 필요한 이메일과 비밀번호를 포함합니다.
 *
 * @property {string} email - 로그인에 사용될 이메일 주소
 * @property {string} password - 사용자의 비밀번호
 */
export interface SignInRequestDTO {
  email: string;
  password: string;
}
