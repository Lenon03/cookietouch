import Data from "../Data";

export default class ExternalNotifications extends Data {
  public categoryId: number;
  public iconId: number;
  public colorId: number;
  public descriptionId: string;
  public defaultEnable: boolean;
  public defaultSound: boolean;
  public defaultMultiAccount: boolean;
  public defaultNotify: boolean;
  public name: string;
  public messageId: string;
}
