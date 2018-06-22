import PlayerStatus from "@/protocol/network/types/PlayerStatus";
import Message from "@/protocol/network/messages/Message";

export default class PlayerStatusUpdateRequestMessage extends Message {
  public status: PlayerStatus;

  constructor(status: PlayerStatus) {
    super();
    this.status = status;

  }
}
