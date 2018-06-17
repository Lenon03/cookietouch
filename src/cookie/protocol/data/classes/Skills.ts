import Data from "../Data";

export default class Skills extends Data {
  public nameId: string;
  public parentJobId: number;
  public isForgemagus: boolean;
  public modifiableItemType: number;
  public gatheredRessourceItem: number;
  public craftableItemIds: object[];
  public interactiveId: number;
  public useAnimation: string;
  public isRepair: boolean;
  public cursor: number;
  public availableInHouse: boolean;
  public levelMin: number;
}
