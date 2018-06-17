import PlayerStatus from "@protocol/network/types/PlayerStatus";
import Message from "./Message";

export default class PlayerStatusUpdateMessage extends Message {
  public accountId: number;
  public playerId: number;
  public status: PlayerStatus;

  constructor(accountId = 0, playerId = 0, status: PlayerStatus) {
    super();
    this.accountId = accountId;
    this.playerId = playerId;
    this.status = status;

  }
}
