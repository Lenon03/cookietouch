import AlignmentSubAreaUpdateMessage from "@/protocol/network/messages/AlignmentSubAreaUpdateMessage";

export default class AlignmentSubAreaUpdateExtendedMessage extends AlignmentSubAreaUpdateMessage {
  public worldX: number;
  public worldY: number;
  public mapId: number;
  public eventType: number;

  constructor(subAreaId = 0, side = 0, quiet = false, worldX = 0, worldY = 0, mapId = 0, eventType = 0) {
    super();
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.eventType = eventType;

  }
}
