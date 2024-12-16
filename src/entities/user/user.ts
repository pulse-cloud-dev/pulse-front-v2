import { Exclude, Expose } from "class-transformer";
import { HelperDTO } from "../helper";

export class UserDTO extends HelperDTO {
  @Expose({ name: "id" })
  public id: string = "1";

  @Expose({ name: "nickname" })
  public nickName: string = "";
}
