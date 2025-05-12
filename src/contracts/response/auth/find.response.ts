import { Expose } from "class-transformer";
import { BaseDTO } from "../../shared";

export class OauthResponseDTO extends BaseDTO {
  @Expose({ name: "message" })
  public message: string = "";

  @Expose({ name: "body" })
  public body: string = "";
}
