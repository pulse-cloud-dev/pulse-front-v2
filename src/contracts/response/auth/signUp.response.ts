/**
 * JoinSocialResponseDTO은 소셜 인증 요청에 대한 응답 데이터를 정의하는 인터페이스입니다.
 *
 * @property {string} body
 * @property {string} message - 응답 메시지, 예: "로그인 성공" 등의 상태 메시지
 */

export interface JoinSocialResponseDTO {
  body: string;
  message: string;
}
