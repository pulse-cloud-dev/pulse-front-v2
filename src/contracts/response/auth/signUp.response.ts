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

export interface SignUpRequestDTO {
  email: string;
  password: string;
  phone_number: string;
  name: string;
  nick_name: string;
}
/**
 * JoinSocialRequestDTO은 소셜 인증 요청을 위한 데이터 전송 객체입니다.
 *
 * @property {string} domain - 소셜 인증을 위한 도메인
 */
import { Expose, Transform } from "class-transformer";

export class SimplifiedUserlResponseDTO {
  @Expose()
  public email: string = "";

  @Expose()
  public name: string = "";

  @Expose({ name: "mobile" })
  @Transform(({ value }) => value, { toClassOnly: true })
  public phone_number: string = "";
}
