/**
 * SignUpRequestDTO 소셜 인증을 통한 회원가입 시, 필요한 데이터를 정의합니다.
 * 사용자가 회원가입 시, 사용 소셜 도메인을 전달합니다.
 *
 * @property {string} domain - 회원가입에 사용되는 도메인
 */
export interface JoinSocialRequestDTO {
  domain: string;
}
