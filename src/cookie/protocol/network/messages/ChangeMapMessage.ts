import Message from "@/protocol/network/messages/Message";

export default class ChangeMapMessage extends Message {
  public mapId: number;

  constructor(mapId = 0) {
    super();
    this.mapId = mapId;

  }
}
