import Data from "@/protocol/data/Data";

export default class Notifications extends Data {
  public titleId: string;
  public messageId: string;
  public iconId: number;
  public typeId: number;
  public trigger: string;
}
