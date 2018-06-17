import HumanOption from "./HumanOption";

export default class HumanOptionObjectUse extends HumanOption {
  public delayTypeId: number;
  public delayEndTime: number;
  public objectGID: number;

  constructor(delayTypeId = 0, delayEndTime = 0, objectGID = 0) {
    super();
    this.delayTypeId = delayTypeId;
    this.delayEndTime = delayEndTime;
    this.objectGID = objectGID;

  }
}
