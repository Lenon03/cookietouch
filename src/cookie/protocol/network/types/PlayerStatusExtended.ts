import { PlayerStatusEnum } from "@/protocol/enums/PlayerStatusEnum";
import PlayerStatus from "@/protocol/network/types/PlayerStatus";

export default class PlayerStatusExtended extends PlayerStatus {
  public message: string;

  constructor(statusId = PlayerStatusEnum.PLAYER_STATUS_UNKNOWN, message = "") {
    super(statusId);
    this.message = message;
  }
}
