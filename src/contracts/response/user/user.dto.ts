import { Exclude, Expose } from "class-transformer";
import { BaseDTO } from "../../shared";

export class UserDTO extends BaseDTO {
  @Expose({ name: "id" })
  public id: string = "1";

  @Expose({ name: "nickname" })
  public nickName: string = "";
}
