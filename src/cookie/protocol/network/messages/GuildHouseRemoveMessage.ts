import Message from "@/protocol/network/messages/Message";

export default class GuildHouseRemoveMessage extends Message {
  public houseId: number;

  constructor(houseId = 0) {
    super();
    this.houseId = houseId;

  }
}
