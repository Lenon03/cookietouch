import Data from "@/protocol/data/Data";

export default class Notifications extends Data {
  public titleId: string = "";
  public messageId: string = "";
  public iconId: number = 0;
  public typeId: number = 0;
  public trigger: string = "";
}
