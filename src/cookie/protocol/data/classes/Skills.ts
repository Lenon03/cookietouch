import Data from "@/protocol/data/Data";

export default class Skills extends Data {
  public nameId: string = "";
  public parentJobId: number = 0;
  public isForgemagus: boolean = false;
  public modifiableItemType: number = 0;
  public gatheredRessourceItem: number = 0;
  public craftableItemIds: object[] = [];
  public interactiveId: number = 0;
  public useAnimation: string = "";
  public isRepair: boolean = false;
  public cursor: number = 0;
  public availableInHouse: boolean = false;
  public levelMin: number = 0;
}
