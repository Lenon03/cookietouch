import { PlayerStatusEnum } from "@/protocol/enums/PlayerStatusEnum";
import Type from "@/protocol/network/types/Type";

export default class PlayerStatus extends Type {
  public statusId: PlayerStatusEnum;

  constructor(statusId = PlayerStatusEnum.PLAYER_STATUS_UNKNOWN) {
    super();
    this.statusId = statusId;
  }
}
