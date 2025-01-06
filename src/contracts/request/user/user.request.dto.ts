import { Exclude, Expose } from "class-transformer";
import { BaseDTO } from "../../shared";

export class UserRequestDTO extends BaseDTO {
  @Expose({ name: "email" })
  public email?: string = "";

  @Expose({ name: "password" })
  public password?: string = "";
}
