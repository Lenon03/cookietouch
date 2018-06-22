import Message from "@/protocol/network/messages/Message";
import PlayerStatus from "@/protocol/network/types/PlayerStatus";

export default class PlayerStatusUpdateRequestMessage extends Message {
  public status: PlayerStatus;

  constructor(status: PlayerStatus) {
    super();
    this.status = status;

  }
}
