/**
 * SignInResponseDTO는 로그인 요청에 대한 응답 데이터를 정의하는 인터페이스입니다.
 * 로그인 성공 시 반환되는 `access_token`과 메시지를 포함합니다.
 *
 * @property {object} body - 응답 본문
 * @property {string} body.access_token - 사용자 인증을 위한 액세스 토큰
 * @property {string} message - 응답 메시지, 예: "로그인 성공" 등의 상태 메시지
 */
export interface SignInResponseDTO {
  body: {
    access_token: string;
  };
  message: string;
}
