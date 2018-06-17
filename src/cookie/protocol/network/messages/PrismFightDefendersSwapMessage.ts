import Message from "./Message";

export default class PrismFightDefendersSwapMessage extends Message {
  public subAreaId: number;
  public fightId: number;
  public fighterId1: number;
  public fighterId2: number;

  constructor(subAreaId = 0, fightId = 0, fighterId1 = 0, fighterId2 = 0) {
    super();
    this.subAreaId = subAreaId;
    this.fightId = fightId;
    this.fighterId1 = fighterId1;
    this.fighterId2 = fighterId2;

  }
}
