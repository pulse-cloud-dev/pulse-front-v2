import { Expose } from "class-transformer";
import { BaseDTO } from "../../shared";

export class ResetPasswordrequestDTO extends BaseDTO {
  @Expose({ name: "member_id" })
  public member_id: string = "";

  @Expose({ name: "new_password" })
  public new_password: string = "";
}
