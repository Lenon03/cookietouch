import PlayerStatus from "./PlayerStatus";
export default class PlayerStatusExtended extends PlayerStatus {
  public message: string;
  constructor(statusId = 1, message = "") {
    super(statusId);
    this.message = message;

  }
}
