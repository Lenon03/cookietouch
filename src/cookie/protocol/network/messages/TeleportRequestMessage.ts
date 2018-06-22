import Message from "@/protocol/network/messages/Message";

export default class TeleportRequestMessage extends Message {
  public teleporterType: number;
  public mapId: number;

  constructor(teleporterType = 0, mapId = 0) {
    super();
    this.teleporterType = teleporterType;
    this.mapId = mapId;

  }
}
