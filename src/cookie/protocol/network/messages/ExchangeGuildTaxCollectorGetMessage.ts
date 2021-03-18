import Message from "@/protocol/network/messages/Message";
import ObjectItemQuantity from "@/protocol/network/types/ObjectItemQuantity";

export default class ExchangeGuildTaxCollectorGetMessage extends Message {
  public objectsInfos: ObjectItemQuantity[];
  public collectorName: string;
  public worldX: number;
  public worldY: number;
  public mapId: number;
  public subAreaId: number;
  public userName: string;
  public experience: number;

  constructor(collectorName = "", worldX = 0, worldY = 0, mapId = 0, subAreaId = 0,
              userName = "", experience = 0, objectsInfos: ObjectItemQuantity[]) {
    super();
    this.objectsInfos = objectsInfos;
    this.collectorName = collectorName;
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.subAreaId = subAreaId;
    this.userName = userName;
    this.experience = experience;

  }
}
