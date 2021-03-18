import Data from "@/protocol/data/Data";

export default class ExternalNotifications extends Data {
  public categoryId: number = 0;
  public iconId: number = 0;
  public colorId: number = 0;
  public descriptionId: string = "";
  public defaultEnable: boolean = false;
  public defaultSound: boolean = false;
  public defaultMultiAccount: boolean = false;
  public defaultNotify: boolean = false;
  public name: string = "";
  public messageId: string = "";
}
