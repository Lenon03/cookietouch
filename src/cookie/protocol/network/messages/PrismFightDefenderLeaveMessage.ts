import Message from "./Message";

export default class PrismFightDefenderLeaveMessage extends Message {
  public subAreaId: number;
  public fightId: number;
  public fighterToRemoveId: number;

  constructor(subAreaId = 0, fightId = 0, fighterToRemoveId = 0) {
    super();
    this.subAreaId = subAreaId;
    this.fightId = fightId;
    this.fighterToRemoveId = fighterToRemoveId;

  }
}
